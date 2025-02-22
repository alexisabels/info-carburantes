/* eslint-disable react/prop-types */
import { getLowestPrices } from "../utils/getLowestPrices";
import "../App.css";
import { getLogoForGasolinera } from "../utils/logoUtils";

const GasolineraTable = ({
  listadoPrecios,
  loadingPrecios,
  municipioSeleccionado,
  fechaActualizacion,
}) => {
  const lowestPrices = getLowestPrices(listadoPrecios);
  if (loadingPrecios) {
    return <p>Cargando datos...</p>;
  }

  if (listadoPrecios.length === 0) {
    return (
      <p>No se encontraron gasolineras en {municipioSeleccionado.Municipio}</p>
    );
  }
  const handleGasolineraClick = (gasolinera) => {
    window.open(
      `/gasolinera/${municipioSeleccionado.IDMunicipio}/${gasolinera.IDEESS}`,
      "_blank"
    );
  };
  return (
    <>
      {fechaActualizacion && (
        <div className="update-info">
          <span>🕒</span>
          <span>Datos actualizados a: {fechaActualizacion}</span>
          <p></p>
        </div>
      )}
      <div className="gasolineras">
        <div className="enhanced-table-wrapper">
          <table className=" enhanced-table enhanced-table-main">
            <thead>
              <tr>
                <th>MARCA</th>
                <th>DIRECCIÓN</th>
                <th className="gasoleo-a">DIÉSEL</th>
                <th className="gasoleo-premium">DIÉSEL PREMIUM</th>
                <th className="gasolina-95">GASOLINA 95</th>
                <th className="gasolina-98">GASOLINA 98</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listadoPrecios.map((gasolinera) => {
                const isLowestPrice = (key) =>
                  parseFloat(gasolinera[key].replace(",", ".")) ===
                  lowestPrices[key];
                return (
                  <tr
                    key={gasolinera.IDEESS}
                    onClick={() => handleGasolineraClick(gasolinera)}
                  >
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          width: "100%",
                        }}
                      >
                        <img
                          src={`/station-icons/${getLogoForGasolinera(
                            gasolinera["Rótulo"]
                          )}`}
                          alt={gasolinera["Rótulo"]}
                          style={{ width: "55px", height: "55px" }}
                        />
                        <span style={{ fontSize: "12px" }}>
                          {getLogoForGasolinera(gasolinera["Rótulo"]) ==
                          "logo_generico.gif"
                            ? gasolinera["Rótulo"]
                            : ""}
                        </span>
                      </div>
                    </td>
                    <td>{gasolinera.Dirección}</td>
                    <td
                      className={`digit gasoleo-a ${
                        isLowestPrice("Precio Gasoleo A") ? "lowest-price" : ""
                      }`}
                    >
                      <strong>{gasolinera["Precio Gasoleo A"] || "-"}</strong>
                    </td>
                    <td
                      className={`digit gasoleo-premium ${
                        isLowestPrice("Precio Gasoleo Premium")
                          ? "lowest-price"
                          : ""
                      }`}
                    >
                      <strong>
                        {gasolinera["Precio Gasoleo Premium"] || "-"}
                      </strong>
                    </td>
                    <td
                      className={`digit gasolina-95 ${
                        isLowestPrice("Precio Gasolina 95 E5")
                          ? "lowest-price"
                          : ""
                      }`}
                    >
                      <strong>
                        {gasolinera["Precio Gasolina 95 E5"] || "-"}
                      </strong>
                    </td>
                    <td
                      className={`digit gasolina-98 ${
                        isLowestPrice("Precio Gasolina 98 E5")
                          ? "lowest-price"
                          : ""
                      }`}
                    >
                      <strong>
                        {gasolinera["Precio Gasolina 98 E5"] || "-"}
                      </strong>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() =>
                          window.open(
                            `/gasolinera/${municipioSeleccionado.IDMunicipio}/${gasolinera.IDEESS}`,
                            "_blank"
                          )
                        }
                        className="button-10"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GasolineraTable;
