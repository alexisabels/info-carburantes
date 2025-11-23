import { useEffect, useState } from "react";
import { fetchProvincias, fetchTodasLasEstaciones } from "../utils/api";
import ProvinciaSelector from "./Selectors/ProvinciaSelector";
import MunicipioSelector from "./Selectors/MunicipioSelector";
import {
  handleSelectProvincia,
  handleSelectMunicipio,
} from "../utils/handlers";
import GasolineraTable from "./GasolineraTable";
import FuelTypeSelector from "./Selectors/FuelTypeSelector";
import { getUserLocation, calculateDistance } from "../utils/locationUtils";
import "../App.css";

const MainContent = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const [listadoPrecios, setListadoPrecios] = useState([]);
  const [loadingPrecios, setLoadingPrecios] = useState(false);
  const [fechaActualizacion, setFechaActualizacion] = useState(null);

  const [selectedFuel, setSelectedFuel] = useState("Precio Gasoleo A");
  const [isNearMeMode, setIsNearMeMode] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [showManualSearch, setShowManualSearch] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const provinciasData = await fetchProvincias();
        setProvincias(provinciasData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    loadData();
  }, []);

  const handleNearMe = async () => {
    setLoadingPrecios(true);
    setIsNearMeMode(true);
    setShowManualSearch(false);
    setSortBy("distance");
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);

    try {
      const location = await getUserLocation();
      const allStationsData = await fetchTodasLasEstaciones();
      const allStations = allStationsData.ListaEESSPrecio;

      const stationsWithDistance = allStations.map((station) => {
        const lat = parseFloat(station.Latitud.replace(",", "."));
        const lng = parseFloat(station["Longitud (WGS84)"].replace(",", "."));
        const distance = calculateDistance(
          location.lat,
          location.lng,
          lat,
          lng
        );
        return { ...station, distance };
      });

      const closestStations = stationsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 50);

      setListadoPrecios(closestStations);
      setFechaActualizacion(allStationsData.Fecha);
    } catch (error) {
      console.error("Error getting near stations:", error);
      alert("No se pudo obtener tu ubicación o cargar las gasolineras.");
    } finally {
      setLoadingPrecios(false);
    }
  };

  const handleManualSearchClick = () => {
    setShowManualSearch(true);
    setIsNearMeMode(false);
    setListadoPrecios([]);
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
  };

  const resetSearch = () => {
    setShowManualSearch(false);
    setIsNearMeMode(false);
    setListadoPrecios([]);
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
  };

  const showWelcome = !isNearMeMode && !showManualSearch;

  return (
    <main>
      {showWelcome && (
        <div className="welcome-container">
          <h1 className="welcome-title">Encuentra la gasolinera más barata</h1>
          <p className="welcome-subtitle">Elige cómo quieres buscar</p>
          
          <div className="search-options-grid">
            <div className="search-option-card" onClick={handleNearMe}>
              <div className="option-icon">📍</div>
              <h3>Cerca de mí</h3>
              <p>Usa tu ubicación GPS para encontrar gasolineras cercanas</p>
            </div>

            <div className="search-option-card" onClick={handleManualSearchClick}>
              <div className="option-icon">🏙️</div>
              <h3>Por Municipio</h3>
              <p>Selecciona una provincia y municipio manualmente</p>
            </div>
          </div>
        </div>
      )}

      {(isNearMeMode || showManualSearch) && (
        <button className="back-to-home" onClick={resetSearch}>
          ← Volver al inicio
        </button>
      )}

      {showManualSearch && (
        <div className="manual-search-container fade-in">
          <ProvinciaSelector
            provincias={provincias}
            onSelect={(e) => {
              handleSelectProvincia(
                e,
                provincias,
                setProvinciaSeleccionada,
                setMunicipioSeleccionado,
                setListadoPrecios,
                setMunicipios
              );
            }}
          />
          {provinciaSeleccionada ? (
            <MunicipioSelector
              municipios={municipios}
              onSelect={(e) =>
                handleSelectMunicipio(
                  e,
                  municipios,
                  setMunicipioSeleccionado,
                  setListadoPrecios,
                  setLoadingPrecios,
                  setFechaActualizacion
                )
              }
            />
          ) : (
            <div className="info-message">
              <p>Selecciona una provincia para comenzar</p>
            </div>
          )}
        </div>
      )}

      {(listadoPrecios.length > 0 || loadingPrecios) && (
        <>
          <FuelTypeSelector
            selectedFuel={selectedFuel}
            onSelectFuel={setSelectedFuel}
          />
          
          {isNearMeMode && (
            <div className="sort-controls">
              <span className="sort-label">Ordenar por:</span>
              <div className="sort-buttons">
                <button 
                  className={`sort-button ${sortBy === 'price' ? 'active' : ''}`}
                  onClick={() => setSortBy('price')}
                >
                  💶 Precio
                </button>
                <button 
                  className={`sort-button ${sortBy === 'distance' ? 'active' : ''}`}
                  onClick={() => setSortBy('distance')}
                >
                  📍 Distancia
                </button>
              </div>
            </div>
          )}

          <h1 className="results-title">
            {isNearMeMode
              ? "Gasolineras cercanas"
              : `Gasolineras en ${municipioSeleccionado?.Municipio}`}
          </h1>
          <GasolineraTable
            listadoPrecios={listadoPrecios}
            municipioSeleccionado={municipioSeleccionado}
            loadingPrecios={loadingPrecios}
            fechaActualizacion={fechaActualizacion}
            selectedFuel={selectedFuel}
            isNearMeMode={isNearMeMode}
            sortBy={sortBy}
          />
        </>
      )}
    </main>
  );
};

export default MainContent;
