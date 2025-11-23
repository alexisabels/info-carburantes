import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGasolineraPorID } from "../../utils/api";
import { formatHorario } from "../../utils/formatHorario";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./Gasolinera.css";
import { getLogoForGasolinera } from "../../utils/logoUtils";

function Gasolinera() {
  const { idMunicipio, idGasolinera } = useParams();
  const navigate = useNavigate();
  const [gasolinera, setGasolinera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGasolineraPorID(idMunicipio, idGasolinera);
        setGasolinera(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idMunicipio, idGasolinera]);

  if (loading) {
    return <div className="loading-container">Cargando gasolinera...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const customIcon = L.icon({
    iconUrl: "/9772.svg",
    iconRetinaUrl: "/9772.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  if (!gasolinera) {
    return <p>No se encontró la gasolinera</p>;
  }

  const lat = parseFloat(gasolinera["Latitud"].replace(",", "."));
  const lng = parseFloat(gasolinera["Longitud (WGS84)"].replace(",", "."));

  const handleShare = () => {
    const shareData = {
      title: `Gasolinera ${gasolinera["Rótulo"]}`,
      text: `Mira los precios para la gasolinera ${gasolinera["Rótulo"]} en ${gasolinera.Dirección}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Compartido exitosamente"))
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      prompt("Copia este enlace para compartir:", window.location.href);
    }
  };

  return (
    <div className="gasolinera-detail-page">
      <button className="back-button-modern" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="gasolinera-header">
        <div className="gasolinera-title">
          <img
            src={`/station-icons/${getLogoForGasolinera(gasolinera["Rótulo"])}`}
            alt={gasolinera["Rótulo"]}
            className="gasolinera-logo"
          />
          <h2>{gasolinera["Rótulo"]}</h2>
        </div>

        <div className="address">
          <span>📍</span> {gasolinera.Dirección}, {gasolinera.Localidad}
        </div>

        <div className="action-buttons">
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                "_blank"
              )
            }
            className="button-10"
          >
            📍 Ir a Maps
          </button>
          <button onClick={handleShare} className="button-11">
            🔗 Compartir
          </button>
        </div>
      </div>

      <div className="prices-list-container">
        <h3>Precios Actuales</h3>
        <div className="prices-grid">
          <div className="price-item">
            <span className="price-label">Diésel (A)</span>
            <span className="price-number">
              {gasolinera["Precio Gasoleo A"] || "-"} <small>€/L</small>
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Diésel Premium</span>
            <span className="price-number">
              {gasolinera["Precio Gasoleo Premium"] || "-"} <small>€/L</small>
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Gasolina 95</span>
            <span className="price-number">
              {gasolinera["Precio Gasolina 95 E5"] || "-"} <small>€/L</small>
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Gasolina 98</span>
            <span className="price-number">
              {gasolinera["Precio Gasolina 98 E5"] || "-"} <small>€/L</small>
            </span>
          </div>
        </div>
      </div>

      <div className="horario-container">
        <div className="horario-title">
          <span>🕒</span> Horario de Apertura
        </div>
        <div className="horario-content">
          {formatHorario(gasolinera.Horario)}
        </div>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="map-container-rounded"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>{gasolinera["Rótulo"]}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Gasolinera;
