
/* eslint-disable react/prop-types */
import { getLowestPrices } from "../utils/getLowestPrices";
import "../App.css";
import { getLogoForGasolinera } from "../utils/logoUtils";

const GasolineraTable = ({
  listadoPrecios,
  loadingPrecios,
  municipioSeleccionado,
  fechaActualizacion,
  selectedFuel,
  isNearMeMode,
  sortBy,
}) => {
  const lowestPrices = getLowestPrices(listadoPrecios);

  if (loadingPrecios) {
    return <div className="loading-container">Cargando datos...</div>;
  }

  if (listadoPrecios.length === 0) {
    return (
      <div className="no-results">
        <p>
          {isNearMeMode
            ? "No se encontraron gasolineras cercanas."
            : `No se encontraron gasolineras en ${municipioSeleccionado?.Municipio}`}
        </p>
      </div>
    );
  }

  const handleGasolineraClick = (gasolinera) => {
    // If near me, we might not have IDMunicipio easily available if the API structure is different, 
    // but fetchTodasLasEstaciones returns objects with IDMunicipio.
    window.open(
      `/gasolinera/${gasolinera.IDMunicipio}/${gasolinera.IDEESS}`,
      "_blank"
    );
  };

  // Sort by selected fuel price or distance
  const sortedGasolineras = [...listadoPrecios].sort((a, b) => {
    if (sortBy === "distance" && a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }
    // Default to price sort
    const priceA = parseFloat(a[selectedFuel]?.replace(",", ".") || 999);
    const priceB = parseFloat(b[selectedFuel]?.replace(",", ".") || 999);
    return priceA - priceB;
  });

  const getFuelLabel = (key) => {
    switch (key) {
      case "Precio Gasoleo A": return "Diésel";
      case "Precio Gasoleo Premium": return "Diésel +";
      case "Precio Gasolina 95 E5": return "G95";
      case "Precio Gasolina 98 E5": return "G98";
      default: return key;
    }
  };

  return (
    <>
      {fechaActualizacion && (
        <div className="update-info">
          <span>🕒</span>
          <span>Actualizado: {fechaActualizacion}</span>
        </div>
      )}
      
      <div className="gasolineras-grid">
        {sortedGasolineras.map((gasolinera) => {
          const price = gasolinera[selectedFuel];
          const isCheapest =
            parseFloat(price?.replace(",", ".")) === lowestPrices[selectedFuel];
          const hasPrice = price && price !== "";

          return (
            <div 
              key={gasolinera.IDEESS} 
              className={`gasolinera-card ${isCheapest ? "cheapest-card" : ""}`}
              onClick={() => handleGasolineraClick(gasolinera)}
            >
              <div className="card-header">
                <img
                  src={`/station-icons/${getLogoForGasolinera(gasolinera["Rótulo"])}`}
                  alt={gasolinera["Rótulo"]}
                  className="card-logo"
                />
                <div className="card-title">
                  <h3>{gasolinera["Rótulo"]}</h3>
                  <span className="card-address">{gasolinera.Dirección}</span>
                  {gasolinera.distance && (
                    <span className="card-distance">
                      📍 a {gasolinera.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
              </div>

              <div className="card-price-section">
                <div className="main-price">
                  <span className="fuel-type-label">{getFuelLabel(selectedFuel)}</span>
                  {hasPrice ? (
                    <span className={`price-value ${isCheapest ? "price-cheapest" : ""}`}>
                      {price} <small>€/L</small>
                    </span>
                  ) : (
                    <span className="price-unavailable">No disponible</span>
                  )}
                </div>
              </div>

              <div className="card-actions">
                <button className="button-card-action">Ver Detalles</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GasolineraTable;
