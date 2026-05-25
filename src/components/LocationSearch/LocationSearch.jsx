"use client";

/* eslint-disable react/prop-types */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  GEOCODER_ATTRIBUTION,
  searchAddress,
} from "../../utils/geocoder";
import "./LocationSearch.css";

// LocationSearch — input de ubicación estilo Google Maps:
// - Sugerencias debounceadas (300ms) contra Nominatim/OSM.
// - "Mi ubicación" siempre como primera opción (GPS).
// - Combobox accesible (role="combobox", aria-activedescendant) — flecha arriba/
//   abajo + enter funcionan con o sin ratón.
// - Persiste las 5 búsquedas más recientes en localStorage para reuso.

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const GpsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="m20 20-3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 7v5l3 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const RECENT_KEY = "location.recents.v1";
const RECENT_MAX = 5;

const readRecents = () => {
  try {
    if (typeof localStorage === "undefined") return [];
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
};

const pushRecent = (item) => {
  try {
    if (typeof localStorage === "undefined" || !item) return;
    const current = readRecents();
    // Dedup por (lat,lng) redondeado a 4 decimales (≈11 m).
    const key = `${Number(item.lat).toFixed(4)},${Number(item.lng).toFixed(4)}`;
    const filtered = current.filter(
      (r) => `${Number(r.lat).toFixed(4)},${Number(r.lng).toFixed(4)}` !== key
    );
    const next = [item, ...filtered].slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
};

const LocationSearch = ({
  initialValue = "",
  initialPoint = null,
  busy = false,
  onSelectLocation,
  onUseMyLocation,
  placeholder = "Busca una dirección, calle o CP",
  autoFocus = false,
  variant = "default", // "default" | "compact"
}) => {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const [query, setQuery] = useState(initialValue || initialPoint?.label || "");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recents, setRecents] = useState(() => readRecents());
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const trimmed = query.trim();

  // Construye la lista visible: cabecera + (resultados | recientes | hint).
  const items = useMemo(() => {
    const list = [
      {
        type: "gps",
        key: "__gps__",
        label: "Usar mi ubicación",
        sub: "GPS con permiso del navegador",
      },
    ];
    if (trimmed.length >= 3 && results.length > 0) {
      results.forEach((r, i) => {
        list.push({
          type: "result",
          key: `r-${i}-${r.lat}-${r.lng}`,
          label: r.primary || r.label,
          sub: r.secondary,
          payload: r,
        });
      });
    } else if (trimmed.length < 3 && recents.length > 0) {
      recents.forEach((r, i) => {
        list.push({
          type: "recent",
          key: `rec-${i}`,
          label: r.label,
          payload: r,
        });
      });
    }
    return list;
  }, [trimmed, results, recents]);

  useEffect(() => {
    if (!open) return undefined;
    const onDocMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  useEffect(() => {
    if (!autoFocus || !inputRef.current) return;
    inputRef.current.focus();
  }, [autoFocus]);

  // Debounce de la búsqueda + cancelación de inflight previa para no aplicar
  // resultados viejos sobre un input nuevo.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (trimmed.length < 3) {
      setResults([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    debounceRef.current = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError(null);
      searchAddress(trimmed, { signal: controller.signal })
        .then((data) => {
          if (controller.signal.aborted) return;
          setResults(data || []);
          setLoading(false);
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setError("No se pudo buscar la dirección. Inténtalo de nuevo.");
          setResults([]);
          setLoading(false);
        });
    }, 320);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [trimmed]);

  const handleSelect = useCallback(
    (item) => {
      setOpen(false);
      setActiveIndex(-1);
      if (item.type === "gps") {
        setQuery("");
        if (typeof onUseMyLocation === "function") onUseMyLocation();
        return;
      }
      const payload = item.payload;
      if (!payload) return;
      setQuery(payload.label || item.label || "");
      pushRecent({
        lat: payload.lat,
        lng: payload.lng,
        label: payload.label || item.label,
      });
      setRecents(readRecents());
      if (typeof onSelectLocation === "function") onSelectLocation(payload);
    },
    [onSelectLocation, onUseMyLocation]
  );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((idx) => Math.min(idx + 1, items.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((idx) => Math.max(idx - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        handleSelect(items[activeIndex]);
      } else if (results.length > 0 && trimmed.length >= 3) {
        e.preventDefault();
        handleSelect({
          type: "result",
          key: `enter-${results[0].lat}-${results[0].lng}`,
          label: results[0].label,
          payload: results[0],
        });
      }
      return;
    }
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
    if (inputRef.current) inputRef.current.focus();
  };

  const activeId =
    open && activeIndex >= 0 && items[activeIndex]
      ? `${listboxId}-${activeIndex}`
      : undefined;

  return (
    <div
      ref={wrapperRef}
      className={`locsearch locsearch--${variant}`}
      data-busy={busy || undefined}
    >
      <div className="locsearch__field">
        <span className="locsearch__icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          className="locsearch__input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-label="Buscar dirección o lugar"
        />
        {query && (
          <button
            type="button"
            className="locsearch__clear"
            onClick={handleClear}
            aria-label="Borrar"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {open && (
        <div className="locsearch__panel">
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Sugerencias de ubicación"
            className="locsearch__list"
          >
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              const optionId = `${listboxId}-${i}`;
              const icon =
                item.type === "gps" ? (
                  <GpsIcon />
                ) : item.type === "recent" ? (
                  <ClockIcon />
                ) : (
                  <PinIcon />
                );
              return (
                <li
                  key={item.key}
                  id={optionId}
                  role="option"
                  aria-selected={isActive}
                  className="locsearch__item"
                  data-active={isActive || undefined}
                  data-kind={item.type}
                >
                  <button
                    type="button"
                    className="locsearch__opt"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="locsearch__opt-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span className="locsearch__opt-text">
                      <span className="locsearch__opt-title">{item.label}</span>
                      {item.sub && (
                        <span className="locsearch__opt-sub">{item.sub}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {loading && (
            <div className="locsearch__status" role="status" aria-live="polite">
              Buscando dirección…
            </div>
          )}
          {!loading && error && (
            <div className="locsearch__status locsearch__status--error" role="alert">
              {error}
            </div>
          )}
          {!loading && !error && trimmed.length >= 3 && results.length === 0 && (
            <div className="locsearch__status">
              Sin resultados. Prueba con un código postal o una ciudad.
            </div>
          )}

          <div className="locsearch__attrib">
            <a
              href={GEOCODER_ATTRIBUTION.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {GEOCODER_ATTRIBUTION.text}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
