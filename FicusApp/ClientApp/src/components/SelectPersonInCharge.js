function SelectPersonInCharge(props) {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label" >Responsable</label>
      <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
        {
          props.users.map((user, index) => (
            <option value={user.idUsuario} key={index}>{user.nombre}</option>
          ))
        }
      </select>
    </div >
  );
}

export default SelectPersonInCharge;


  