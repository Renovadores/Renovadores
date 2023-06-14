import CuantityProductModal from "./CuantityProductModal";
import DisableProductModal from "./DisableProductModal";

function MatchingProductList(props) {

  const handleCancell = () => {
    props.handleSelectedProduct("");
  }
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        {
          props.products.map((product, index) => (
            <div key={index} className="my-1">
              <li className={product.disponible === 0 ? "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-danger" : "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"} data-bs-toggle="modal" data-bs-target={"#exampleModal" + index} key={product.productoId} >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.nombre}</div>
                  {product.productoId}  {product.dimensiones}
                </div>
                <span className="badge bg-primary rounded-pill">{product.disponible}</span>
              </li>
              {
                product.disponible === 0 ?
                  <DisableProductModal index={index} nombre={product.nombre} sku={product.productoId} cantidad={product.disponible} handleCuantity={props.handleCuantity} handleSelectedProduct={props.handleSelectedProduct} handleCancell={handleCancell} />
                :
                  <CuantityProductModal index={index} nombre={product.nombre} sku={product.productoId} cantidad={product.disponible} cuantity={props.cuantity} handleCuantity={props.handleCuantity} handleSelectedProduct={props.handleSelectedProduct} handleCancell={handleCancell} />
              }
              

            </div>
          ))
        }
      </ol>
    </div >
  );
}
export default MatchingProductList;