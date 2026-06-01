"use client";

/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchHistoricoMunicipio } from "../../utils/api";
import { lastNDays, fechaKey } from "../../utils/dateRange";
import { fuelShortLabel } from "../../utils/fuelLabels";
import "./PriceHistoryChart.css";

const RANGES = [7, 30, 90];
// 8 fetches en paralelo: balance entre velocidad y no estresar la API.
const PARALLEL_BATCH = 8;

// ID único del gradient. Si en algún momento hay varios charts en la misma
// página haría falta un ID por instancia (con useId). De momento la página
// solo monta uno.
const GRADIENT_ID = "pricehist-grad";

// Misma lógica que GasolineraTable.formatearPrecio: precio numérico o null.
// Duplicada localmente para no acoplar; si en el futuro se mueve a utils,
// refactorizar aquí también.
const parsePrecio = (raw) => {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
};

const fmtPrecio = (n) => n.toFixed(3).replace(".", ",");

// Reconstrucción de Date a partir de "YYYY-MM-DD" sin pasar por timezone:
// new Date("2026-04-28") interpreta UTC y puede saltar de día en zonas
// negativas. Evitamos sustos con el constructor numérico.
const dateFromKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const FMT_TICK_SHORT = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
});
const FMT_TICK_WEEKDAY = new Intl.DateTimeFormat("es-ES", {
  weekday: "short",
  day: "numeric",
});
const FMT_TIP_LONG = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Devuelve el formato y la separación de ticks adecuados al rango. Para 7
// días mostramos día de la semana (más informativo); en rangos largos solo
// día/mes con menor densidad para que no se solapen.
const tickConfig = (range) => {
  if (range <= 7) {
    return { interval: 0, formatter: (d) => capitalize(FMT_TICK_WEEKDAY.format(d).replace(".", "")) };
  }
  if (range <= 30) {
    return { interval: 4, formatter: (d) => FMT_TICK_SHORT.format(d).replace(".", "") };
  }
  return { interval: 13, formatter: (d) => FMT_TICK_SHORT.format(d).replace(".", "") };
};

// matchMedia reactivo para respetar "prefers-reduced-motion". Recharts no lo
// mira por su cuenta, así que con esto apagamos la animación de dibujado del
// área cuando el usuario ha pedido reducir el movimiento en el sistema.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

