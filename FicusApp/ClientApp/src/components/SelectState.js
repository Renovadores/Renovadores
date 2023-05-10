function SelectState(props) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">Estado</label>
      <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
        <option value="Clientes">Clientes</option>
      </select>
    </div>
  );
}

export default SelectState;