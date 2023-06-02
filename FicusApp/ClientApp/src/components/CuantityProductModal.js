import InputInt from "./InputInt";

function CuantityProductModal(props) {
  return (
    <div className="modal fade" id={"exampleModal" + props.index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.nombre} {props.sku}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
          </div>
          <div className="modal-body">
            <label>Total disponible: {props.cantidad}</label>
            <InputInt handler={props.handleCuantity} text="Indique la cantidad"></InputInt>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancell}>Cancelar</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => props.handleSelectedProduct(props.sku)}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CuantityProductModal;