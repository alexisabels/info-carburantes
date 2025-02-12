/* eslint-disable react/prop-types */

import { formatHorario } from "../utils/formatHorario.jsx";
import { getLowestPrices } from "../utils/getLowestPrices";
import "../App.css";

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

  return (
    <>
      {fechaActualizacion && <p>Datos actualizados a {fechaActualizacion}</p>}
      <div className="gasolineras">
        <div className="enhanced-table-wrapper">
          <table className="gasolinera-table enhanced-table">
            <thead>
              <tr>
                <th>Dirección</th>
                <th>Localidad</th>
                <th className="gasoleo-a">Gasóleo A</th>
                <th className="gasoleo-premium">Gasóleo Premium</th>
                <th className="gasolina-95">Gasolina 95</th>
                <th className="gasolina-98">Gasolina 98</th>
                <th>Marca</th>
                <th>Horario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listadoPrecios.map((gasolinera) => {
                const isLowestPrice = (key) =>
                  parseFloat(gasolinera[key].replace(",", ".")) ===
                  lowestPrices[key];
                return (
                  <tr key={gasolinera.IDEESS}>
                    <td>{gasolinera.Dirección}</td>
                    <td>{gasolinera.Localidad}</td>
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
                    <td>{gasolinera["Rótulo"]}</td>
                    <td>{formatHorario(gasolinera.Horario)}</td>
                    <td>
                      <a
                        href={`/gasolinera/${municipioSeleccionado.IDMunicipio}/${gasolinera.IDEESS}`}
                      >
                        Detalles
                      </a>
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
