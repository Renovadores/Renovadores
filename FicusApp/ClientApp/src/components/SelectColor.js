import { GetProductColors } from "./ProductInformation"
function SelectColor(props) {
    const colors = GetProductColors();
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Color</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {colors.map((color, index) => (
                    <option value={color.colorId} key={index}>
                        {color.descripcion}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectColor;