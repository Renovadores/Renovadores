import { useState } from "react";

function CuantityProductModal(props) {
  return (
    <div className="modal fade" id={"exampleModal" + props.index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.nombre} {props.sku}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
          </div>
          <div className="modal-body">
            <label>Total disponible: {props.cantidad}</label>

            <div className="form-floating mt-3 mb-3">
              <input type="number" className="form-control" id="floatingInput2" placeholder="name@example.com" onChange={props.handleCuantity} value={props.cuantity} autoComplete="off" />
              <label htmlFor="floatingInput">Indique la cantidad</label>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.handleCancell}>Cancelar</button>
            {
              props.cuantity > 0 && props.cuantity <= props.cantidad  ?
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => props.handleSelectedProduct(props.sku)}>Aceptar</button>
                :
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => props.handleSelectedProduct(props.sku)} disabled >Aceptar</button>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default CuantityProductModal;