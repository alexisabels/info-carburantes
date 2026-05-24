"use client";

/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import "./MunicipioSelector.css";

const menuPortalStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const collator = new Intl.Collator("es", { sensitivity: "base" });

const normalize = (str) =>
  (str || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const filterOption = (option, rawInput) => {
  if (!rawInput) return true;
  const needle = normalize(rawInput);
  if (!needle) return true;
  const haystack = normalize(option.label);
  const tokens = needle.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every((t) => haystack.includes(t));
};

const MunicipioSelector = ({ municipios, onSelect }) => {
  const options = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const municipio of municipios) {
      const key = `${municipio.IDMunicipio}-${municipio.Municipio}`;
      if (seen.has(key)) continue;
      seen.add(key);
      result.push({
        value: municipio.Municipio,
        label: municipio.Municipio,
        id: municipio.IDMunicipio,
      });
    }
    result.sort((a, b) => collator.compare(a.label, b.label));
    return result;
  }, [municipios]);

  // Forzamos remount cuando cambia el conjunto de municipios (al cambiar
  // provincia) para que react-select limpie cualquier valor "huérfano".
  const selectKey = useMemo(() => {
    if (municipios.length === 0) return "empty";
    const first = municipios[0];
    return `${first.IDMunicipio ?? ""}-${first.Municipio ?? ""}-${
      municipios.length
    }`;
  }, [municipios]);

  const handleChange = (selectedOption) => {
    onSelect({
      target: { value: selectedOption ? selectedOption.value : "" },
    });
  };

  const hasMunicipios = municipios.length > 0;

  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    setTimedOut(false);
    const id = window.setTimeout(() => setTimedOut(true), 2000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="field">
      <label htmlFor="municipio-select" className="field__label">
        Municipio
      </label>
      {hasMunicipios ? (
        <Select
          key={selectKey}
          inputId="municipio-select"
          className="rselect municipio-select"
          classNamePrefix="rselect"
          options={options}
          onChange={handleChange}
          placeholder="Buscar municipio"
          isClearable
          isSearchable
          filterOption={filterOption}
          noOptionsMessage={() => "Sin resultados"}
          loadingMessage={() => "Cargando…"}
          getOptionValue={(option) => `${option.id}-${option.value}`}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          styles={menuPortalStyles}
        />
      ) : (
        <p className="field__loading">
          {timedOut
            ? "Esta provincia no tiene municipios disponibles"
            : "Cargando municipios…"}
        </p>
      )}
    </div>
  );
};

export default MunicipioSelector;
