import { useEffect, useState } from "react";
import {
  fetchProvincias,
  fetchProductos,
  fetchMunicipios,
  fetchPrecios,
} from "./api";
import ProvinciaSelector from "./components/ProvinciaSelector";
import ProductoSelector from "./components/ProductoSelector";
import MunicipioSelector from "./components/MunicipioSelector";
import GasolineraCard from "./components/GasolineraCard";
import "./App.css";

import "./components/GasolineraCard.css";
import "./components/ProductoSelector.css";
import "./components/MunicipioSelector.css";
import "./components/ProvinciaSelector.css";

function App() {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const [listadoPrecios, setListadoPrecios] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);
  const [loadingPrecios, setLoadingPrecios] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [provinciasData, productosData] = await Promise.all([
          fetchProvincias(),
          fetchProductos(),
        ]);
        setProvincias(provinciasData);
        setListaProductos(productosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    loadData();
  }, []);

  const handleSelectProvincia = async (e) => {
    const provinciaNombre = e.target.value;
    const provincia = provincias.find((p) => p.Provincia === provinciaNombre);

    if (provincia) {
      setProvinciaSeleccionada(provincia);
      setMunicipioSeleccionado(null);
      setListadoPrecios([]);
      try {
        const municipiosData = await fetchMunicipios(provincia.IDPovincia);
        setMunicipios(municipiosData);
      } catch (error) {
        console.error("Error al cargar los municipios:", error);
      }
    }
  };

  const handleSelectMunicipio = (e) => {
    const municipioNombre = e.target.value;
    const municipio = municipios.find((m) => m.Municipio === municipioNombre);

    if (municipio) {
      setMunicipioSeleccionado(municipio);
    }
  };

  const handleSelectProducto = (e) => {
    const productoNombre = e.target.value;
    const producto = listaProductos.find(
      (p) => p.NombreProducto === productoNombre
    );

    if (producto) {
      setProductoSeleccionado(producto);
      if (provinciaSeleccionada && municipioSeleccionado) {
        handleFetchPrecios(producto.IDProducto);
      }
    }
  };

  const handleFetchPrecios = async (idProducto) => {
    setLoadingPrecios(true);
    try {
      const idMunicipio = municipioSeleccionado.IDMunicipio;
      const data = await fetchPrecios(idMunicipio, idProducto);
      setListadoPrecios(data.ListaEESSPrecio || []);
    } catch (error) {
      console.error("Error al cargar los precios:", error);
    } finally {
      setLoadingPrecios(false);
    }
  };

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
            onSelect={handleSelectProvincia}
          />
          {provinciaSeleccionada && (
            <MunicipioSelector
              municipios={municipios}
              onSelect={handleSelectMunicipio}
            />
          )}
          {provinciaSeleccionada && municipioSeleccionado && (
            <ProductoSelector
              productos={listaProductos}
              onSelect={handleSelectProducto}
            />
          )}
          {!provinciaSeleccionada && !productoSeleccionado && (
            <div className="info-message">
              <h1>
                Empieza seleccionando una provincia y un producto para ver los
                precios
              </h1>
            </div>
          )}
          {provinciaSeleccionada && !productoSeleccionado && (
            <div className="info-message">
              <h1>
                Selecciona un producto para ver los precios en{" "}
                {provinciaSeleccionada.Provincia}
              </h1>
            </div>
          )}
          {provinciaSeleccionada && productoSeleccionado && (
            <>
              <h1>
                Gasolineras precios para {provinciaSeleccionada.Provincia}
              </h1>
              <div className="gasolineras">
                {loadingPrecios ? (
                  <p>Cargando precios...</p>
                ) : listadoPrecios.length > 0 ? (
                  listadoPrecios.map((gasolinera) => (
                    <GasolineraCard
                      key={gasolinera.IDGasolinera}
                      gasolinera={gasolinera}
                      productoNombre={productoSeleccionado.NombreProducto}
                    />
                  ))
                ) : (
                  <p>No se encontraron gasolineras.</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>
          Desarrollado por <a href="https://alexisabel.com">alexisabels</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
