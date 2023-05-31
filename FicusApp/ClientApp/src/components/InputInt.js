function InputInt(props) {
    return (
        <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput2" placeholder="name@example.com" onChange={props.handler} autoComplete="off" />
            <label htmlFor="floatingInput">{props.text}</label>
        </div>
    );
}
export default InputInt;