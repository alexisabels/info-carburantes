import { useEffect, useState } from "react";
import { fetchProvincias } from "./api";
import ProvinciaSelector from "./components/ProvinciaSelector";
import MunicipioSelector from "./components/MunicipioSelector";
import { handleSelectProvincia, handleSelectMunicipio } from "./handlers";
import "./App.css";

function App() {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const [listadoPrecios, setListadoPrecios] = useState([]);
  const [loadingPrecios, setLoadingPrecios] = useState(false);
  const [fechaActualizacion, setFechaActualizacion] = useState(null);

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

  const formatHorario = (horario) => {
    return horario
      .split(";")
      .map((line, index) => (
        <div key={index}>
          {line.trim() + (index < horario.split(";").length - 1 ? "," : "")}
        </div>
      ));
  };

  const getLowestPrices = (listadoPrecios) => {
    const lowestPrices = {
      "Precio Gasoleo A": Infinity,
      "Precio Gasoleo Premium": Infinity,
      "Precio Gasolina 95 E5": Infinity,
      "Precio Gasolina 98 E5": Infinity,
    };

    listadoPrecios.forEach((gasolinera) => {
      Object.keys(lowestPrices).forEach((key) => {
        const price = parseFloat(gasolinera[key].replace(",", "."));
        if (!isNaN(price) && price < lowestPrices[key]) {
          lowestPrices[key] = price;
        }
      });
    });

    return lowestPrices;
  };

  const lowestPrices = getLowestPrices(listadoPrecios);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1>Comparador de Precios de Combustible</h1>
            <p>Encuentra las mejores ofertas de combustible cerca de ti</p>
          </div>
        </header>
        <main>
          <ProvinciaSelector
            provincias={provincias}
            onSelect={(e) =>
              handleSelectProvincia(
                e,
                provincias,
                setProvinciaSeleccionada,
                setMunicipioSeleccionado,
                setListadoPrecios,
                setMunicipios
              )
            }
          />
          {provinciaSeleccionada && (
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
          )}
          {!provinciaSeleccionada && (
            <div className="info-message">
              <h1>Empieza seleccionando una ubicación para ver los precios</h1>
            </div>
          )}

          {provinciaSeleccionada && municipioSeleccionado && (
            <>
              <h1>Gasolineras en {municipioSeleccionado.Municipio}:</h1>
              {fechaActualizacion ? (
                <p>Datos actualizados a {fechaActualizacion}</p>
              ) : null}
              <div className="gasolineras">
                {loadingPrecios ? (
                  <p>Cargando datos...</p>
                ) : listadoPrecios.length > 0 ? (
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
                                  isLowestPrice("Precio Gasoleo A")
                                    ? "lowest-price"
                                    : ""
                                }`}
                              >
                                <strong>
                                  {gasolinera["Precio Gasoleo A"] || "-"}
                                </strong>
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
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>
                    No se encontraron gasolineras en{" "}
                    {municipioSeleccionado.Municipio}
                  </p>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>
          Desarrollado por{" "}
          <a href="https://github.com/alexisabel">alexisabel</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
