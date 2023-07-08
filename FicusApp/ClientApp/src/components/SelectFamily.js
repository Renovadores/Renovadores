import { GetProductFamily } from "./ProductInformation"
function SelectFamily(props) {
    const families = GetProductFamily();
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Familia</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {families.map((family, index) => (
                    <option value={family.familiaId} key={index}>
                        {family.nombreFamilia}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectFamily;