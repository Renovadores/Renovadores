function DisableProductModal(props) {
  return (
    <div className="modal fade" id={"exampleModal" + props.index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-light">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.nombre} {props.sku}</h1>
            <button type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <label>Producto agotado o descontinuado.</label>
            <label>Consulte el inventario para conocer mas detalles...</label>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DisableProductModal;