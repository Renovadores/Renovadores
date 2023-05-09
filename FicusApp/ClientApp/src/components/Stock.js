import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from "./Input";


function Stock() {

    const [name, setName] = useState("");
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const [descripcion, setDescripcion] = useState("");
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const [dimensiones, setDimensiones] = useState("");
    const handleChangeDimensiones = (event) => {
        setDimensiones(event.target.value)
    }

    const [peso_recipiente, setPeso_recipiente] = useState(0);
    const handleChangePeso_recipiente = (event) => {
        setPeso_recipiente(event.target.value)
    }

    const [peso_desechable, setPeso_desechable] = useState(0);
    const handleChangePeso_desechable = (event) => {
        setPeso_desechable(event.target.value)
    }

    const [alquiler_comercios, setAlquiler_Comercios] = useState(0);
    const handleChangeAlquiler_Comercios = (event) => {
        setAlquiler_Comercios(event.target.value)
    }

    const [alquiler_retail, setAlquiler_Retail] = useState(0);
    const handleChangeAlquiler_Retail = (event) => {
        setAlquiler_Retail(event.target.value)
    }

    const handleCancel = () => {
        setName("");
        setDescripcion("");
        setDimensiones("");
        setPeso_recipiente(0);
        setPeso_desechable(0);
        setAlquiler_Comercios(0);
        setAlquiler_Retail(0);
    }
    //Add Product to data base
    const handleSubmit = async (event) => {
        const response = await fetch("api/producto/AddProducto", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        if (response.ok) {
            handleCancel();
        }
    }
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`; 



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
            <div className="container">
              <h1 className="display-3 fw-bold">Nuestros productos</h1>
            </div>
            <div className="d-grid gap-2 mb-4">
                          <button className="btn btn-success" type="button" data-bs-toggle= "offcanvas"
                              data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                Agregar Producto
              </button>
            </div>
                  </div>
                  <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                      <div className="offcanvas-header">
                          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del nuevo producto</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                      </div>
                      <div className="offcanvas-body">
                          <form onSubmit={handleSubmit}>
                              <Input variable={name} handler={handleChangeName} text="Nombre" />
                              <div className="mb-3">
                                  <label htmlFor="formGroupExampleInput" className="form-label">Agregado el: {date}</label>
                              </div> 
                              <Input variable={descripcion} handler={handleChangeDescripcion} text="Descripcion" />
                              <Input variable={dimensiones} handler={handleChangeDimensiones} text="Dimensiones" />
                              <Input variable={peso_recipiente} handler={handleChangePeso_recipiente} text="Peso del Recipiente" />
                              <Input variable={peso_desechable} handler={handleChangePeso_desechable} text="Peso Desechable" />
                              <Input variable={alquiler_comercios} handler={handleChangeAlquiler_Comercios} text="Alquiler comercios" />
                              <Input variable={alquiler_retail} handler={handleChangeAlquiler_Retail} text="Alquiler Retail" />

                              <div className="row">
                                  <div className="col-6 d-flex justify-content-center">
                                      <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" >Agregar</button>
                                  </div>
                                  <div className="col-6 d-flex justify-content-center">
                                      <button className="btn btn-danger" type="button" onClick={handleCancel} data-bs-dismiss="offcanvas">Cancelar</button>
                                  </div>
                              </div>

                          </form>
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
function dateFormat() {
    const current = new Date();
    var month = `${current.getMonth() + 1}`;
    if (month < 10) {
        month = '0' + month;
    }
    var day = `${current.getDate()}`;
    if (day < 10) {
        day = '0' + day;
    }
    const date = `${current.getFullYear()}-${month}-${day}`;
    return date;
}


export default Stock;
