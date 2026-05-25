"use client";

/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import "./ShareButton.css";

// ShareButton — compartir contenido sin tener que copiar el enlace a mano.
//
// Prioridad de canales:
// 1. Web Share API (navigator.share) → en móviles ofrece WhatsApp, SMS,
//    Telegram, Mail, AirDrop… directamente. Es lo mejor para WhatsApp.
// 2. Si no hay Web Share API:
//    - En móvil/táctil → abre directamente whatsapp://send con el texto.
//    - En desktop → abre WhatsApp Web (wa.me/?text=) en una pestaña nueva.
// 3. Botón secundario "Copiar" siempre disponible como red de seguridad.
//
// `getShare()` se invoca como función para que el llamador pueda diferir
// el cálculo del texto a compartir (a veces requiere datos que solo están
// en el momento del click — p.ej. lista de mínimos del municipio).

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.892 6.994c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect
      x="8"
      y="8"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m3.5 7.5 8.5 6 8.5-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const isTouch = () => {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      return true;
    }
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }
  return false;
};

const buildWhatsAppHref = (text) => {
  const encoded = encodeURIComponent(text);
  // wa.me funciona en desktop (WhatsApp Web) y en móvil; abre la app si
  // está instalada. Más portable que whatsapp:// que en algunos navegadores
  // (Safari móvil) requiere user gesture y no soporta target=_blank.
  return `https://wa.me/?text=${encoded}`;
};

const buildTelegramHref = (text, url) => {
  // Telegram requiere url separado del texto para el preview oficial.
  const u = encodeURIComponent(url || "");
  const t = encodeURIComponent(text || "");
  return `https://t.me/share/url?url=${u}&text=${t}`;
};

const buildMailtoHref = (subject, body) => {
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  return `mailto:?subject=${s}&body=${b}`;
};

const ShareButton = ({
  getShare,
  label = "Compartir",
  variant = "ghost",
  size = "md",
  className = "",
  iconOnly = false,
  ariaLabel,
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const sheetRef = useRef(null);
  const triggerRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    []
  );

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 2200);
  };

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    if (triggerRef.current && typeof triggerRef.current.focus === "function") {
      try {
        triggerRef.current.focus();
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeSheet();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen, closeSheet]);

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const t = setTimeout(() => {
      const first = sheetRef.current?.querySelector(".sharesheet__opt");
      if (first && typeof first.focus === "function") first.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [sheetOpen]);

  const handleClick = async (e) => {
    if (busy) return;
    triggerRef.current = e.currentTarget;
    setBusy(true);
    let data;
    try {
      data = typeof getShare === "function" ? await getShare() : null;
    } catch {
      data = null;
    }
    if (!data) {
      setBusy(false);
      return;
    }
    setShareData(data);

    // 1) Web Share API — ofrece WhatsApp como opción nativa.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url,
        });
        setBusy(false);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") {
          setBusy(false);
          return;
        }
        // Si el navegador soporta share pero algo falla, caemos al sheet.
      }
    }

    // 2) Sin Web Share API → abrimos el sheet con opciones explícitas
    //    (WhatsApp, Telegram, Email, Copiar). En desktop sin share es lo
    //    que el usuario espera para no instalarse extensiones.
    setSheetOpen(true);
    setBusy(false);
  };

  const buildBodyText = (data) => {
    if (!data) return "";
    if (data.url) {
      // Incluimos URL al final del texto para que el preview venga rico:
      // WhatsApp solo unfurla la última URL del mensaje.
      return data.text ? `${data.text}\n\n${data.url}` : data.url;
    }
    return data.text || "";
  };

  const handlePickProvider = async (provider) => {
    if (!shareData) return;
    if (provider === "copy") {
      const full = buildBodyText(shareData);
      try {
        if (
          typeof navigator !== "undefined" &&
          navigator.clipboard?.writeText
        ) {
          await navigator.clipboard.writeText(full);
          showToast("Copiado al portapapeles");
          closeSheet();
          return;
        }
      } catch {
        /* fall through */
      }
      // Fallback ancestral: prompt para que el usuario lo copie a mano.
      // Mejor que dejarle sin nada.
      if (typeof window !== "undefined" && window.prompt) {
        window.prompt("Copia este texto:", full);
      }
      closeSheet();
      return;
    }

    let href = null;
    const text = buildBodyText(shareData);
    if (provider === "whatsapp") href = buildWhatsAppHref(text);
    else if (provider === "telegram")
      href = buildTelegramHref(shareData.text, shareData.url);
    else if (provider === "email")
      href = buildMailtoHref(shareData.title, text);

    if (href) {
      // Para email usamos location.assign (mailto: no funciona bien con
      // window.open). Para los demás abrimos pestaña nueva para no
      // sacar al usuario de la ficha.
      if (provider === "email") {
        window.location.href = href;
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }
    closeSheet();
  };

  const handleSheetKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const panel = sheetRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !panel.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const variantClass = `sharebtn--${variant}`;
  const sizeClass = `sharebtn--${size}`;
  const iconClass = iconOnly ? "sharebtn--icon" : "";

  return (
    <>
      <button
        type="button"
        className={`sharebtn ${variantClass} ${sizeClass} ${iconClass} ${className}`.trim()}
        onClick={handleClick}
        disabled={busy}
        aria-busy={busy || undefined}
        aria-label={ariaLabel || label}
        ref={(el) => {
          // Mantener triggerRef actualizado para que onClick reciba currentTarget
          // pero también podamos usar la ref tras cerrar el sheet.
          if (el && !triggerRef.current) triggerRef.current = el;
        }}
      >
        <span className="sharebtn__icon" aria-hidden="true">
          <ShareIcon />
        </span>
        {!iconOnly && <span className="sharebtn__label">{label}</span>}
      </button>

      {sheetOpen && (
        <div
          className="sharesheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sharesheet-title"
        >
          <button
            type="button"
            className="sharesheet__backdrop"
            aria-label="Cerrar"
            onClick={closeSheet}
          />
          <div
            className="sharesheet__panel"
            ref={sheetRef}
            onKeyDown={handleSheetKeyDown}
          >
            <div className="sharesheet__handle" aria-hidden="true" />
            <h2 id="sharesheet-title" className="sharesheet__title">
              Compartir
            </h2>
            {shareData?.preview && (
              <p className="sharesheet__preview">{shareData.preview}</p>
            )}
            <div className="sharesheet__grid">
              <button
                type="button"
                className="sharesheet__opt sharesheet__opt--whatsapp"
                onClick={() => handlePickProvider("whatsapp")}
              >
                <span className="sharesheet__opt-icon" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
                <span className="sharesheet__opt-label">WhatsApp</span>
              </button>
              <button
                type="button"
                className="sharesheet__opt sharesheet__opt--telegram"
                onClick={() => handlePickProvider("telegram")}
              >
                <span className="sharesheet__opt-icon" aria-hidden="true">
                  <TelegramIcon />
                </span>
                <span className="sharesheet__opt-label">Telegram</span>
              </button>
              <button
                type="button"
                className="sharesheet__opt"
                onClick={() => handlePickProvider("email")}
              >
                <span className="sharesheet__opt-icon" aria-hidden="true">
                  <EmailIcon />
                </span>
                <span className="sharesheet__opt-label">Email</span>
              </button>
              <button
                type="button"
                className="sharesheet__opt"
                onClick={() => handlePickProvider("copy")}
              >
                <span className="sharesheet__opt-icon" aria-hidden="true">
                  <CopyIcon />
                </span>
                <span className="sharesheet__opt-label">Copiar enlace</span>
              </button>
            </div>
            <button
              type="button"
              className="sharesheet__cancel"
              onClick={closeSheet}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
};

export default ShareButton;
