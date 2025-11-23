import "./FuelTypeSelector.css";

const FuelTypeSelector = ({ selectedFuel, onSelectFuel }) => {
  const fuelTypes = [
    { id: "Precio Gasoleo A", label: "Diésel" },
    { id: "Precio Gasoleo Premium", label: "Diésel +", short: "D+" },
    { id: "Precio Gasolina 95 E5", label: "Gasolina 95", short: "G95" },
    { id: "Precio Gasolina 98 E5", label: "Gasolina 98", short: "G98" },
  ];

  return (
    <div className="fuel-selector-container">
      <div className="fuel-selector-options">
        {fuelTypes.map((fuel) => (
          <button
            key={fuel.id}
            className={`fuel-option ${selectedFuel === fuel.id ? "active" : ""}`}
            onClick={() => onSelectFuel(fuel.id)}
          >
            <span className="fuel-label-full">{fuel.label}</span>
            <span className="fuel-label-short">{fuel.short || fuel.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FuelTypeSelector;
