// Helpers de fechas para el histórico de precios. MITECO publica también
// fines de semana, así que NO los saltamos: si un día concreto no tiene
// datos, el componente lo trata como "hueco" en la línea.

// Devuelve N fechas terminando en AYER (no hoy). El endpoint
// EstacionesTerrestresHist rechaza la fecha actual con "Parametros de
// entrada incorrectos: La fecha de consulta al histórico…", así que el
// rango útil es [hoy - n, ayer].
export const lastNDays = (n) => {
  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(yesterday);
    d.setDate(yesterday.getDate() - i);
    out.push(d);
  }
  return out;
};

// Formato exigido por el endpoint EstacionesTerrestresHist: DD-MM-YYYY.
export const formatFechaApi = (fecha) => {
  const dd = String(fecha.getDate()).padStart(2, "0");
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const yyyy = fecha.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

// Clave estable para indexar fechas (YYYY-MM-DD, evita ambigüedades de zona
// horaria al pasar por toISOString tras setHours(0)).
export const fechaKey = (fecha) => {
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
