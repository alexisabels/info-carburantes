import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme.preference";
const VALID = ["system", "light", "dark"];

const META_THEME = {
  light: "#ffffff",
  dark: "#0a0a0a",
};

const readPreference = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return VALID.includes(v) ? v : "system";
  } catch {
    return "system";
  }
};

const systemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const resolveTheme = (preference) =>
  preference === "system" ? systemTheme() : preference;

const applyTheme = (theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", META_THEME[theme] || META_THEME.light);
};

// Store compartido a nivel de módulo: sin Context, sin prop drilling. Cada
// llamada a useTheme se subscribe al mismo `state`, así que un toggle desde
// el Footer se propaga de inmediato al mapa de Leaflet (que necesita el
// theme para elegir el tile layer).
const state = {
  preference: typeof window === "undefined" ? "system" : readPreference(),
  resolved:
    typeof window === "undefined" ? "light" : resolveTheme(readPreference()),
};

const listeners = new Set();
let snapshot = state;

const updateSnapshot = () => {
  snapshot = { preference: state.preference, resolved: state.resolved };
};

const notify = () => {
  updateSnapshot();
  listeners.forEach((fn) => fn());
};

const subscribe = (fn) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const getSnapshot = () => snapshot;
const getServerSnapshot = () => snapshot;

const setPreferenceGlobal = (next) => {
  if (!VALID.includes(next)) return;
  if (state.preference === next) return;
  state.preference = next;
  state.resolved = resolveTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  applyTheme(state.resolved);
  notify();
};

// Listener único de matchMedia para el modo "system". Se monta la primera
// vez que algún consumidor se subscribe y se desmonta cuando ya no queda
// ninguno.
let mqlCleanup = null;
const ensureSystemListener = () => {
  if (mqlCleanup) return;
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handle = () => {
    if (state.preference !== "system") return;
    const next = mql.matches ? "dark" : "light";
    if (state.resolved === next) return;
    state.resolved = next;
    applyTheme(next);
    notify();
  };
  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", handle);
    mqlCleanup = () => mql.removeEventListener("change", handle);
  } else {
    mql.addListener(handle);
    mqlCleanup = () => mql.removeListener(handle);
  }
};

const teardownSystemListener = () => {
  if (!mqlCleanup) return;
  if (listeners.size > 0) return;
  mqlCleanup();
  mqlCleanup = null;
};

updateSnapshot();

export function useTheme() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    ensureSystemListener();
    return () => teardownSystemListener();
  }, []);

  // En el primer render aseguramos que <html data-theme> y meta theme-color
  // coincidan con el snapshot (el script inline del index.html ya lo
  // aplica, pero si el usuario llega con preferencia "system" y el SO
  // cambia entre el script inline y este efecto, nos ponemos al día).
  useEffect(() => {
    applyTheme(value.resolved);
  }, [value.resolved]);

  const setPreference = useCallback((next) => {
    setPreferenceGlobal(next);
  }, []);

  return {
    preference: value.preference,
    resolved: value.resolved,
    setPreference,
  };
}
