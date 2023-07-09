import { useGetProductColors } from "./ProductInformation"
function SelectColor(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Color</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {props.list.map((color, index) => (
                    <option value={color.colorId} key={index}>
                        {color.descripcion}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectColor;