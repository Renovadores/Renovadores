function FilterClients() {
  return (
    <div className="col-3 d-flex my-2 my-md-0">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filtrado
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Prioridad</a></li>
          <li><a className="dropdown-item" href="#">Recientes</a></li>
        </ul>
      </div>
    </div>
  );
}
export default FilterClients;