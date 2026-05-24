"use client";

/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./FilterBar.css";

// ---- Definiciones públicas (importables desde donde se construyan los datos)

export const SERVICE_DEFS = [
  { id: "adblue", label: "AdBlue", campo: "Precio Adblue" },
  {
    id: "glp",
    label: "GLP / Autogas",
    campo: "Precio Gases licuados del petróleo",
  },
  { id: "h2", label: "Hidrógeno", campo: "Precio Hidrogeno" },
  { id: "e10", label: "Gasolina 95 E10", campo: "Precio Gasolina 95 E10" },
  { id: "e85", label: "Bioetanol E85", campo: "Precio Gasolina 95 E85" },
  { id: "gnc", label: "GNC", campo: "Precio Gas Natural Comprimido" },
  { id: "gnl", label: "GNL", campo: "Precio Gas Natural Licuado" },
];

export const FUEL_DEFS = [
  { id: "diesel-a", label: "Diésel A", campo: "Precio Gasoleo A" },
  { id: "diesel-plus", label: "Diésel +", campo: "Precio Gasoleo Premium" },
  { id: "g95", label: "Gasolina 95", campo: "Precio Gasolina 95 E5" },
  { id: "g98", label: "Gasolina 98", campo: "Precio Gasolina 98 E5" },
];

export const DEFAULT_FILTERS = Object.freeze({
  brands: [],
  services: [],
  access: "public", // 'all' | 'public' | 'restricted' — público por defecto
  schedule: "all", // 'all' | 'open' | '24h'
  margin: "all", // 'all' | 'D' | 'I'
  fuelsAvailable: [],
});

export const DEFAULT_SORT = Object.freeze({ by: "price" });

// ---- Iconos inline (siguen el peso fino del resto de la UI)

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3 5h18M6 12h12M10 19h4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

const ChevDown = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cross = () => (
  <svg
    viewBox="0 0 24 24"
    width="11"
    height="11"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
    />
  </svg>
);

// ---- Helpers

const SORT_LABELS = {
  price: "Precio",
  distance: "Distancia",
  alphabetical: "A → Z",
};

const ACCESS_OPTIONS = [
  { id: "all", label: "Todas" },
  { id: "public", label: "Público" },
  { id: "restricted", label: "Solo restringidas" },
];

const SCHEDULE_OPTIONS = [
  { id: "all", label: "Cualquiera" },
  { id: "open", label: "Abierto ahora" },
  { id: "24h", label: "24 horas" },
];

const MARGIN_OPTIONS = [
  { id: "all", label: "Indistinto" },
  { id: "D", label: "Derecho" },
  { id: "I", label: "Izquierdo" },
];

const computeActiveCount = (filters) => {
  let n = 0;
  if (filters.brands.length) n += 1;
  if (filters.services.length) n += 1;
  // "public" es el default — cualquier otro valor cuenta como filtro activo.
  if (filters.access !== "public") n += 1;
  if (filters.schedule !== "all") n += 1;
  if (filters.margin !== "all") n += 1;
  if (filters.fuelsAvailable.length) n += 1;
  return n;
};

const toggleInArray = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

// Construye la lista de chips activos para la tira inline (estado removible).
const buildActiveTokens = (filters) => {
  const tokens = [];
  filters.brands.forEach((b) =>
    tokens.push({ key: `b-${b}`, label: b, kind: "brand", value: b })
  );
  filters.services.forEach((s) => {
    const def = SERVICE_DEFS.find((d) => d.id === s);
    if (def) tokens.push({ key: `s-${s}`, label: def.label, kind: "service", value: s });
  });
  filters.fuelsAvailable.forEach((f) => {
    const def = FUEL_DEFS.find((d) => d.id === f);
    if (def)
      tokens.push({ key: `f-${f}`, label: `Sirve ${def.label}`, kind: "fuel", value: f });
  });
  if (filters.schedule === "open")
    tokens.push({ key: "sched-open", label: "Abierta ahora", kind: "schedule" });
  if (filters.schedule === "24h")
    tokens.push({ key: "sched-24h", label: "24 horas", kind: "schedule" });
  if (filters.access === "restricted")
    tokens.push({ key: "acc-r", label: "Restringidas", kind: "access" });
  if (filters.access === "all")
    tokens.push({ key: "acc-all", label: "Incluye restringidas", kind: "access" });
  if (filters.margin === "D")
    tokens.push({ key: "m-D", label: "Margen derecho", kind: "margin" });
  if (filters.margin === "I")
    tokens.push({ key: "m-I", label: "Margen izquierdo", kind: "margin" });
  return tokens;
};

