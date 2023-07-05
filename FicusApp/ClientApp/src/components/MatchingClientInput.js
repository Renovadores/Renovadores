function MatchingClientInput(props) {
  return (
    <div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingClientInput" placeholder="name@example.com" value={props.clientInput} onChange={props.handler} autoComplete="off" autoFocus />
        <label htmlFor="floatingInput">Escriba para buscar el cliente...</label>
      </div>
    </div>
  );
}

export default MatchingClientInput;