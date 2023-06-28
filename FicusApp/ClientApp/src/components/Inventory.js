import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { GetToken } from "../GetToken";
import InventoryList from "./InventoryList";
import { currentDateFormat, dateFormatBD } from "./Clients";
import InputInt from "./InputInt";
import SelectProduct from "./SelectProduct";
import MatchingProductListInventory from "./MatchingProductListInventory";
import MatchingProductsInput from "./MatchingProductsInput";

function Inventory() {
  // get inventory from data base
  const [token, setToken] = useState("");
  const [inventoryChecked, setInventoryChecked] = useState(false);
  const [inventory, setInventory] = useState([]);
  const getInventory = async () => {
    setInventoryChecked(false);
    const response = await fetch("api/inventario/GetInventory", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setInventory(data);
      setInventoryChecked(true);
    } else {
      console.log(response.text);
    }
  };

  const date = currentDateFormat();
  const dateDB = dateFormatBD();
  // get existent products from DB
  const [SKUProducts, setSKUProducts] = useState([]);
  const [SKUProduct, setSKUProduct] = useState(SKUProducts[0]);
  const getSKUProducts = async () => {
    const response = await fetch("api/producto/GetProducts", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setSKUProducts(data);
      setSKUProduct(data[0].productoId);
    } else {
      console.log(response.text + " Error getSKUProducts");
    }
  };

  // this method allows to auto call getinventory when page is started and the token has been obtained
  useEffect(() => {
    if (token !== "") {
      getSKUProducts();
      getInventory();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);
  // display inventory on console
  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  const handleChangeSKUProduct = (event) => {
    setSKUProduct(event.target.value);
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

  const [productAmount, setProductAmount] = useState(0);
  const handleChangeProductAmount = (event) => {
    setProductAmount(event.target.value);
  };
  //TO DO get batch count from inventory product
  const [batch, setBatch] = useState(1);
  const handleChangeBatch = (event) => {
    setBatch(event.target.value);
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
    setSKUProduct(SKUProducts[0]);
    setProductAmount(0);
    setBatch(1);
    //setDate
  };

  // const [newInventoryRow, setNewInventoryRow] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentToken = await GetToken();
    // generate id
    const responseId = await fetch("api/inventario/GetNewId", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    });
    if (responseId.ok) {
      const newInventoryId = await responseId.json();

      const newInventory = {
        inventarioId: newInventoryId.id,
        productoId: SKUProduct,
        cantidad: productAmount,
        lote: batch,
        fechaIngreso: dateDB,
      };

      // add inventory
      const responseInventory = await fetch("api/inventario/AddInventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify(newInventory),
      });
      if (responseInventory.ok) {
        const dataRow = await responseInventory.json();
        //console.dir(dataRow+ " dataRow");
        const oldProductAmount = 0; // 0 because product did't exist, needed when editing
        await calculateNewProductTotal(dataRow, oldProductAmount);
        handleCancel();
        if (token === currentToken) {
          getInventory();
        } else {
          setToken(currentToken);
        }
        // }
      } else {
        console.log(responseInventory.text + " Error handleSubmit");
      }
    }
  };

  const [inventorySelected, setInventorySelected] = useState([]);
  const handleOnSelectInventory = (product) => {
    setInventorySelected(product);
  };

  const handleSubmitEdit = async (event, inventoryRow, oldProductAmount) => {
    event.preventDefault();
    const responseInventory = await fetch("api/inventario/EditInventory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        inventarioId: inventoryRow.inventarioId,
        productoId: inventoryRow.productoId,
        cantidad: inventoryRow.cantidad,
        lote: inventoryRow.lote,
        fechaIngreso: inventoryRow.fechaIngreso,
      }),
    });
    if (responseInventory.ok) {
      calculateNewProductTotal(inventoryRow, oldProductAmount);
      handleCancel();
      getInventory();
    } else {
      console.log(responseInventory.text + " Error submitting inventory");
    }
  };

  return (
    <div>
      <section>
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
                  Agregar Productos al Inventario
                </button>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-start "
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
                  Información del Nuevo Inventario
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
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label"
                    >
                      Agregado el: {date}
                    </label>
                  </div>
                  <small>
                    * Si no ve el producto en la lista, agrégelo en la sección
                    productos
                  </small>
                  <SelectProduct
                    products={SKUProducts}
                    value={SKUProduct}
                    onChange={handleChangeSKUProduct}
                    text="SKU"
                  />
                  <InputInt
                    variable={productAmount}
                    handler={handleChangeProductAmount}
                    text="Cantidad"
                  />
                  <InputInt
                    variable={batch}
                    handler={handleChangeBatch}
                    text="Lote"
                  />

                  <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="offcanvas"
                      >
                        Agregar
                      </button>
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
        </div>
        <div className="row">
          <div className="col">
            {/* Filter/Search text*/}
            <MatchingProductsInput
              productInput={productInput}
              handler={handleProductInput}
            />
            {matchingProducts.length === 0 && productInput !== "" ? (
              <label>No se encontro el producto</label>
            ) : matchingProducts.length !== 0 && productInput !== "" ? (
              <MatchingProductListInventory
                products={matchingProducts}
                handleSelectedProduct={handleChangeSKUProduct}
              />
            ) : (
              <></>
            )}
          </div>
          {/* Filter/Search button*/}
          <div className="col">
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
                    SKU
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
      <section>
        {inventoryChecked === false ? (
          <div className="d-flex align-items-center justify-content-center">
            <strong>Cargando... </strong>
            <div
              className="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : (
          <InventoryList
            inventory={inventory}
            inventoryRow={inventorySelected}
            onSelectInventory={handleOnSelectInventory}
            onSubmit={handleSubmitEdit}
          />
        )}
      </section>
    </div>
  );
}

