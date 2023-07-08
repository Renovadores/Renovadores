import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { GetToken } from "../GetToken";
import Input from "./Input";
import InputInt from "./InputInt";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";
import ProductList from "./ProductList";
import AddInventoryModal from "./AddInventoryModal";
import MatchingProductListStock from "./MatchingProductListStock";
import MatchingProductsInput from "./MatchingProductsInput";
import { getMatchProducts } from "./Inventory";

function Stock() {
  // get products from data base
  const [token, setToken] = useState("");
  const [productsChecked, setProductsChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [addedProductId, setAddedProductId] = useState();

  const getProducts = async () => {
    setProductsChecked(false);
    const response = await fetch("api/producto/GetProducts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
      setProductsChecked(true);
      console.log(products);
    } else {
      console.log(response.text);
    }
  };
  // this method allows to auto call getProducts when page is started
  useEffect(() => {
    if (token === "") {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    } else {
      getProducts();
    }
  }, [token]);

  // // When user click on client button, 'navigate hook' redirect him to new page
  // const navigate = useNavigate(); // Allows referencing a specific path defined in AppRoutes
  // const handleClickViewProduct = (productIndex) => {
  //   navigate("/productos/informacion/", {
  //     state: products[productIndex].SKU,
  //   });
  //   //second argument allows to pass parameters
  // };
  // Agregar producto
  const [productoId, setProductoId] = useState("");
  const handleChangeProductoId = (event) => {
    setProductoId(event.target.value);
    setAddedProductId(event.target.value);
  };

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
  /* TO DO const [descontinuado, setDescontinuado] = useState(0);
  const handleChangeDescontinuado = (event) => {
    setDescontinuado(event.target.value);
  };*/
  // This is to close the modal when no product has been just created
  const handleAddInventoryProducts = () => {
    setAddedProductId();
  };

  // Search input
  const [matchingProducts, setMatchingProducts] = useState([]);
  const handleMatchProduct = (matched) => {
    setMatchingProducts(matched);
  };

  const [productInput, setProductInput] = useState("");
  const handleProductInput = (event) => {
    setProductInput(event.target.value);
  };

  // this method is used when search criteria is changed
  const searchProductInput = () => {
    if (productInput === "") {
      setMatchingProducts([]);
    } else {
      getMatchProducts(productInput, handleMatchProduct);
    }
  };

  useEffect(() => {
    searchProductInput();
  }, [productInput]);

  const handleCancel = () => {
    setProductoId("");
    setNombre("");
    setDescripcion("");
    setDimensiones("");
    setPesoRecipiente(0);
    setPesoDesechable(0);
    setAlquilerComercios(0);
    setAlquilerRetail(0);
    setColorId(1);
    setCategoriaId(1);
    setFamiliaId(1);
    //setDescontinuado(0);
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
      familiaId
    );
    const currentToken = await GetToken();
    const responseProduct = await fetch("api/producto/AddProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${currentToken}`,
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
      }),
    });

    if (responseProduct.ok) {
      handleCancel();
      if (token === currentToken) {
        getProducts();
      } else {
        setToken(currentToken);
      }
    }
  };

  // Get inventory states from DB
  /*const [inventoryStates, setInventoryStates] = useState([]);
  const [inventoryState, setInventoryState] = useState(inventoryStates[0]);

  /*const getInventoryStates = async () => {
    const response = await fetch("api/inventario/GetState");
    if (response.ok) {
      const data = await response.json();
      setInventoryStates(data);
      setInventoryState(data[0].iD_estado);
    } else {
      console.log(response.text);
    }
  };
  useEffect(() => {
    getInventoryStates();
  }, []);*/

  return (
    <div>
      {addedProductId ? (
        <AddInventoryModal
          productoId={addedProductId}
          handleCancel={() => {
            setAddedProductId();
          }}
          handler={handleAddInventoryProducts}
        />
      ) : null}
      <section className="container-fluid py-4">
        <div className="row">
          <div className="d-grid gap-2 mb-4">
            <div className="d-grid gap-2 mb-4">
              <div className="row">
                <div className="col-6 d-flex justify-content-start">
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
                  text="Producto ID/SKU"
                />
                <Input
                  variable={nombre}
                  handler={handleChangeNombre}
                  text="Nombre del producto"
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
                  text="Peso de recipiente Ficus en gramos"
                />
                <InputInt
                  variable={pesoDesechable}
                  handler={handleChangePesoDesechable}
                  text="Peso del recipiente desechable en gramos"
                />
                <InputInt
                  variable={alquilerComercios}
                  handler={handleChangeAlquilerComercios}
                  text="Precio comercio en colones"
                />
                <InputInt
                  variable={alquilerRetail}
                  handler={handleChangeAlquilerRetail}
                  text="Precio retail en colones"
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

                <div className="row" data-bs-dismiss="offcanvas">
                  <div className="col-6 d-flex justify-content-center">
                    {productoId !== "" &&
                    nombre !== "" &&
                    descripcion !== "" &&
                    pesoRecipiente >= 0 &&
                    pesoDesechable >= 0 &&
                    alquilerComercios >= 0 &&
                    alquilerRetail >= 0 &&
                    colorId > 0 &&
                    familiaId > 0 &&
                    categoriaId > 0 ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#goInventoryModal"
                        onClick={() => {}}
                      >
                        Agregar
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#goInventoryModal"
                        onClick={() => {}}
                        disabled
                      >
                        Agregar
                      </button>
                    )}
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <button
                      className="btn btn-danger text-light"
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
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-4">
            {/* Filter/Search text*/}
            <MatchingProductsInput
              productInput={productInput}
              handler={handleProductInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {matchingProducts.length === 0 && productInput !== "" ? (
              <label>No se encontro el producto</label>
            ) : matchingProducts.length !== 0 && productInput !== "" ? (
              <MatchingProductListStock
                products={matchingProducts}
                handleSelectedProduct={handleChangeProductoId}
              />
            ) : (
              <></>
            )}
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
        </div>
      </section>
    </div>
  );
}

export default Stock;
