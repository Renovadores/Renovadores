
function CheckBox(props) {
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" checked={props.variable}
        onChange={props.handler} id={"flexCheckDefault" + props.text} />
      <label className="form-check-label" htmlFor={"flexCheckDefault" + props.text} >{props.text}</label>
    </div>
  );
}

export default CheckBox;