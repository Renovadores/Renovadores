function Input(props) {
  return (
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        id="floatingInput"
        placeholder="Nombre"
        value={props.variable}
        onChange={props.handler}
        autoComplete="off"
      />
      <label htmlFor="floatingInput">{props.text}</label>
    </div>
  );
}
export default Input;
