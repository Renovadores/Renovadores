function SelectPriority(props) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">Prioridad</label>
      <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
    </div>
  );
}

export default SelectPriority;
