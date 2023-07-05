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
            <Link to={`/productos/informacion/${product.productoId}`}>
              <li
                className="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"
                key={product.productoId}
              >
                <div className="col-6">
                  <div className="fw-bold">{product.productoId}</div>
                  <div>{product.nombre}</div> {product.descripcion}
                </div>
              </li>
            </Link>
          </div>
        ))}
      </ol>
    </div>
  );
}
export default MatchingProductListStock;
