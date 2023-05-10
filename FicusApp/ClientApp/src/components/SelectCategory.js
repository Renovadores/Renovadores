function SelectCategory(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Categoría</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                <option value="1">Sopa</option>
                <option value="2">Sin División</option>
                <option value="3">Compartimientos</option>
                <option value="4">Vaso</option>
                <option value="5">Plato</option>
                <option value="6">Plato Sopa</option>
            </select>
        </div >
    );
}
export default SelectCategory;