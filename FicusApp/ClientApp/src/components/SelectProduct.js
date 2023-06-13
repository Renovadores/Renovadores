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
          <option value={product.sku} key={index}>
            {product.sku}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectProduct;
