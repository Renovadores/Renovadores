import { Link } from "react-router-dom";

function MatchingProductListStock(props) {
  const handleCancel = () => {
    props.handleSelectedProduct("");
  };
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        <div className="row">
        {props.products.map((product, index) => (
          <div key={index} className="my-1 col-sm-12 col-md-6 col-lg-4">
            <Link to={`/productos/informacion/${product.productoId}`}>
              <li
                className="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"
                key={product.productoId}
              >
                <div className="container">
                  <div className="row">
                    <div className="col fw-bold">
                      {product.productoId}
                    </div>
                    <div className="col fw-bold">
                      {product.nombre}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {product.descripcion}
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          </div>
        ))}
        </div>
      </ol>
    </div>
  );
}
export default MatchingProductListStock;
