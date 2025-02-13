/* eslint-disable react/prop-types */
import Select from "react-select";
import "./ProvinciaSelector.css";

const ProvinciaSelector = ({ provincias, onSelect }) => {
  const options = provincias.map((provincia) => ({
    value: provincia.Provincia,
    label: provincia.Provincia,
    id: provincia.IDPovincia,
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
    <div className="provincia-card">
      <h2>Selecciona una provincia</h2>
      {provincias.length > 0 ? (
        <div className="select-group-municipio">
          <Select
            className="municipio-select-container"
            classNamePrefix="municipio-select"
            options={options}
            onChange={handleChange}
            placeholder="Selecciona una provincia"
            isClearable
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>
      ) : (
        <p>Cargando provincias...</p>
      )}
    </div>
  );
};

export default ProvinciaSelector;
