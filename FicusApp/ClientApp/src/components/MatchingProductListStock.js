import { Link } from "react-router-dom";

function MatchingProductListStock(props) {
  const handleCancel = () => {
    props.handleSelectedProduct("");
  };
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        {props.products.map((product, index) => (
          <div key={index} className="my-1">
            <li
              className="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"
              key={product.productoId}
            >
              <div className="col-6">
                <div className="fw-bold">{product.nombre}</div>
                {product.productoId} {product.descripcion}
              </div>
              <div>
                <span className="badge bg-primary rounded-pill">
                  <Link to={`/productos/informacion/${product.productoId}`}>
                    <button
                      className="btn btn-primary"
                      // onClick={() => props.handler(productIndex)}
                    >
                      {" "}
                      Detalles
                    </button>
                  </Link>
                </span>
              </div>
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
}
export default MatchingProductListStock;
