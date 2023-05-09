import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Stock() {
  // get clients from data base
  const [productsChecked, setProductsChecked] = useState(false); 
  const [products, setProducts] = useState([]);
    const getProducts = async () => {
        setProductsChecked(false);
    const response = await fetch('api/producto/GetProducts');
    if (response.ok) {
      const data = await response.json();
        setProducts(data);
        setProductsChecked(true);
    } else {
      console.log('error');
    }
  };
  // this method allows to auto call getProducts when page is started
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // When user click on client button, 'navigate hook' redirect him to new page
  const navigate = useNavigate(); // Allows referencing a specific path defined in AppRoutes
  const handleClickViewProduct = (productIndex) => {
      navigate('/productos/informacion', {
          state: products[productIndex].productoID
    });
    //second argument allows to pass parameters
  };

  const [name, setName] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Inventario</title>
      </head>
      <body>
        <header className="bg-success py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-8 fw-bolder">
                Ayudamos a los comercios de alimentos a sustituir sus
                recipientes desechables por retornables.
              </h1>
              <p className="lead fw-normal text-white-50 mb-0">- Ficus.</p>
            </div>
          </div>
        </header>
        <section className="py-4">
          <div className="container-fluid">
            <div className="d-grid gap-2 mb-4">
              <div className="col-sm-6 col-md-3 d-flex my-2 my-md-0">
                {/* Filter/Search text*/}
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Buscar producto..."
                />
                {/* Filter/Search button*/}
                <div className="col-sm-6 col-md-3 d-flex my-2 my-md-0 ms-2">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filtrado
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Prioridad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Recientes
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button className="btn btn-success" type="button">
                Agregar Producto
              </button>
              <button className="btn btn-warning" type="button">
                Eliminar Producto
              </button>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container-fluid">
            <div className="row">
              {/* Vajilla reusable card*/}
              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card text-center">
                  <img
                    className="card-img-top"
                    src="images\productos\M-275-BL  (2).png"
                    alt="Producto Ficus"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Vajilla Reusable</h5>
                    <p className="card-text">
                      Variedad de vajillas 100% retornables y reciclables para
                      mejorar la experiencia de tus clientes
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href="index.html" className="btn btn-primary">
                      Ver Todos
                    </a>
                  </div>
                </div>
              </div>
              {/* Recipientes para llevar card*/}
              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card text-center">
                  <img
                    className="card-img-top"
                    src="images\productos\EC-07-1-JA Montezuma (1).png"
                    alt="Producto Ficus"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Recipientes para llevar</h5>
                    <p className="card-text">
                      Recipientes para llevar, reciclables, retornables, aptos
                      para microondas y mucho más
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href="index.html" className="btn btn-primary">
                      Ver Todos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container fluid">
            <div className="container">
              <h2 className="display-3 fw-bold">Todos los productos</h2>
            </div>
            <div className="row">
             
              {/*Database card list */}
              {products.map((product, productIndex) => (
                <div
                  className="col-sm-6 col-md-3 mb-3"
                  key={product.productoId}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.nombre}</h5>
                      <p className="card-text">{product.descripcion}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleClickViewProduct(productIndex)
                        }
                      > Ver producto
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row m-2 mt-4">
              <nav aria-label="...">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link">Anterior</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Siguiente
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Stock;
