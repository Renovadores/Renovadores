import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "./Input";
import InputInt from "./InputInt";
import CheckBox from "./CheckBox";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";
import ProductList from "./ProductList";

function Stock() {
  // get products from data base
  const [productsChecked, setProductsChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    setProductsChecked(false);
    const response = await fetch("api/producto/GetProducts");
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
      setProductsChecked(true);
    } else {
      console.log(response.text);
    }
  };
  // this method allows to auto call getProducts when page is started
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // // When user click on client button, 'navigate hook' redirect him to new page
  // const navigate = useNavigate(); // Allows referencing a specific path defined in AppRoutes
  // const handleClickViewProduct = (productIndex) => {
  //   navigate("/productos/informacion/", {
  //     state: products[productIndex].SKU,
  //   });
  //   //second argument allows to pass parameters
  // };
  // Agregar producto
  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const [descripcion, setDescripcion] = useState("");
  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const [dimensiones, setDimensiones] = useState("");
  const handleChangeDimensiones = (event) => {
    setDimensiones(event.target.value);
  };

  const [peso_recipiente, setPeso_recipiente] = useState(0);
  const handleChangePeso_recipiente = (event) => {
    setPeso_recipiente(event.target.value);
  };

  const [peso_desechable, setPeso_desechable] = useState(0);
  const handleChangePeso_desechable = (event) => {
    setPeso_desechable(event.target.value);
  };

  const [alquiler_comercios, setAlquiler_Comercios] = useState(0);
  const handleChangeAlquiler_Comercios = (event) => {
    setAlquiler_Comercios(event.target.value);
  };

  const [alquiler_retail, setAlquiler_Retail] = useState(0);
  const handleChangeAlquiler_Retail = (event) => {
    setAlquiler_Retail(event.target.value);
  };
  const [sku, setSKU] = useState(0);
  const handleChangeSKU = (event) => {
    setSKU(event.target.value);
  };
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const [family, setFamily] = useState(1);
  const handleChangeFamily = (event) => {
    setFamily(event.target.value);
  };
  const [color, setColor] = useState(1);
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const [category, setCategory] = useState(1);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleCancel = () => {
    setSKU("");
    setName("");
    setDescripcion("");
    setDimensiones("");
    setPeso_recipiente(0);
    setPeso_desechable(0);
    setAlquiler_Comercios(0);
    setAlquiler_Retail(0);
    setColor(0);
    setCategory(0);
    setFamily(0);
  };
  //Add Product to data base
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      date,
      sku,
      name,
      color,
      descripcion,
      dimensiones,
      peso_recipiente,
      peso_desechable,
      alquiler_comercios,
      alquiler_retail,
      category,
      family
    );
    const responseCliente = await fetch("api/producto/AddProducto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        fecha_Agregado: date,
        color: color,
        sku: sku,
        name: name,
        descripcion: descripcion,
        dimensiones: dimensiones,
        peso_recipiente: peso_recipiente,
        peso_desechable: peso_desechable,
        alquiler_comercios: alquiler_comercios,
        alquiler_retail: alquiler_retail,
        category: category,
        family: family,
      }),
    });
    console.log(responseCliente);

    if (responseCliente.ok) {
      handleCancel();
      getProducts();
    }
  };;

  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Inventario</title>
      </head>
      <body>
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
                <button
                  className="btn btn-success"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                >
                  Agregar Producto
                </button>
                <button className="btn btn-warning text-light" type="button">
                  Eliminar Producto
                </button>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasWithBothOptionsLabel"
                >
                  Informacion del nuevo producto
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>
                  <Input variable={sku} handler={handleChangeSKU} text="SKU" />
                  <Input
                    variable={name}
                    handler={handleChangeName}
                    text="Nombre"
                  />
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label"
                    >
                      Agregado el: {date}
                    </label>
                  </div>
                  <Input
                    variable={descripcion}
                    handler={handleChangeDescripcion}
                    text="Descripción"
                  />
                  <Input
                    variable={dimensiones}
                    handler={handleChangeDimensiones}
                    text="Dimensiones"
                  />
                  <InputInt
                    variable={peso_recipiente}
                    handler={handleChangePeso_recipiente}
                    text="Peso de Recipiente"
                  />
                  <InputInt
                    variable={peso_desechable}
                    handler={handleChangePeso_desechable}
                    text="Peso Desechable"
                  />
                  <InputInt
                    variable={alquiler_comercios}
                    handler={handleChangeAlquiler_Comercios}
                    text="Precio Comercio"
                  />
                  <InputInt
                    variable={alquiler_retail}
                    handler={handleChangeAlquiler_Retail}
                    text="Precio Retail"
                  />

                  <SelectCategory
                    variable={category}
                    handler={handleChangeCategory}
                  />
                  <SelectFamily
                    variable={family}
                    handler={handleChangeFamily}
                  />
                  <SelectColor variable={color} handler={handleChangeColor} />

                  <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="offcanvas"
                        onClick={getProducts}
                      >
                        Agregar
                      </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={handleCancel}
                        data-bs-dismiss="offcanvas"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container fluid">
            <div className="container">
              <h2 className="display-3 fw-bold">Todos los productos</h2>
            </div>

            {productsChecked === false ? (
              <div className="d-flex align-items-center justify-content-center">
                <strong>Cargando... </strong>
                <div
                  className="spinner-border ml-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            ) : (
              <ProductList
                products={products}
                // handler={handleClickViewProduct}
              />
            )}
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
