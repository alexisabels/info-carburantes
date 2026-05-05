/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLowestPrices } from "../utils/getLowestPrices";
import { getLogoForGasolinera } from "../utils/logoUtils";
import { isOpenNow, is24h } from "../utils/formatHorario";
import { useFavorites } from "../hooks/useFavorites";
import FilterBar, {
  DEFAULT_FILTERS,
  SERVICE_DEFS,
  FUEL_DEFS,
} from "./FilterBar/FilterBar";
import { fuelShortLabel, noPriceLabel } from "../utils/fuelLabels";
import "../App.css";

const collator = new Intl.Collator("es", { sensitivity: "base" });

const formatearPrecio = (raw) => {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const num = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return num;
};

const GasolineraTable = ({
  listadoPrecios,
  loadingPrecios,
  municipioSeleccionado,
  selectedFuel,
  isNearMeMode,
  sortBy,
  onSort,
}) => {
  const { isFavorite } = useFavorites();

  // Filtros locales — los inicializamos con los defaults (Acceso = "público":
  // por defecto excluimos restringidas, que es lo que pidió el usuario).
  const [filters, setFilters] = useState(() => ({ ...DEFAULT_FILTERS }));

  const lowestPrices = useMemo(
    () => getLowestPrices(listadoPrecios || []),
    [listadoPrecios]
  );

  // ---- Opciones disponibles a partir del propio listado (no deducimos)
  // Marcas presentes con conteo.
  const availableBrands = useMemo(() => {
    if (!listadoPrecios?.length) return [];
    const counts = new Map();
    for (const e of listadoPrecios) {
      const r = (e["Rótulo"] || "").trim();
      if (!r) continue;
      counts.set(r, (counts.get(r) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => {
        // Marcas más frecuentes primero, después alfabético.
        if (b.count !== a.count) return b.count - a.count;
        return collator.compare(a.id, b.id);
      });
  }, [listadoPrecios]);

  // Servicios y combustibles que aparecen al menos una vez en el listado.
  const { availableServiceIds, availableFuelIds } = useMemo(() => {
    const services = new Set();
    const fuels = new Set();
    for (const e of listadoPrecios || []) {
      for (const def of SERVICE_DEFS) {
        if (formatearPrecio(e[def.campo]) !== null) services.add(def.id);
      }
      for (const def of FUEL_DEFS) {
        if (formatearPrecio(e[def.campo]) !== null) fuels.add(def.id);
      }
    }
    return { availableServiceIds: services, availableFuelIds: fuels };
  }, [listadoPrecios]);

  // ---- Filtrado
  const filteredGasolineras = useMemo(() => {
    if (!listadoPrecios?.length) return [];

    return listadoPrecios.filter((e) => {
      // Marcas: si hay selección, solo las marcadas.
      if (filters.brands.length > 0) {
        const r = (e["Rótulo"] || "").trim();
        if (!filters.brands.includes(r)) return false;
      }

      // Servicios: estación debe servir TODOS los marcados.
      if (filters.services.length > 0) {
        for (const id of filters.services) {
          const def = SERVICE_DEFS.find((s) => s.id === id);
          if (!def) continue;
          if (formatearPrecio(e[def.campo]) === null) return false;
        }
      }

      // Combustibles disponibles: estación debe servir TODOS los marcados.
      if (filters.fuelsAvailable.length > 0) {
        for (const id of filters.fuelsAvailable) {
          const def = FUEL_DEFS.find((f) => f.id === id);
          if (!def) continue;
          if (formatearPrecio(e[def.campo]) === null) return false;
        }
      }

      // Acceso.
      const tipo = e["Tipo Venta"];
      if (filters.access === "public" && tipo === "R") return false;
      if (filters.access === "restricted" && tipo !== "R") return false;
      // 'all' → no filtrar.

      // Margen.
      if (filters.margin !== "all") {
        if (e["Margen"] !== filters.margin) return false;
      }

      // Horario.
      if (filters.schedule === "open") {
        // Mantenemos las indeterminables (null) para no esconder de más
        // cuando el horario no es parseable.
        if (isOpenNow(e.Horario) === false) return false;
      } else if (filters.schedule === "24h") {
        if (!is24h(e.Horario)) return false;
      }

      return true;
    });
  }, [listadoPrecios, filters]);

  // ---- Ordenación
  const sortedGasolineras = useMemo(() => {
    if (!filteredGasolineras.length) return [];
    return [...filteredGasolineras].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return collator.compare(a["Rótulo"] || "", b["Rótulo"] || "");
      }
      if (sortBy === "distance") {
        const distA =
          typeof a.distance === "number"
            ? a.distance
            : Number.POSITIVE_INFINITY;
        const distB =
          typeof b.distance === "number"
            ? b.distance
            : Number.POSITIVE_INFINITY;
        if (distA !== distB) return distA - distB;
      }
      // Precio del combustible seleccionado, sin precio al final.
      const rawA = a[selectedFuel];
      const rawB = b[selectedFuel];
      const priceA =
        rawA && rawA !== "-"
          ? parseFloat(String(rawA).replace(",", "."))
          : Number.POSITIVE_INFINITY;
      const priceB =
        rawB && rawB !== "-"
          ? parseFloat(String(rawB).replace(",", "."))
          : Number.POSITIVE_INFINITY;
      const safeA = Number.isFinite(priceA) ? priceA : Number.POSITIVE_INFINITY;
      const safeB = Number.isFinite(priceB) ? priceB : Number.POSITIVE_INFINITY;
      return safeA - safeB;
    });
  }, [filteredGasolineras, sortBy, selectedFuel]);

  if (loadingPrecios) {
    const municipioNombre = municipioSeleccionado?.Municipio;
    const loadingMsg = isNearMeMode
      ? "Buscando las gasolineras más cercanas a ti…"
      : municipioNombre
        ? `Comparando precios en ${municipioNombre}…`
        : "Buscando gasolineras…";
    return (
      <div className="loading" role="status" aria-live="polite">
        <div className="loading__bar" aria-hidden="true" />
        <span>{loadingMsg}</span>
      </div>
    );
  }

  if (!listadoPrecios || listadoPrecios.length === 0) {
    const municipioNombre = municipioSeleccionado?.Municipio;
    return (
      <div className="empty">
        <div className="empty__title">
          {isNearMeMode
            ? "Sin gasolineras cerca"
            : municipioNombre
              ? `Ninguna gasolinera en ${municipioNombre}`
              : "Sin resultados"}
        </div>
      </div>
    );
  }

  const buildHref = (gasolinera) =>
    `/gasolinera/${gasolinera.IDMunicipio}/${gasolinera.IDEESS}`;

  const totalSinFiltros = listadoPrecios.length;
  const totalVisible = sortedGasolineras.length;

  // FilterBar trabaja con sort = { by }; traducimos al string que MainContent
  // sigue usando para no tocar su API.
  const sortObj = { by: sortBy || "price" };
  const handleSortChange = (s) => {
    if (typeof onSort === "function") onSort(s.by);
  };

  const renderFilterBar = (visible) => (
    <FilterBar
      total={totalSinFiltros}
      visibleCount={visible}
      filters={filters}
      onFiltersChange={setFilters}
      sort={sortObj}
      onSortChange={handleSortChange}
      isNearMeMode={isNearMeMode}
      availableBrands={availableBrands}
      availableServiceIds={availableServiceIds}
      availableFuelIds={availableFuelIds}
    />
  );

  if (totalVisible === 0) {
    return (
      <section aria-label="Listado de gasolineras">
        {renderFilterBar(0)}
        <div className="empty">
          <div className="empty__title">
            Ningún resultado con estos filtros
          </div>
          <div className="empty__hint">
            Prueba a relajar alguno o púlsalo para quitarlo.
          </div>
          <button
            type="button"
            className="empty__action"
            onClick={() => setFilters({ ...DEFAULT_FILTERS })}
          >
            Limpiar filtros
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Listado de gasolineras">
      {renderFilterBar(totalVisible)}

      <ul className="list">
        {sortedGasolineras.map((gasolinera) => {
          const price = gasolinera[selectedFuel];
          const priceNum = parseFloat(price?.replace(",", ".") || "");
          const isCheapest =
            Number.isFinite(priceNum) &&
            priceNum === lowestPrices[selectedFuel];
          const hasPrice = price && price !== "" && price !== "-";
          const stationName = gasolinera["Rótulo"];
          const isFav = isFavorite(gasolinera.IDEESS);
          const distanceText =
            typeof gasolinera.distance === "number"
              ? gasolinera.distance.toFixed(1).replace(".", ",")
              : null;
          const distancePart = distanceText
            ? `, a ${distanceText} kilómetros`
            : "";
          const pricePart = hasPrice
            ? `, ${price} euros por litro`
            : `, sin ${fuelShortLabel(selectedFuel)} disponible`;
          const ariaLabel = `${stationName}${distancePart}${pricePart}. Ver detalle`;
          const href = buildHref(gasolinera);
          const cardClassName = [
            "station-card",
            isCheapest ? "station-card--cheapest" : "",
            isFav ? "station-card--fav" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={gasolinera.IDEESS} className="list__item">
              <Link to={href} className={cardClassName} aria-label={ariaLabel}>
                <span className="station-card__logo">
                  <img
                    src={`/station-icons/${getLogoForGasolinera(stationName)}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width="34"
                    height="34"
                  />
                </span>

                <span className="station-card__main">
                  <span className="station-card__topline">
                    <span className="station-card__name">{stationName}</span>
                    {isCheapest && (
                      <span className="station-card__tag">Mejor precio</span>
                    )}
                    {gasolinera["Tipo Venta"] === "R" && (
                      <span
                        className="station-card__tag station-card__tag--restricted"
                        title="Acceso restringido (cooperativa o flota)"
                      >
                        Restringida
                      </span>
                    )}
                  </span>
                  <span className="station-card__meta">
                    {distanceText && (
                      <span className="station-card__dist">
                        {distanceText} km
                      </span>
                    )}
                    <span className="station-card__addr">
                      {gasolinera.Dirección}
                    </span>
                  </span>
                </span>

                <span className="station-card__priceblock">
                  {hasPrice ? (
                    <>
                      <span className="station-card__price">{price}</span>
                      <span className="station-card__unit">€/L</span>
                    </>
                  ) : (
                    <span className="station-card__price--na">
                      {noPriceLabel(selectedFuel)}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GasolineraTable;
