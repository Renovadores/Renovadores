import {GetProductCategories } from "./ProductInformation"
function SelectCategory(props) {
    const categories = GetProductCategories();
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Categoría</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {categories.map((category, index) => (
                    <option value={category.categoriaId} key={index}>
                        {category.nombreCategoria}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectCategory;