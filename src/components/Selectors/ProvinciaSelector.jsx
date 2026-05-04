/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Select from "react-select";
import "./ProvinciaSelector.css";

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

const filterOption = (candidate, rawInput) => {
  if (!rawInput) return true;
  const needle = normalize(rawInput);
  if (!needle) return true;
  const haystack = normalize(candidate.label);
  const tokens = needle.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every((t) => haystack.includes(t));
};

const ProvinciaSelector = ({ provincias, onSelect }) => {
  const options = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const provincia of provincias) {
      const key = `${provincia.IDPovincia}-${provincia.Provincia}`;
      if (seen.has(key)) continue;
      seen.add(key);
      result.push({
        value: provincia.Provincia,
        label: provincia.Provincia,
        id: provincia.IDPovincia,
      });
    }
    result.sort((a, b) => collator.compare(a.label, b.label));
    return result;
  }, [provincias]);

  const handleChange = (selectedOption) => {
    onSelect({
      target: { value: selectedOption ? selectedOption.value : "" },
    });
  };

  const hasProvincias = provincias.length > 0;

  return (
    <div className="field">
      <label htmlFor="provincia-select" className="field__label">
        Provincia
      </label>
      {hasProvincias ? (
        <Select
          inputId="provincia-select"
          className="rselect provincia-select"
          classNamePrefix="rselect"
          options={options}
          onChange={handleChange}
          placeholder="Buscar provincia"
          isClearable
          isSearchable
          noOptionsMessage={() => "Sin resultados"}
          loadingMessage={() => "Cargando…"}
          getOptionValue={(option) => `${option.id}-${option.value}`}
          filterOption={filterOption}
          menuPortalTarget={document.body}
          styles={menuPortalStyles}
        />
      ) : (
        <div
          className="provincia-select__skeleton"
          aria-hidden="true"
          role="presentation"
        >
          <span className="visually-hidden">Cargando provincias…</span>
        </div>
      )}
    </div>
  );
};

export default ProvinciaSelector;
