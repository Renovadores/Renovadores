function ButtonDeleteClient(props) {
  return (
    <div className="row mb-5 d-flex justify-content-center">
      <div className="col-8 p-0 d-flex justify-content-center">
        {
          <button className="btn btn-danger text-light" type="button" data-bs-toggle="modal" data-bs-target="#deleteClientModal" >
            Eliminar Cliente
          </button>
        }
      </div>
      <div className="modal fade" id="deleteClientModal" tabIndex="-1" aria-labelledby="deleteClientModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-light">
              <h1 className="modal-title fs-5" id="deleteClientModal"> Eliminar al cliente: {props.clientName}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Esta accion no se puede revertir
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={props.handler} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ButtonDeleteClient;