import { useEffect, useState } from "react";
import { fetchProvincias } from "../utils/api";
import ProvinciaSelector from "./Selectors/ProvinciaSelector";
import MunicipioSelector from "./Selectors/MunicipioSelector";
import {
  handleSelectProvincia,
  handleSelectMunicipio,
} from "../utils/handlers";
import GasolineraTable from "./GasolineraTable";
import "../App.css";

const MainContent = () => {
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

  return (
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
          <h1>Empieza seleccionando una ubicación para ver los precios</h1>
        </div>
      )}

      {provinciaSeleccionada && municipioSeleccionado && (
        <>
          <h1>Gasolineras en {municipioSeleccionado.Municipio}:</h1>
          <GasolineraTable
            listadoPrecios={listadoPrecios}
            municipioSeleccionado={municipioSeleccionado}
            loadingPrecios={loadingPrecios}
            fechaActualizacion={fechaActualizacion}
          />
        </>
      )}
    </main>
  );
};

export default MainContent;
