import React from "react";
import "./ProvinciaSelector.css";

const ProvinciaSelector = ({ provincias, onSelect }) => (
  <div className="provincia-card">
    <h2>Selecciona una provincia</h2>
    <div className="select-group">
      {provincias.length > 0 ? (
        <select onChange={onSelect} defaultValue="">
          <option value="" disabled>
            Selecciona una provincia
          </option>
          {provincias.map((provincia) => (
            <option key={provincia.IDPovincia} value={provincia.Provincia}>
              {provincia.Provincia}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando provincias...</p>
      )}
    </div>
  </div>
);

export default ProvinciaSelector;