const PriceHistoryChart = ({ idMunicipio, idEstacion, fuels, defaultFuel }) => {
  const [range, setRange] = useState(7);
  // Combustible activo. Inicializamos con `defaultFuel` si está entre los
  // disponibles; si no, el primero disponible. Cambiar combustible NO
  // dispara un nuevo fetch porque rawByFecha guarda la estación completa.
  const [activeFuel, setActiveFuel] = useState(() => {
    if (defaultFuel && fuels?.some((f) => f.campo === defaultFuel))
      return defaultFuel;
    return fuels?.[0]?.campo || null;
  });
  // Firma estable de la lista de combustibles para no disparar el effect
  // de re-sincronización cada vez que el padre re-renderiza (chartFuels se
  // recalcula en cada render aunque el contenido no cambie).
  const fuelsSig = fuels?.map((f) => f.campo).join(",") || "";

  // Si cambia la estación o la lista de combustibles disponibles,
  // re-sincronizamos al preferido (o al primero) para no quedarnos con un
  // combustible que esa estación ya no tiene.
  useEffect(() => {
    setActiveFuel((prev) => {
      if (prev && fuels?.some((f) => f.campo === prev)) return prev;
      if (defaultFuel && fuels?.some((f) => f.campo === defaultFuel))
        return defaultFuel;
      return fuels?.[0]?.campo || null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMunicipio, idEstacion, fuelsSig, defaultFuel]);

  // rawByFecha: Map<YYYY-MM-DD, station-object | null>
  // Guardamos la estación entera (no solo el precio) para que cambiar de
  // combustible reuse la caché: re-extraemos rawByFecha[*][activeFuel].
  const [rawByFecha, setRawByFecha] = useState(new Map());
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [progress, setProgress] = useState({ fetched: 0, total: 0 });
  // Respeta prefers-reduced-motion para la animación de dibujado del área.
  const reducedMotion = usePrefersReducedMotion();

  const requestIdRef = useRef(0);
  const abortRef = useRef(null);
  // Detecta cambios de estación dentro del mismo effect para evitar usar
  // rawByFecha "stale" (con datos de la estación anterior) al renderizar la
  // siguiente. Si lo detectáramos en un effect separado, el segundo
  // re-ejecutaría con la caché antigua antes de que el reset se aplicase.
  const stationKeyRef = useRef("");

  // Carga las fechas del rango actual. Reutiliza Map previo para evitar
  // re-fetch (si el usuario va de 7d → 30d, ya tenemos los últimos 7).
  useEffect(() => {
    const reqId = ++requestIdRef.current;
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const stationKey = `${idMunicipio}|${idEstacion}`;
    const isFreshStation = stationKey !== stationKeyRef.current;
    stationKeyRef.current = stationKey;

    // Si saltamos a otra estación, ignoramos rawByFecha (eran datos de la
    // estación previa) y empezamos con un Map vacío.
    const sourceMap = isFreshStation ? new Map() : rawByFecha;
    if (isFreshStation) {
      setRawByFecha(sourceMap);
    }

    const fechas = lastNDays(range);
    const pendientes = fechas.filter((d) => !sourceMap.has(fechaKey(d)));

    if (pendientes.length === 0) {
      setStatus("ready");
      return undefined;
    }

    setStatus("loading");
    setProgress({ fetched: sourceMap.size, total: fechas.length });

    let cancelled = false;
    const localMap = new Map(sourceMap);

    const runBatch = async (batch) => {
      const results = await Promise.all(
        batch.map(async (fecha) => {
          const data = await fetchHistoricoMunicipio(fecha, idMunicipio, {
            signal: ctrl.signal,
          });
          const lista = Array.isArray(data?.ListaEESSPrecio)
            ? data.ListaEESSPrecio
            : [];
          const ideessStr = String(idEstacion);
          const station =
            lista.find((e) => e && String(e.IDEESS) === ideessStr) || null;
          return [fechaKey(fecha), station];
        })
      );
      if (cancelled || reqId !== requestIdRef.current) return;
      for (const [k, v] of results) localMap.set(k, v);
      setRawByFecha(new Map(localMap));
      setProgress({ fetched: localMap.size, total: fechas.length });
    };

    (async () => {
      try {
        for (let i = 0; i < pendientes.length; i += PARALLEL_BATCH) {
          await runBatch(pendientes.slice(i, i + PARALLEL_BATCH));
          if (cancelled || reqId !== requestIdRef.current) return;
        }
        if (!cancelled && reqId === requestIdRef.current) setStatus("ready");
      } catch (err) {
        if (err && err.name === "AbortError") return;
        if (!cancelled && reqId === requestIdRef.current) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
    };
    // OJO: NO incluir activeFuel — el cambio de combustible no debe disparar
    // fetch (la caché ya tiene la estación entera para cada fecha).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, idMunicipio, idEstacion]);

  // Serie a pintar: extrae el precio del combustible seleccionado de las
  // estaciones cacheadas, en orden cronológico para el rango actual. La fila
  // incluye `fechaKey` (clave estable para Recharts), `fecha` (Date para
  // formateo en tooltip/eje) y `precio` (number | null).
  const serie = useMemo(() => {
    const fechas = lastNDays(range);
    return fechas.map((d) => {
      const k = fechaKey(d);
      const station = rawByFecha.get(k);
      return {
        fechaKey: k,
        fecha: d,
        precio: station && activeFuel ? parsePrecio(station[activeFuel]) : null,
      };
    });
  }, [range, rawByFecha, activeFuel]);

  // --- Buffer de presentación -------------------------------------------
  // `serie` se recalcula con CADA lote que entra (rawByFecha cambia de 8 en 8
  // fechas). Pintar eso directamente era lo que producía las "franjas a palo
  // seco": el área crecía a tirones, sin transición. En su lugar congelamos
  // lo que se dibuja y solo lo actualizamos cuando el rango está COMPLETO
  // (status === "ready"). Cada commit incrementa `key`, lo que remonta el
  // chart y reproduce su animación de dibujado una sola vez con el dataset
  // entero, en vez de redibujarse a trompicones en cada lote.
  const stationId = `${idMunicipio}|${idEstacion}`;
  const [display, setDisplay] = useState({
    serie: [],
    range,
    key: 0,
    station: "",
  });
  useEffect(() => {
    if (status !== "ready") return;
    setDisplay((prev) => ({
      serie,
      range,
      station: stationId,
      key: prev.station === stationId ? prev.key + 1 : 1,
    }));
  }, [status, serie, range, stationId]);

  // Mientras no haya un frame completo para esta estación mostramos el
  // esqueleto (carga en frío o cambio de estación): nunca datos a medias.
  const showSkeleton = display.key === 0 || display.station !== stationId;
  const drawSerie = display.serie;

  const stats = useMemo(() => {
    const valores = drawSerie.map((p) => p.precio).filter((v) => v != null);
    if (valores.length === 0) return null;
    let min = valores[0];
    let max = valores[0];
    let sum = 0;
    for (const v of valores) {
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
    }
    return { min, max, avg: sum / valores.length, count: valores.length };
  }, [drawSerie]);

  // Punto destacado: último día con precio del rango dibujado.
  const lastPoint = useMemo(() => {
    for (let i = drawSerie.length - 1; i >= 0; i--) {
      if (drawSerie[i].precio != null) return drawSerie[i];
    }
    return null;
  }, [drawSerie]);

  // Dominio Y con un 12% de aire arriba y abajo para que la línea no toque
  // los bordes. Recharts acepta números fijos o funciones — aquí precomputo
  // para que recharts no expanda agresivamente con dataMin/dataMax.
  const yDomain = useMemo(() => {
    if (!stats) return ["auto", "auto"];
    const span = Math.max(stats.max - stats.min, 0.005);
    const pad = span * 0.12;
    return [stats.min - pad, stats.max + pad];
  }, [stats]);

  const tick = useMemo(() => tickConfig(display.range), [display.range]);
  const noData = !showSkeleton && status === "ready" && !stats;
  const showFuelPicker = Array.isArray(fuels) && fuels.length > 1;
  // Sin picker (estación con un solo carburante) el título lo nombra; con
  // picker redunda con el chip activo, así que generalizamos.
  const title = showFuelPicker
    ? "Histórico de precios"
    : `Histórico de ${fuelShortLabel(activeFuel)}`;

  return (
    <section className="pricehist" aria-label="Histórico de precios">
      <header className="pricehist__head">
        <h2 className="pricehist__title">{title}</h2>
        <div className="pricehist__pills" role="group" aria-label="Rango temporal">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              className="pricehist__pill"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
            >
              {r}d
            </button>
          ))}
        </div>
      </header>

      {showFuelPicker && (
        <div
          className="pricehist__fuels"
          role="group"
          aria-label="Combustible"
        >
          {fuels.map((f) => (
            <button
              key={f.campo}
              type="button"
              className="pricehist__fuel"
              aria-pressed={activeFuel === f.campo}
              onClick={() => setActiveFuel(f.campo)}
            >
              {f.etiqueta}
            </button>
          ))}
        </div>
      )}

      {noData ? (
        <p className="pricehist__empty">
          Sin histórico disponible para este combustible.
        </p>
      ) : showSkeleton ? (
        <ChartSkeleton />
      ) : (
        <>
          <div
            key={display.key}
            className="pricehist__chartwrap pricehist__chartwrap--enter"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={drawSerie}
                margin={{ top: 8, right: 12, left: 0, bottom: 4 }}
              >
                <defs>
                  <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="fechaKey"
                  tickFormatter={(key) => tick.formatter(dateFromKey(key))}
                  interval={tick.interval}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={8}
                  tick={{
                    fill: "currentColor",
                    fillOpacity: 0.6,
                    fontSize: 11,
                  }}
                />
                <YAxis
                  domain={yDomain}
                  width={42}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => fmtPrecio(v)}
                  // Ticks explícitos en min/medio/max REALES del dataset
                  // para evitar que Recharts genere etiquetas "agradables"
                  // que caen fuera de los datos (mostraría un techo que el
                  // usuario nunca encontraría al pasar el ratón).
                  ticks={
                    stats
                      ? [stats.min, (stats.min + stats.max) / 2, stats.max]
                      : undefined
                  }
                  tickMargin={4}
                  tick={{
                    fill: "currentColor",
                    fillOpacity: 0.55,
                    fontSize: 10,
                  }}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{
                    stroke: "currentColor",
                    strokeOpacity: 0.35,
                    strokeDasharray: "3 3",
                  }}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="precio"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill={`url(#${GRADIENT_ID})`}
                  // Dot solo en puntos huérfanos (días aislados rodeados de
                  // huecos). Sin línea que los conecte, serían invisibles y
                  // los stats parecerían "mentir" al usuario.
                  dot={(props) => {
                    const { cx, cy, index } = props;
                    const point = drawSerie[index];
                    if (!point || point.precio == null) return null;
                    const prev = drawSerie[index - 1]?.precio;
                    const next = drawSerie[index + 1]?.precio;
                    if (prev != null || next != null) return null;
                    return (
                      <circle
                        key={`orphan-${point.fechaKey}`}
                        cx={cx}
                        cy={cy}
                        r={2.5}
                        fill="currentColor"
                        stroke="var(--bg-2)"
                        strokeWidth={1.5}
                      />
                    );
                  }}
                  activeDot={{
                    r: 4,
                    fill: "currentColor",
                    stroke: "var(--bg-2)",
                    strokeWidth: 2,
                  }}
                  connectNulls={false}
                  // El área se dibuja sola (barrido de izq. a der.) una vez
                  // por frame: como `drawSerie` solo cambia con el rango
                  // completo, no hay re-animaciones a trompicones.
                  isAnimationActive={!reducedMotion}
                  animationDuration={reducedMotion ? 0 : 750}
                  animationEasing="ease-out"
                  // Los puntos/dots aparecen al terminar el trazo, no antes.
                  animationBegin={reducedMotion ? 0 : 80}
                />
                {lastPoint && (
                  <ReferenceDot
                    x={lastPoint.fechaKey}
                    y={lastPoint.precio}
                    r={3.5}
                    fill="currentColor"
                    stroke="var(--bg-2)"
                    strokeWidth={2}
                    isFront
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {stats && (
            <p className="pricehist__summary">
              Mín <strong>{fmtPrecio(stats.min)}</strong> · Máx{" "}
              <strong>{fmtPrecio(stats.max)}</strong> · Media{" "}
              <strong>{fmtPrecio(stats.avg)}</strong> €/L
            </p>
          )}
        </>
      )}
      {/* El progreso/errores van a nivel de sección para acompañar tanto al
          esqueleto (carga en frío) como al chart ya dibujado (rangos largos
          que siguen completándose). */}
      {status === "loading" && (
        <p className="pricehist__loading" role="status" aria-live="polite">
          Cargando histórico… ({progress.fetched}/{progress.total})
        </p>
      )}
      {status === "error" && (
        <p className="pricehist__error" role="alert">
          No se pudo cargar el histórico completo.
        </p>
      )}
    </section>
  );
};

// Tooltip inline: cabecera con fecha en formato largo + precio destacado.
// Recharts pasa `payload` con la fila completa en payload[0].payload.
function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;
  if (!row || row.precio == null) return null;
  return (
    <div className="pricehist__tip" role="tooltip">
      <div className="pricehist__tip-date">
        {capitalize(FMT_TIP_LONG.format(row.fecha))}
      </div>
      <div className="pricehist__tip-price">
        <strong>{fmtPrecio(row.precio)}</strong>
        <span> €/L</span>
      </div>
    </div>
  );
}

// Esqueleto de carga: silueta de un gráfico (área + línea suavizadas) con un
// brillo que la barre, para que el espacio "respire" mientras llegan los
// datos en lugar de quedarse vacío o ir poblándose a tirones. El SVG se
// estira al contenedor (preserveAspectRatio="none") y el trazo se mantiene
// fino gracias a vector-effect.
function ChartSkeleton() {
  return (
    <div className="pricehist__chartwrap" aria-hidden="true">
      <div className="pricehist__skeleton">
        <svg
          className="pricehist__skeleton-svg"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            className="pricehist__skeleton-fill"
            d="M0,28 C10,24 18,16 30,18 C42,20 50,9 62,12 C74,15 84,7 100,5 L100,40 L0,40 Z"
          />
          <path
            className="pricehist__skeleton-stroke"
            fill="none"
            d="M0,28 C10,24 18,16 30,18 C42,20 50,9 62,12 C74,15 84,7 100,5"
          />
        </svg>
        <div className="pricehist__shimmer" />
      </div>
    </div>
  );
}

export default PriceHistoryChart;
