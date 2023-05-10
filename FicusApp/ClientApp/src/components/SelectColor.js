function SelectColor(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Color</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                <option value="1">JA</option>
                <option value="2">CL</option>
                <option value="3">BL</option>
                <option value="4">RJ</option>
                <option value="5">RO</option>
                <option value="6">MO</option>
            </select>
        </div >
    );
}
export default SelectColor;