/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./FuelTypeSelector.css";

const FUEL_TYPES = [
  { id: "Precio Gasoleo A", label: "Diésel", short: "D", icon: "D" },
  { id: "Precio Gasoleo Premium", label: "Diésel +", short: "D+", icon: "D+" },
  { id: "Precio Gasolina 95 E5", label: "Gasolina 95", short: "G95", icon: "95" },
  { id: "Precio Gasolina 98 E5", label: "Gasolina 98", short: "G98", icon: "98" },
];

const STORAGE_KEY = "fuel.preferred";
const VALID_IDS = new Set(FUEL_TYPES.map((f) => f.id));

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value && VALID_IDS.has(value) ? value : null;
  } catch {
    return null;
  }
};

const writeStored = (value) => {
  try {
    if (value && VALID_IDS.has(value)) {
      localStorage.setItem(STORAGE_KEY, value);
    }
  } catch {
    /* almacenamiento no disponible */
  }
};

const FuelTypeSelector = ({ selectedFuel, onSelectFuel }) => {
  const restoredRef = useRef(false);

  // Restaurar preferencia almacenada una sola vez al montar.
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    const stored = readStored();
    if (stored && stored !== selectedFuel && typeof onSelectFuel === "function") {
      onSelectFuel(stored);
    }
  }, [selectedFuel, onSelectFuel]);

  // Persistir cambios de selección posteriores.
  useEffect(() => {
    if (!restoredRef.current) return;
    if (selectedFuel && VALID_IDS.has(selectedFuel)) {
      writeStored(selectedFuel);
    }
  }, [selectedFuel]);

  return (
    <div
      className="segmented fuel-selector"
      role="radiogroup"
      aria-label="Tipo de combustible"
    >
      {FUEL_TYPES.map((fuel) => {
        const isActive = selectedFuel === fuel.id;
        return (
          <button
            key={fuel.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-pressed={isActive}
            title={fuel.label}
            onClick={() => onSelectFuel(fuel.id)}
            className="fuel-selector__btn"
          >
            <span className="fuel-selector__icon" aria-hidden="true">
              {fuel.icon}
            </span>
            <span className="fuel-selector__label">{fuel.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FuelTypeSelector;
