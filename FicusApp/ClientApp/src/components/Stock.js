import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from "./Input";
import InputInt from "./InputInt";
import CheckBox from "./CheckBox";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";

function Stock() {
  // get products from data base
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

    var options = {}

    const [sopa, setSopa] = useState(false);
    const handleCheckboxSopa = (event) => {
        setSopa(event.target.checked)
    }
    const [sin_division, setSin_division] = useState(false);
    const handleCheckboxSin_division = (event) => {
        setSin_division(event.target.checked)
    } 
    const [medio, setMedio] = useState(false);
    const handleCheckboxMedio = (event) => {
        setMedio(event.target.checked)
    }
    const [compartimientos, setCompartimientos] = useState(false);
    const handleCheckboxCompartimientos = (event) => {
        setCompartimientos(event.target.checked)
    }
    const [vaso, setVaso] = useState(false);
    const handleCheckboxVaso = (event) => {
        setVaso(event.target.checked)
    }
    const [plato, setPlato] = useState(false);
    const handleCheckboxPlato = (event) => {
        setPlato(event.target.checked)
    }
    const [plato_sopa, setPlato_sopa] = useState(false);
    const handleCheckboxPlato_sopa = (event) => {
        setPlato_sopa(event.target.checked)
    }
    const [costas, setCostas] = useState(false);
    const handleCheckboxCostas = (event) => {
        setCostas(event.target.checked)
    }
    const [paramos, setParamos] = useState(false);
    const handleCheckboxParamos = (event) => {
        setParamos(event.target.checked)
    }
    const [bosques, setBosques] = useState(false);
    const handleCheckboxBosques = (event) => {
        setBosques(event.target.checked)
    }
    const [ja, setJa] = useState(false);
    const handleCheckboxJa = (event) => {
        setJa(event.target.checked)
    }
    const [cl, setCl] = useState(false);
    const handleCheckboxCl = (event) => {
        setCl(event.target.checked)
    }
    const [bl, setBl] = useState(false);
    const handleCheckboxBl = (event) => {
        setBl(event.target.checked)
    }
    const [rj, setRj] = useState(false);
    const handleCheckboxRj = (event) => {
        setRj(event.target.checked)
    }
    const [ro, setRo] = useState(false);
    const handleCheckboxRo = (event) => {
        setRo(event.target.checked)
    }
    const [mo, setMo] = useState(false);
    const handleCheckboxMo = (event) => {
        setMo(event.target.checked)
    }
    const [family, setFamily] = useState(1);
    const handleChangeFamily = (event) => {
        setFamily(event.target.value)
    }
    const [color, setColor] = useState(1);
    const handleChangeColor = (event) => {
        setColor(event.target.value)
    }
    const [category, setCategory] = useState(1);
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }



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
                          <div className="d-grid gap-2 mb-4">
                              <button className="btn btn-success" type="button" data-bs-toggle="offcanvas"
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
                                  <Input variable={descripcion} handler={handleChangeDescripcion} text="Descripción" />
                                  <Input variable={dimensiones} handler={handleChangeDimensiones} text="Dimensiones" />
                                  <InputInt variable={peso_recipiente} handler={handleChangePeso_recipiente} text="Peso de Recipiente" />
                                  <InputInt variable={peso_desechable} handler={handleChangePeso_desechable} text="Peso Desechable" />
                                  <InputInt variable={alquiler_comercios} handler={handleChangeAlquiler_Comercios} text="Precio Comercio" />
                                  <InputInt variable={alquiler_retail} handler={handleChangeAlquiler_Retail} text="Precio Retail" />

                                  <div className="mb-3">
                                      <label htmlFor="formGroupExampleInput" className="form-label">Categoría</label>
                                      <CheckBox variable={sopa} handler={handleCheckboxSopa} text="Sopa" />
                                      <CheckBox variable={sin_division} handler={handleCheckboxSin_division} text="Sin División" />
                                      <CheckBox variable={medio} handler={handleCheckboxMedio} text="Medio" />
                                      <CheckBox variable={compartimientos} handler={handleCheckboxCompartimientos} text="Compartimientos" />
                                      <CheckBox variable={vaso} handler={handleCheckboxVaso} text="Vaso" />
                                      <CheckBox variable={plato} handler={handleCheckboxPlato} text="Plato" />
                                      <CheckBox variable={plato_sopa} handler={handleCheckboxPlato_sopa} text="Plato Sopa" />
                                  </div>

                                  <SelectFamily variable={family} handler={handleChangeFamily} />
                                  <SelectState variable={state} handler={handleChangeState} />


                                  <div className="mb-3">
                                      <label htmlFor="formGroupExampleInput" className="form-label">Color</label>
                                      <CheckBox variable={ja} handler={handleCheckboxJa} text="JA" />
                                      <CheckBox variable={cl} handler={handleCheckboxCl} text="CL" />
                                      <CheckBox variable={bl} handler={handleCheckboxBl} text="BL" />
                                      <CheckBox variable={rj} handler={handleCheckboxRj} text="RJ" />
                                      <CheckBox variable={ro} handler={handleCheckboxRo} text="RO" />
                                      <CheckBox variable={mo} handler={handleCheckboxMo} text="MO" />
                                  </div>

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
                          <button className="btn btn-warning" type="button">
                              Eliminar Producto
                          </button>
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
