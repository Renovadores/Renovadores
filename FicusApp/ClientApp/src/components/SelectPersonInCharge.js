function SelectPersonInCharge(props) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label" >Responsable</label>
      <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
        <option value="1">Alejandro</option>
        <option value="2">Andrea</option>
        <option value="3">Fabiola</option>
      </select>
    </div >
  );
}

export default SelectPersonInCharge;

  