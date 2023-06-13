function InputDelete(props) {
    return (
        <div className="form-bool mb-3">
            <input type="bool" className="form-control" id="boolInput" placeholder="name@example.com" value={props.variable} onChange={props.handler} />
            <label htmlFor="boolInput">{props.bool}</label>
        </div>
    );
}
export default InputDelete;