function InputInt(props) {
    return (
        <div className="form-floating mb-3">
        <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" value={props.variable} onChange={props.handler} autoComplete="off" />
            <label htmlFor="floatingInput">{props.text}</label>
        </div>
    );
}
export default InputInt;