import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Stock() {
  // get clients from data base
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await fetch('api/producto/GetProducts');
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
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
  const handleClick = (productId, productName) => {
    navigate('/inventario/informacion', {
      state: { id: productId, name: productName },
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

  const handleCancel = () => {
    setName('');
    // TO-DO: clear info for the other fields
  };

  const handleSubmit = (event) => {
    handleCancel();
  };

  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Inventario</title>
      </head>
      <body>
        <main role="main">
          <div className="container-fluid">
            <div className="d-grid gap-2 mb-4">
              <button className="btn btn-success" type="button">
                Agregar Producto
              </button>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card p-3">
                  <figure className="p-3 mb-0">
                    <blockquote className="blockquote">
                      <p>
                        Ayudamos a los comercios de alimentos a sustituir sus
                        recipientes desechables por retornables.
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer mb-0 text-muted">
                      Ficus
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card">
                  <img
                    className="card-img-top"
                    src="images\productos\EC-07-1-JA Montezuma (1).png"
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

              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card">
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

          <div className="container fluid">
            <div className="container">
              <h2 className="display-3 fw-bold">Todos los productos</h2>
            </div>
            <div className="row">
              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card">
                  <img
                    src="images/marca/JPG/Logotipo (1).jpg"
                    alt="Ficus logo"
                  />
                </div>
              </div>

              {products.map((product) => (
                <div
                  className="col-sm-6 col-md-3 mb-3"
                  key={product.productoId}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.nombre}</h5>
                      <p className="card-text">Some info.</p>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleClick(product.productoId, product.nombre)
                        }
                      >
                        Ver producto
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </body>
    </div>
  );
}

function NewCard() {
  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src="images\productos\EC-07-1-JA Montezuma (1).png"
          alt="Producto Ficus"
        />
        <div className="card-body">
          <h5 className="card-title">Chiquita</h5>
          <p className="card-text">Bowl pequeño</p>
        </div>
        <div className="card-footer">
          <a href="index.html" className="btn btn-primary">
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
}

export default Stock;
