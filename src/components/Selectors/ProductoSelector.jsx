const ProductoSelector = ({ productos, onSelect }) => (
  <div className="producto-card">
    <h2>Selecciona un producto</h2>
    <div className="producto-group">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <button
            onClick={onSelect}
            key={producto.IDProducto}
            value={producto.NombreProducto}
            className="producto-button"
          >
            {producto.NombreProducto}
          </button>
        ))
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  </div>
);

export default ProductoSelector;
