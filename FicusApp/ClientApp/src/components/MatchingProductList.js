import CuantityProductModal from "./CuantityProductModal";

function MatchingProductList(props) {
  const handleCancell = () => {
    props.handleCuantity("");
    props.handleSelectedProduct("");
  }
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        {
          props.products.map((product, index) => (
            <div key={index}>
              <li className="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target={"#exampleModal" + index} key={product.sku}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.nombre}</div>
                  {product.sku}  {product.dimensiones}
                </div>
                <span className="badge bg-primary rounded-pill">{product.cantidad}</span>
              </li>
              <CuantityProductModal index={index} nombre={product.nombre} sku={product.sku} cantidad={product.cantidad} handleCuantity={props.handleCuantity} handleSelectedProduct={props.handleSelectedProduct} handleCancell={handleCancell} />
            </div>
          ))
        }
      </ol>
    </div >
  );
}
export default MatchingProductList;