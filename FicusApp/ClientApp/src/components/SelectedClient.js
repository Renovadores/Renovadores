function SelectedClient({ client, handler }) {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center border border-info mb-1">
        Cliente: {client.nombreEmpresa}
        <span className="btn badge bg-danger rounded-pill" style={{ color: "white" }} data-bs-toggle="modal" data-bs-target={"#exampleModal" + client.clienteId}>X</span>
      </li>
      <div className="modal fade" id={"exampleModal" + client.clienteId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-info text-light">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Seleccionar otro cliente?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary text-light" data-bs-dismiss="modal" onClick={ handler } >Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectedClient;