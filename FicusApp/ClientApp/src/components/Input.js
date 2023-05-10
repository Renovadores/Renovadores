function Input(props) {
    return (
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={props.variable} onChange={props.handler} />
            <label htmlFor="floatingInput">{props.text}</label>
        </div>
    );
}
export default Input;