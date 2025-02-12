/* eslint-disable react/prop-types */
import Select from "react-select";
import "./MunicipioSelector.css";

const MunicipioSelector = ({ municipios, onSelect }) => {
  const options = municipios.map((municipio) => ({
    value: municipio.Municipio,
    label: municipio.Municipio,
    id: municipio.IDMunicipio,
  }));

  const handleChange = (selectedOption) => {
    const event = {
      target: {
        value: selectedOption ? selectedOption.value : "",
      },
    };
    onSelect(event);
  };

  return (
    <div className="municipio-card">
      <h2>Selecciona un municipio</h2>
      {municipios.length > 0 ? (
        <div className="select-group-municipio">
          <Select
            className="municipio-select-container"
            classNamePrefix="municipio-select"
            options={options}
            onChange={handleChange}
            placeholder="Selecciona un municipio"
            isClearable
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>
      ) : (
        <p>Cargando municipios...</p>
      )}
    </div>
  );
};

export default MunicipioSelector;
