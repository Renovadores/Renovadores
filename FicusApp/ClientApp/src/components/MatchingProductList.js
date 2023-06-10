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
              <li className={product.cantidad === 0 ? "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-danger" : "btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary"} data-bs-toggle="modal" data-bs-target={"#exampleModal" + index} key={product.productoId} >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.producto.nombre}</div>
                  {product.productoId}  {product.producto.dimensiones}
                </div>
                <span className="badge bg-primary rounded-pill">{product.cantidad}</span>
              </li>
              {
                product.cantidad === 0 ?
                  <DisableProductModal index={index} nombre={product.producto.nombre} sku={product.productoId} cantidad={product.cantidad} handleCuantity={props.handleCuantity} handleSelectedProduct={props.handleSelectedProduct} handleCancell={handleCancell} />
                :
                  <CuantityProductModal index={index} nombre={product.producto.nombre} sku={product.productoId} cantidad={product.cantidad} cuantity={props.cuantity} handleCuantity={props.handleCuantity} handleSelectedProduct={props.handleSelectedProduct} handleCancell={handleCancell} />
              }
              

            </div>
          ))
        }
      </ol>
    </div >
  );
}
export default MatchingProductList;