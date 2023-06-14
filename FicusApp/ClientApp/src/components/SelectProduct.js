function SelectProduct({ products, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">
        Producto
      </label>
      <select
        className="form-select"
        aria-label="Default select example"
        value={value}
        onChange={onChange}
      >
        {products.map((product, index) => (
          <option value={product.productoId} key={index}>
            {product.productoId}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectProduct;
