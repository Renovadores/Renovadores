function Stock() {
  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Inventario</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossOrigin="anonymous"
        />

        <link href="css/bootstrap-override.css" rel="stylesheet" />

        <link href="css/custom.css" rel="stylesheet" />
      </head>
      <body>
        <main role="main">
          <div className="container-fluid">
            <div className="container">
              <h1 className="display-3 fw-bold">Nuestros productos</h1>
            </div>
            <div className="d-grid gap-2 mb-4">
              <button className="btn btn-primary" type="button">
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

          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-4 mb-4">
                <div className="card">
                  <img
                    src="images/marca/JPG/Logotipo (1).jpg"
                    alt="Ficus logo"
                  />
                </div>
              </div>
              <NewCard />
              <NewCard />
              <NewCard />
              <NewCard />
            </div>
          </div>
        </main>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js"
          integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ"
          crossOrigin="anonymous"
        ></script>
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
