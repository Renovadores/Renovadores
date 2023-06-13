import InputInt from "./InputInt";

function SelectProductList({ products, cuantity, handleCuantity }) {
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col">
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Escriba para buscar un producto..."
          />
        </div>
      </div>
      <ol className="list-group list-group-numbered">
        {products.map((product, index) => (
          <div className="ms-2 me-auto" key={index}>
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{product.nombre}</div>
                {product.ProductoId} {product.dimensiones}
              </div>
              <span className="badge bg-primary rounded-pill">
                {product.cantidad}
              </span>
            </li>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      {product.nombre} {product.ProductoId}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label>Total disponible: {product.cantidad}</label>
                    <InputInt
                      variable={cuantity}
                      handler={handleCuantity}
                      text="Indique la cantidad"
                    ></InputInt>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button type="button" className="btn btn-primary">
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
}
export default SelectProductList;
