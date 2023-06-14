function SearchCriteriaSwitch (props){
  return (
    <div className="row mb-2">
      <div className="col d-flex justify-content-end">
        <label className="form-check-label">Buscar por nombre</label>
      </div>
      <div className="col-1 d-flex justify-content-center">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" onChange={props.handle} />
        </div>
      </div>
      <div className="col d-flex justify-content-start">
        <label className="form-check-label">Buscar por codigo</label>
      </div>
    </div>
  );
}

export default SearchCriteriaSwitch;