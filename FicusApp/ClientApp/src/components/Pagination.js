function Pagination(props) {
  return (
    <div className="row m-2 mt-4">
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Anterior</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item" aria-current="page">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Pagination;