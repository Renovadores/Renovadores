import { Link } from "react-router-dom";
function MatchingProductListInventory(props) {
  const handleCancell = () => {
    props.handleSelectedProduct("");
  };
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        {props.products.map((product, index) => (
          <div key={index} className="my-1">
          <Link to={`/productos/informacion/${product.productoId}`}>  
          <li
              className={
                product.disponible === 0
                  ? "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-danger"
                  : "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"
              }
              key={product.productoId}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{product.nombre}</div>
                {product.productoId} {product.descripcion}
              </div>
              <div className="col col-lg-4">
                <span className="badge bg-primary rounded-pill">
                  Total Existente: {product.totalExistente}
                </span>

                <span className="badge bg-primary rounded-pill">
                  En uso: {product.enUso}
                </span>
              </div>
            </li>
            </Link>
          </div>
        ))}
      </ol>
    </div>
  );
}
export default MatchingProductListInventory;
