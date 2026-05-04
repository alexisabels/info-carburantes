// Días válidos: L (lunes), M (martes), X (miércoles), J (jueves),
// V (viernes), S (sábado), D (domingo).
const DAY_LETTERS = "LMXJVSD";
const DAY_TOKEN = `[${DAY_LETTERS}](?:-[${DAY_LETTERS}])?`;
// Captura una lista de tokens de día separados por coma: "L-V", "S,D", "L,X,V"...
const DAY_PREFIX_RE = new RegExp(`^(${DAY_TOKEN}(?:\\s*,\\s*${DAY_TOKEN})*)\\s*:\\s*(.+)$`);

const DAY_INDEX = { L: 1, M: 2, X: 3, J: 4, V: 5, S: 6, D: 0 };

const splitSegments = (horario) =>
  horario
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean);

// Parte el lado derecho (las franjas) preservando la "y" como separador legible.
const splitFranjas = (rest) =>
  rest
    .split(/\s+y\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

const renderFranjas = (franjas) => {
  // Si solo hay una franja, devolvemos un span; si hay varias, intercalamos " y ".
  if (franjas.length === 1) {
    const value = franjas[0];
    if (/^24\s*h$/i.test(value)) return "Abierto 24 h";
    if (/^cerrado$/i.test(value)) return "Cerrado";
    return value;
  }
  return franjas
    .map((value) => {
      if (/^24\s*h$/i.test(value)) return "Abierto 24 h";
      if (/^cerrado$/i.test(value)) return "Cerrado";
      return value;
    })
    .join(" y ");
};

const parseSegment = (segment) => {
  // Caso especial: "L-D: 24H" → días + 24H.
  const match = segment.match(DAY_PREFIX_RE);
  if (!match) return null;
  const [, dias, rest] = match;
  const franjas = splitFranjas(rest);
  return { dias: dias.replace(/\s+/g, ""), franjas };
};

export const formatHorario = (horario) => {
  if (typeof horario !== "string" || !horario.trim()) {
    return <div>Horario no disponible</div>;
  }

  const segments = splitSegments(horario);
  if (segments.length === 0) {
    return <div>Horario no disponible</div>;
  }

  const parsed = segments.map((segment) => ({
    raw: segment,
    parsed: parseSegment(segment),
  }));

  // Si ningún segmento es reconocible, devolvemos el string crudo en un único <div>.
  if (parsed.every((item) => !item.parsed)) {
    return <div>{horario.trim()}</div>;
  }

  return parsed.map((item, index) => {
    if (!item.parsed) {
      return <div key={index}>{item.raw}</div>;
    }
    const { dias, franjas } = item.parsed;
    return (
      <div key={index}>
        <span className="dias">{dias}</span>
        <span className="franja">{renderFranjas(franjas)}</span>
      </div>
    );
  });
};

// Expande un token de día ("L", "L-V", "S-D") al conjunto de índices 0..6 (D=0).
const expandDayToken = (token) => {
  const trimmed = token.trim();
  if (trimmed.length === 1) {
    const idx = DAY_INDEX[trimmed];
    return idx === undefined ? [] : [idx];
  }
  const parts = trimmed.split("-");
  if (parts.length !== 2) return [];
  const start = DAY_INDEX[parts[0]];
  const end = DAY_INDEX[parts[1]];
  if (start === undefined || end === undefined) return [];
  // El rango se entiende en orden semanal lunes→domingo. Para simplificar lo
  // recorremos circularmente desde start hasta end.
  const result = [];
  let cursor = start;
  // Salvaguarda: máximo 7 iteraciones.
  for (let i = 0; i < 7; i += 1) {
    result.push(cursor);
    if (cursor === end) break;
    cursor = (cursor + 1) % 7;
  }
  return result;
};

const expandDays = (diasStr) =>
  diasStr
    .split(",")
    .flatMap(expandDayToken);

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

// Devuelve true si el horario cubre los 7 días con franjas exclusivamente "24H".
// Conservador: si hay alguna franja no-24H, o no podemos parsear algún segmento,
// devolvemos false. Así nunca marcamos como 24h una gasolinera que solo lo es
// algunos días.
export const is24h = (horario) => {
  if (typeof horario !== "string" || !horario.trim()) return false;
  const segments = splitSegments(horario);
  if (segments.length === 0) return false;

  const days24h = new Set();
  for (const segment of segments) {
    const parsed = parseSegment(segment);
    if (!parsed) return false;
    const all24h = parsed.franjas.every((f) => /^24\s*h$/i.test(f));
    if (!all24h) return false;
    expandDays(parsed.dias).forEach((d) => days24h.add(d));
  }
  // 7 días = L,M,X,J,V,S,D (índices 1,2,3,4,5,6,0).
  return days24h.size === 7;
};

// Devuelve true|false|null según el horario y la fecha indicada (por defecto, ahora).
export const isOpenNow = (horario, now = new Date()) => {
  if (typeof horario !== "string" || !horario.trim()) return null;

  const segments = splitSegments(horario);
  if (segments.length === 0) return null;

  const today = now.getDay(); // 0 = domingo
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let matchedToday = false;
  let determinable = false;

  for (const segment of segments) {
    const parsed = parseSegment(segment);
    if (!parsed) continue;
    determinable = true;
    const days = expandDays(parsed.dias);
    if (!days.includes(today)) continue;
    matchedToday = true;

    for (const franja of parsed.franjas) {
      if (/^24\s*h$/i.test(franja)) return true;
      if (/^cerrado$/i.test(franja)) return false;
      const m = franja.match(/^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/);
      if (!m) continue;
      const start = toMinutes(m[1]);
      const end = toMinutes(m[2]);
      if (start === null || end === null) continue;
      // Soporta cruces de medianoche (start > end).
      if (start <= end) {
        if (nowMinutes >= start && nowMinutes < end) return true;
      } else if (nowMinutes >= start || nowMinutes < end) {
        return true;
      }
    }
  }

  if (!determinable) return null;
  // Hubo segmentos parseables pero ninguna franja activa: cerrado si al menos
  // un segmento aplicaba a hoy; indeterminable si ningún segmento cubría el día.
  return matchedToday ? false : null;
};
