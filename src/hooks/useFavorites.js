import { useCallback, useEffect, useState } from "react";

// Clave única en localStorage. Si más adelante cambia el formato (p. ej. se
// añaden campos nuevos), conviene versionar la clave para evitar mezclar
// estructuras antiguas con nuevas.
const STORAGE_KEY = "favorites";

// Tope defensivo: 100 favoritos cubre con holgura cualquier uso real y evita
// que localStorage crezca sin límite. El más reciente queda en la posición 0;
// al pasar de 100 se descarta el más antiguo (cola al final del array).
const MAX_FAVORITES = 100;

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

// Lectura segura. Si el JSON está corrupto, devolvemos [] sin propagar error,
// porque un favorito perdido no debe romper la app.
const readStorage = () => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filtramos elementos sin id por si quedó basura de versiones previas.
    return parsed.filter((item) => item && typeof item.ideess === "string");
  } catch {
    return [];
  }
};

const writeStorage = (favorites) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // QuotaExceededError o modo privado: silenciamos para no romper la UI.
    // El estado en memoria sigue siendo coherente durante la sesión.
  }
};

// Normaliza un objeto del API (claves con tildes y mayúsculas variables) a un
// objeto compacto serializable. Se admiten también las claves "limpias" que
// usa el hook por si el llamador ya las pasa así.
const toCompactStation = (station) => {
  if (!station || typeof station !== "object") return null;
  const ideess = station.IDEESS ?? station.ideess;
  if (ideess === undefined || ideess === null) return null;
  return {
    ideess: String(ideess),
    idMunicipio: String(
      station.IDMunicipio ?? station.idMunicipio ?? ""
    ),
    rotulo: String(station["Rótulo"] ?? station.rotulo ?? ""),
    direccion: String(station["Dirección"] ?? station.direccion ?? ""),
    localidad: String(station.Localidad ?? station.localidad ?? ""),
    provincia: String(station.Provincia ?? station.provincia ?? ""),
  };
};

export function useFavorites() {
  // Inicialización SSR-safe: en servidor devolvemos [] y rehidratamos en el
  // primer effect. En cliente leemos directamente del storage en el lazy init
  // para evitar parpadeos innecesarios.
  const [favorites, setFavorites] = useState(() =>
    isBrowser ? readStorage() : []
  );

  // Rehidratación post-mount (cubre SSR y casos donde el lazy init corrió
  // antes de que el storage estuviera disponible).
  useEffect(() => {
    if (!isBrowser) return;
    setFavorites(readStorage());
  }, []);

  // Sincronización entre pestañas: el evento "storage" sólo se dispara en
  // pestañas distintas a la que escribió. event.key es null cuando se llama
  // a clear(); en ese caso refrescamos también.
  useEffect(() => {
    if (!isBrowser) return;
    const handleStorage = (event) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      setFavorites(readStorage());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isFavorite = useCallback(
    (id) => {
      if (id === undefined || id === null) return false;
      const target = String(id);
      return favorites.some((fav) => fav.ideess === target);
    },
    [favorites]
  );

  const addFavorite = useCallback((station) => {
    const compact = toCompactStation(station);
    if (!compact) return;
    setFavorites((prev) => {
      // Si ya existe lo movemos al frente (LRU): así el usuario percibe que
      // su favorito reciente "sube".
      const filtered = prev.filter((fav) => fav.ideess !== compact.ideess);
      const next = [compact, ...filtered].slice(0, MAX_FAVORITES);
      writeStorage(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    if (id === undefined || id === null) return;
    const target = String(id);
    setFavorites((prev) => {
      const next = prev.filter((fav) => fav.ideess !== target);
      // Sólo escribimos si hubo cambio para evitar disparar el evento storage
      // a otras pestañas innecesariamente.
      if (next.length === prev.length) return prev;
      writeStorage(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(
    (station) => {
      const compact = toCompactStation(station);
      if (!compact) return;
      if (favorites.some((fav) => fav.ideess === compact.ideess)) {
        removeFavorite(compact.ideess);
      } else {
        addFavorite(compact);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    setFavorites(() => {
      writeStorage([]);
      return [];
    });
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}

export default useFavorites;
