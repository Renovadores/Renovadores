function DeleteProductModal(props) {
  return (
    <div className="modal fade" id={"exampleModal" + props.index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.nombre} {props.sku}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={() => props.handler(props.sku)} >Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteProductModal;