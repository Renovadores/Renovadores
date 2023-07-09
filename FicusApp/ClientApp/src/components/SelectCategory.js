function SelectCategory(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Categoría</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {props.list.map((category, index) => (
                    <option value={category.categoriaId} key={index}>
                        {category.nombreCategoria}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectCategory;