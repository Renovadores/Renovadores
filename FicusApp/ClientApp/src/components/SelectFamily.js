function SelectFamily(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Familia</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                <option value="1">Costas</option>
                <option value="2">Páramos</option>
                <option value="3">Bosques</option>
            </select>
        </div >
    );
}
export default SelectFamily;