import "./MunicipioSelector.css";

const MunicipioSelector = ({ municipios, onSelect }) => (
  <div className="municipio-card">
    <h2>Selecciona un municipio</h2>
    <div className="select-group-municipio">
      {municipios.length > 0 ? (
        <select onChange={onSelect} defaultValue="">
          <option value="" disabled>
            Selecciona un municipio
          </option>
          {municipios.map((municipio) => (
            <option key={municipio.IDMunicipio} value={municipio.Municipio}>
              {municipio.Municipio}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando municipios...</p>
      )}
    </div>
  </div>
);

export default MunicipioSelector;
