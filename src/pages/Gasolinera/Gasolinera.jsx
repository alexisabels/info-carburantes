import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGasolineraPorID } from "../../utils/api";
import { formatHorario } from "../../utils/formatHorario";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./Gasolinera.css";
import { getLogoForGasolinera } from "../../utils/logoUtils";
function Gasolinera() {
  const { idMunicipio, idGasolinera } = useParams();
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
    return <p>Cargando gasolinera...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
    <div>
      <div className="gasolinera-header">
        <div className="gasolinera-title">
          <img
            src={`/station-icons/${getLogoForGasolinera(gasolinera["Rótulo"])}`}
            alt={gasolinera["Rótulo"]}
            className="gasolinera-logo"
          />
          <h2>
            {gasolinera["Rótulo"]} en {gasolinera.Localidad}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div className="address">
          <span>📍</span> {gasolinera.Dirección}, {gasolinera.Municipio}
        </div>{" "}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                "_blank"
              )
            }
            className="button-10"
          >
            Ir a Maps
          </button>
          <button onClick={handleShare} className="button-11">
            Compartir
          </button>
        </div>
      </div>
      <div className="horario-container">
        <div className="horario-title">
          <span>🕒</span> Horario
        </div>
        <div className="horario-content">
          {formatHorario(gasolinera.Horario)}
        </div>
      </div>
      <>
        <div className="gasolineras">
          <div className="enhanced-table-wrapper">
            <table className="gasolinera-table enhanced-table">
              <thead>
                <tr>
                  <th className="gasoleo-a">Diésel</th>
                  <th className="gasoleo-premium">Diésel Premium</th>
                  <th className="gasolina-95">Gasolina 95</th>
                  <th className="gasolina-98">Gasolina 98</th>
                </tr>
              </thead>
              <tbody>
                <tr key={gasolinera.IDEESS}>
                  <td className="digit gasoleo-a">
                    <strong>
                      {gasolinera["Precio Gasoleo A"] ? (
                        <>
                          {gasolinera["Precio Gasoleo A"]}
                          <small> €/ litro</small>
                        </>
                      ) : (
                        "Sin precios"
                      )}
                    </strong>
                  </td>
                  <td className="digit gasoleo-premium">
                    <strong>
                      {gasolinera["Precio Gasoleo Premium"] ? (
                        <>
                          {gasolinera["Precio Gasoleo Premium"]}
                          <small> €/ litro</small>
                        </>
                      ) : (
                        "Sin precios"
                      )}
                    </strong>
                  </td>
                  <td className="digit gasolina-95">
                    <strong>
                      {gasolinera["Precio Gasolina 95 E5"] ? (
                        <>
                          {gasolinera["Precio Gasolina 95 E5"]}
                          <small> €/ litro</small>
                        </>
                      ) : (
                        "Sin precios"
                      )}
                    </strong>
                  </td>
                  <td className="digit gasolina-98">
                    <strong>
                      {gasolinera["Precio Gasolina 98 E5"] ? (
                        <>
                          {gasolinera["Precio Gasolina 98 E5"]}
                          <small> €/ litro</small>
                        </>
                      ) : (
                        "Sin precios"
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%", marginTop: "20px" }}
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
