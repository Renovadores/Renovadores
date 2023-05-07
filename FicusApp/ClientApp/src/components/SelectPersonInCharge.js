function SelectPersonInCharge(props) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label" >Responsable</label>
      <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
        <option value="Alejandro">Alejandro</option>
        <option value="Andrea">Andrea</option>
        <option value="Fabiola">Fabiola</option>
      </select>
    </div >
  );
}

export default SelectPersonInCharge;

  