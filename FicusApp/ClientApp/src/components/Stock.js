import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import Input from "./Input";
import InputInt from "./InputInt";
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
  const [nombre, setNombre] = useState("");
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const [descripcion, setDescripcion] = useState("");
  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const [dimensiones, setDimensiones] = useState("");
  const handleChangeDimensiones = (event) => {
    setDimensiones(event.target.value);
  };

  const [pesoRecipiente, setPesoRecipiente] = useState(0);
  const handleChangePesoRecipiente = (event) => {
    setPesoRecipiente(event.target.value);
  };

  const [pesoDesechable, setPesoDesechable] = useState(0);
  const handleChangePesoDesechable = (event) => {
    setPesoDesechable(event.target.value);
  };

  const [alquilerComercios, setAlquilerComercios] = useState(0);
  const handleChangeAlquilerComercios = (event) => {
    setAlquilerComercios(event.target.value);
  };

  const [alquilerRetail, setAlquilerRetail] = useState(0);
  const handleChangeAlquilerRetail = (event) => {
    setAlquilerRetail(event.target.value);
  };
  const [productoId, setProductoId] = useState(0);
  const handleChangeProductoId = (event) => {
    setProductoId(event.target.value);
  };
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const [familiaId, setFamiliaId] = useState(1);
  const handleChangeFamiliaId = (event) => {
    setFamiliaId(event.target.value);
  };
  const [colorId, setColorId] = useState(1);
  const handleChangeColorId = (event) => {
    setColorId(event.target.value);
  };
  const [categoriaId, setCategoriaId] = useState(1);
  const handleChangeCategoriaId = (event) => {
    setCategoriaId(event.target.value);
  };
  const [descontinuado, setDescontinuado] = useState(1);
  const handleChangeDescontinuado = (event) => {
    setDescontinuado(event.target.value);
  };
  const [totalExistente, setTotalExistente] = useState(1);
  const handleChangeTotalExistente = (event) => {
    setTotalExistente(event.target.value);
  };
  const [enUso, setEnUso] = useState(1);
  const handleChangeEnUso = (event) => {
    setEnUso(event.target.value);
  };
  const [disponible, setDisponible] = useState(1);
  const handleChangeDisponible = (event) => {
    setDisponible(event.target.value);
  };
  const [noDevueltos, setNoDevueltos] = useState(1);
  const handleChangeNoDevueltos = (event) => {
    setNoDevueltos(event.target.value);
  };

  const handleCancel = () => {
    setProductoId("");
    setNombre("");
    setDescripcion("");
    setDimensiones("");
    setPesoRecipiente(0);
    setPesoDesechable(0);
    setAlquilerComercios(0);
    setAlquilerRetail(0);
    setColorId(0);
    setCategoriaId(0);
    setFamiliaId(0);
    setDescontinuado(0);
    setTotalExistente(0);
    setEnUso(0);
    setDisponible(0);
    setNoDevueltos(0);
  };
  //Add Product to data base
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      date,
      productoId,
      nombre,
      colorId,
      descripcion,
      dimensiones,
      pesoRecipiente,
      pesoDesechable,
      alquilerComercios,
      alquilerRetail,
      categoriaId,
      familiaId,
      totalExistente,
      enUso,
      disponible,
      noDevueltos
    );
    const responseProduct = await fetch("api/producto/AddProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        colorId: colorId,
        productoId: productoId,
        nombre: nombre,
        descripcion: descripcion,
        dimensiones: dimensiones,
        pesoRecipiente: pesoRecipiente,
        pesoDesechable: pesoDesechable,
        alquilerComercios: alquilerComercios,
        alquilerRetail: alquilerRetail,
        categoriaId: categoriaId,
        familiaId: familiaId,
        descontinuado: 0,
        totalExistente: totalExistente,
        enUso: enUso,
        disponible: disponible,
        noDevueltos: noDevueltos,
      }),
    });
    console.log(responseProduct);

    if (responseProduct.ok) {
      handleCancel();
      getProducts();
    }
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Inventario</title>
      <section className="py-4">
        <div className="container-fluid">
          <div className="d-grid gap-2 mb-4">
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
                <Input
                  variable={productoId}
                  handler={handleChangeProductoId}
                  text="Producto ID"
                />
                <Input
                  variable={nombre}
                  handler={handleChangeNombre}
                  text="Nombre"
                />
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
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
                  variable={pesoRecipiente}
                  handler={handleChangePesoRecipiente}
                  text="Peso de Recipiente"
                />
                <InputInt
                  variable={pesoDesechable}
                  handler={handleChangePesoDesechable}
                  text="Peso Desechable"
                />
                <InputInt
                  variable={alquilerComercios}
                  handler={handleChangeAlquilerComercios}
                  text="Precio Comercio"
                />
                <InputInt
                  variable={alquilerRetail}
                  handler={handleChangeAlquilerRetail}
                  text="Precio Retail"
                />
                <InputInt
                  variable={totalExistente}
                  handler={handleChangeTotalExistente}
                  text="Total de Productos Existentes"
                />
                <InputInt
                  variable={enUso}
                  handler={handleChangeEnUso}
                  text="Productos en Uso"
                />
                <InputInt
                  variable={disponible}
                  handler={handleChangeDisponible}
                  text="Productos Disponibles"
                />
                <InputInt
                  variable={noDevueltos}
                  handler={handleChangeNoDevueltos}
                  text="Productos No Devueltos"
                />

                <SelectCategory
                  variable={categoriaId}
                  handler={handleChangeCategoriaId}
                />
                <SelectFamily
                  variable={familiaId}
                  handler={handleChangeFamiliaId}
                />
                <SelectColor variable={colorId} handler={handleChangeColorId} />

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
    </div>
  );
}

export default Stock;
