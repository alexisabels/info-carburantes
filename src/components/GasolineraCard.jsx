const GasolineraCard = ({ gasolinera, productoNombre }) => (
  <div className="gasolinera-card">
    <div className="gasolinera-header">
      <h3>{gasolinera.Rótulo}</h3>
    </div>
    <div className="gasolinera-body">
      <p>
        <strong>Precio {productoNombre}:</strong> {gasolinera.PrecioProducto} €
      </p>
      <p>
        <strong>Dirección:</strong> {gasolinera.Dirección},{" "}
        {gasolinera.Localidad}
      </p>
      <p>
        <strong>Horario:</strong> {gasolinera.Horario}
      </p>
    </div>
  </div>
);

export default GasolineraCard;
