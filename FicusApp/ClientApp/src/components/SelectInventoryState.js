function SelectInventoryState({ inventories, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">
        Estado
      </label>
      <select
        aria-label="Default select example"
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {inventories.map((state, index) => (
          <option value={state.idEstado} key={index}>
            {state.descripcionEstadoproducto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInventoryState;
