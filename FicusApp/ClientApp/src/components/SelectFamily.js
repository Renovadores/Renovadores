function SelectFamily(props) {
    return (
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >Familia</label>
            <select className="form-select" aria-label="Default select example" value={props.variable} onChange={props.handler}>
                {props.list.map((family, index) => (
                    <option value={family.familiaId} key={index}>
                        {family.nombreFamilia}
                    </option>
                ))}
            </select>
        </div >
    );
}
export default SelectFamily;