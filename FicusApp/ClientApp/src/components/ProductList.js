import { Link } from "react-router-dom";

function ProductList(props) {
  return (
    <div className="row">
      {/*Database card list */}
      {props.products.length !== 0 ? (
        props.products.map((product, productIndex) => (
          <div className="col-sm-6 col-md-3 mb-3" key={product.productoId}>
            <div className="card">
              <img
                src="/images/Van Ficus.jpg"
                classname="card-img-top"
                alt="imagen"
              />
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">{product.productoId}</p>
                <Link to={`/productos/informacion/${product.productoId}`}>
                  <button
                    className="btn btn-primary"
                    // onClick={() => props.handler(productIndex)}
                  >
                    {" "}
                    Ver producto
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h5 className="d-flex justify-content-center">
          No se encontraron productos en la base de datos
        </h5>
      )}
    </div>
  );
}
export default ProductList;
