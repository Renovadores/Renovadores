import InputInt from "./InputInt";

function SelectedProductList(props) {

  return (
    <div className="container">
      <ol className="list-group list-group-numbered">
        {
          props.products.map((product, index) => (
            <>
              <li className="list-group-item d-flex justify-content-between align-items-center"  key={product.sku}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.nombre} <span className="badge bg-primary rounded-pill">{product.cantidad}</span> </div>
                  {product.sku}  {product.dimensiones}
                </div>
                <span className="btn badge bg-danger rounded-pill" style={{ color: "white" }} data-bs-toggle="modal" data-bs-target={"#exampleModal" + index + product.sku}>X</span>
              </li>
              <div className="modal fade" id={"exampleModal" + index + product.sku} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">{product.nombre} {product.sku}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={() => props.handler(product.sku)} >Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        }
      </ol>
    </div >
  );
}
export default SelectedProductList;