/* eslint-disable react/prop-types */
const ProductoSelector = ({ productos, onSelect, selectedProducto }) => (
  <div className="producto-card">
    <h2>Selecciona un producto</h2>
    <div
      className="producto-group"
      role="radiogroup"
      aria-label="Producto"
    >
      {productos.length > 0 ? (
        productos.map((producto) => {
          const isActive = selectedProducto === producto.NombreProducto;
          return (
            <button
              type="button"
              key={producto.IDProducto}
              value={producto.NombreProducto}
              role="radio"
              aria-checked={isActive}
              onClick={onSelect}
              className={`producto-button${isActive ? " active" : ""}`}
            >
              {producto.NombreProducto}
            </button>
          );
        })
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  </div>
);

export default ProductoSelector;