const calculateNewProductTotal = async (inventoryRow, oldProductAmount) => {
  const difference = inventoryRow.cantidad - oldProductAmount;
  console.log(inventoryRow.cantidad + " cantidad");
  const newTotal = inventoryRow.producto.totalExistente + difference;
  const newAvailable = inventoryRow.producto.disponible + difference;
  const currentToken = await GetToken();
  const responseProduct = await fetch("api/producto/EditProducto", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      'Authorization': `Bearer ${currentToken}`
    },
    body: JSON.stringify({
      ...inventoryRow.producto,
      totalExistente: newTotal,
      disponible: newAvailable,
    }),
  });
  console.log(responseProduct + "responseProduct");
  return responseProduct;
};

export function GetInventory() {
  // get inventory from data base
  //const [inventoryChecked, setInventoryChecked] = useState(false);
  const [inventory, setInventory] = useState([]);
  const getInventory = async () => {
    const currentToken = await GetToken();
    const response = await fetch("api/inventario/GetInventory", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setInventory(data);
      //setInventoryChecked(true);
    } else {
      console.log(response.text);
    }
  };
  getInventory();
  return inventory;
}

export function GetInventoryStates() {
  // Get inventory states from DB
  const [inventoryStates, setInventoryStates] = useState([]);
  const getInventoryStates = async () => {
    const response = await fetch("api/inventario/GetState");
    if (response.ok) {
      const data = await response.json();
      setInventoryStates(data);
    } else {
      console.log(response.text);
    }
  };
  getInventoryStates();
  return inventoryStates;
}

const getMatchProducts = async (input, handler) => {
  //get some products from stock that match with input
  const searchByCodeOrName = true;
  const responseInventory = await fetch(
    `api/producto/GetMatchProducts/${input}/${searchByCodeOrName}`
  );
  if (responseInventory.ok) {
    const matchProducts = await responseInventory.json();
    handler(matchProducts);
  } else {
    console.log("error matching products");
  }
};

function GetNextProductBatch(productoId) {}

export default Inventory;