const removeToken = (filters, token) => {
  switch (token.kind) {
    case "brand":
      return { ...filters, brands: filters.brands.filter((b) => b !== token.value) };
    case "service":
      return {
        ...filters,
        services: filters.services.filter((s) => s !== token.value),
      };
    case "fuel":
      return {
        ...filters,
        fuelsAvailable: filters.fuelsAvailable.filter((f) => f !== token.value),
      };
    case "schedule":
      return { ...filters, schedule: "all" };
    case "access":
      return { ...filters, access: "public" };
    case "margin":
      return { ...filters, margin: "all" };
    default:
      return filters;
  }
};

// ---- Subcomponentes

function Segmented({ options, value, onChange, name }) {
  return (
    <div className="fseg" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="radio"
          aria-checked={value === opt.id}
          className="fseg__btn"
          data-active={value === opt.id || undefined}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ChipMulti({ id, label, count, active, onClick }) {
  return (
    <button
      key={id}
      type="button"
      className="fchip"
      data-active={active || undefined}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="fchip__check" aria-hidden="true">
        <Check />
      </span>
      <span className="fchip__label">{label}</span>
      {typeof count === "number" && count > 0 && (
        <span className="fchip__count" aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
}

function Section({ label, count, children }) {
  return (
    <section className="fsec">
      <header className="fsec__head">
        <span className="fsec__bar" aria-hidden="true" />
        <h3 className="fsec__title">{label}</h3>
        {typeof count === "number" && count > 0 && (
          <span className="fsec__count">{count}</span>
        )}
      </header>
      <div className="fsec__body">{children}</div>
    </section>
  );
}

// ---- Sort dropdown (compacto, en la barra)

function SortDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="fsort" ref={ref}>
      <button
        type="button"
        className="fsort__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="fsort__label">
          <span className="fsort__prefix">Ordenar</span>
          <span className="fsort__value">{SORT_LABELS[value] || "Precio"}</span>
        </span>
        <ChevDown />
      </button>
      {open && (
        <ul className="fsort__menu" role="listbox">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                className="fsort__opt"
                data-active={value === opt || undefined}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <span>{SORT_LABELS[opt]}</span>
                {value === opt && <Check />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---- Sheet

function FilterSheet({
  open,
  onClose,
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  isNearMeMode,
  availableBrands, // [{ id, count }]
  availableServiceIds,
  availableFuelIds,
  visibleCount,
}) {
  const [phase, setPhase] = useState("closed"); // closed | entering | open | exiting
  const panelRef = useRef(null);

  // Bloquea el scroll del body mientras el sheet está abierto.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [open]);

  // Animación de apertura/cierre por fases (CSS lee data-state).
  useEffect(() => {
    if (open) {
      setPhase("entering");
      const t = requestAnimationFrame(() => setPhase("open"));
      return () => cancelAnimationFrame(t);
    }
    if (phase === "open" || phase === "entering") {
      setPhase("exiting");
      const t = setTimeout(() => setPhase("closed"), 220);
      return () => clearTimeout(t);
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape para cerrar.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (phase === "closed") return null;

  const visibleSortOptions = isNearMeMode
    ? ["price", "distance", "alphabetical"]
    : ["price", "alphabetical"];

  const updateBrands = (brand) =>
    onFiltersChange({ ...filters, brands: toggleInArray(filters.brands, brand) });

  const updateServices = (id) =>
    onFiltersChange({ ...filters, services: toggleInArray(filters.services, id) });

  const updateFuels = (id) =>
    onFiltersChange({
      ...filters,
      fuelsAvailable: toggleInArray(filters.fuelsAvailable, id),
    });

  const handleClear = () => {
    onFiltersChange({ ...DEFAULT_FILTERS });
  };

  const visibleServices = SERVICE_DEFS.filter((s) =>
    availableServiceIds?.has(s.id)
  );
  const visibleFuels = FUEL_DEFS.filter((f) => availableFuelIds?.has(f.id));

  return createPortal(
    <div
      className="fsheet"
      data-state={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fsheet-title"
    >
      <button
        type="button"
        className="fsheet__backdrop"
        aria-label="Cerrar filtros"
        onClick={onClose}
      />
      <div className="fsheet__panel" ref={panelRef}>
        <div className="fsheet__handle" aria-hidden="true" />
        <header className="fsheet__header">
          <h2 id="fsheet-title" className="fsheet__title">
            Filtros
          </h2>
          <button
            type="button"
            className="fsheet__clear"
            onClick={handleClear}
          >
            Limpiar
          </button>
        </header>

        <div className="fsheet__body">
          <Section label="Ordenar">
            <Segmented
              name="Ordenar"
              options={visibleSortOptions.map((id) => ({
                id,
                label: SORT_LABELS[id],
              }))}
              value={sort.by}
              onChange={(by) => onSortChange({ ...sort, by })}
            />
          </Section>

          {visibleFuels.length > 0 && (
            <Section
              label="Combustible disponible"
              count={filters.fuelsAvailable.length || undefined}
            >
              <p className="fsec__hint">
                Solo estaciones que sirven los combustibles seleccionados.
              </p>
              <div className="fchips">
                {visibleFuels.map((f) => (
                  <ChipMulti
                    key={f.id}
                    id={f.id}
                    label={f.label}
                    active={filters.fuelsAvailable.includes(f.id)}
                    onClick={() => updateFuels(f.id)}
                  />
                ))}
              </div>
            </Section>
          )}

          {availableBrands?.length > 0 && (
            <Section label="Marcas" count={filters.brands.length || undefined}>
              <div className="fchips">
                {availableBrands.map((b) => (
                  <ChipMulti
                    key={b.id}
                    id={b.id}
                    label={b.id}
                    count={b.count}
                    active={filters.brands.includes(b.id)}
                    onClick={() => updateBrands(b.id)}
                  />
                ))}
              </div>
            </Section>
          )}

          {visibleServices.length > 0 && (
            <Section
              label="Servicios"
              count={filters.services.length || undefined}
            >
              <div className="fchips">
                {visibleServices.map((s) => (
                  <ChipMulti
                    key={s.id}
                    id={s.id}
                    label={s.label}
                    active={filters.services.includes(s.id)}
                    onClick={() => updateServices(s.id)}
                  />
                ))}
              </div>
            </Section>
          )}

          <Section label="Horario">
            <Segmented
              name="Horario"
              options={SCHEDULE_OPTIONS}
              value={filters.schedule}
              onChange={(v) => onFiltersChange({ ...filters, schedule: v })}
            />
          </Section>

          <Section label="Acceso">
            <Segmented
              name="Acceso"
              options={ACCESS_OPTIONS}
              value={filters.access}
              onChange={(v) => onFiltersChange({ ...filters, access: v })}
            />
            <p className="fsec__hint">
              Por defecto excluimos las cooperativas y flotas (acceso
              restringido).
            </p>
          </Section>

          <Section label="Margen vía">
            <Segmented
              name="Margen"
              options={MARGIN_OPTIONS}
              value={filters.margin}
              onChange={(v) => onFiltersChange({ ...filters, margin: v })}
            />
          </Section>
        </div>

        <footer className="fsheet__footer">
          <button
            type="button"
            className="fsheet__apply"
            onClick={onClose}
            disabled={visibleCount === 0}
          >
            <span className="fsheet__apply-label">
              {visibleCount === 0
                ? "Sin resultados"
                : `Ver ${visibleCount} ${
                    visibleCount === 1 ? "resultado" : "resultados"
                  }`}
            </span>
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}

// ---- Componente público

export default function FilterBar({
  total,
  visibleCount,
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  isNearMeMode,
  availableBrands = [], // [{ id: 'REPSOL', count: 4 }]
  availableServiceIds, // Set<string>
  availableFuelIds, // Set<string>
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeCount = useMemo(() => computeActiveCount(filters), [filters]);
  const tokens = useMemo(() => buildActiveTokens(filters), [filters]);

  const visibleSortOptions = isNearMeMode
    ? ["price", "distance", "alphabetical"]
    : ["price", "alphabetical"];

  const onRemoveToken = (token) => {
    onFiltersChange(removeToken(filters, token));
  };

  const totalLabel = total === 1 ? "gasolinera" : "gasolineras";

  return (
    <>
      <div className="fbar" data-has-active={activeCount > 0 || undefined}>
        <div className="fbar__row">
          <div className="fbar__count">
            <strong>{total}</strong>
            <span>{totalLabel}</span>
          </div>

          <SortDropdown
            value={sort.by}
            onChange={(by) => onSortChange({ ...sort, by })}
            options={visibleSortOptions}
          />

          <button
            type="button"
            className="fbar__trigger"
            data-active={activeCount > 0 || undefined}
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
          >
            <FilterIcon />
            <span>Filtros</span>
            {activeCount > 0 && (
              <span className="fbar__badge" aria-label={`${activeCount} activos`}>
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {tokens.length > 0 && (
          <div className="fbar__active" role="list" aria-label="Filtros activos">
            {tokens.map((t) => (
              <button
                key={t.key}
                type="button"
                role="listitem"
                className="ftoken"
                onClick={() => onRemoveToken(t)}
                aria-label={`Quitar filtro: ${t.label}`}
              >
                <span>{t.label}</span>
                <Cross />
              </button>
            ))}
          </div>
        )}
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onFiltersChange={onFiltersChange}
        sort={sort}
        onSortChange={onSortChange}
        isNearMeMode={isNearMeMode}
        availableBrands={availableBrands}
        availableServiceIds={availableServiceIds}
        availableFuelIds={availableFuelIds}
        visibleCount={visibleCount}
      />
    </>
  );
}
