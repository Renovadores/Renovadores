function InputInt(props) {
  return (
    <div className="form-floating mb-3">
      <input
        type="number"
        min="0"
        className="form-control"
        id="floatingInput2"
        placeholder="100"
        onChange={props.handler}
        autoComplete="off"
      />
      <label htmlFor="floatingInput">{props.text}</label>
    </div>
  );
}
export default InputInt;
