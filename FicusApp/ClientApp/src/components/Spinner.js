
function Spinner() {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <strong>Cargando...</strong>
        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
    );
}

export default Spinner;