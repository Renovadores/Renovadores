import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import InventoryList from "./InventoryList";
import { CurrentDateFormat, DateFormatBD } from "./Clients";
import InputInt from "./InputInt";
import SelectProduct from "./SelectProduct";

function Inventory() {
  // get inventory from data base
  const [inventoryChecked, setInventoryChecked] = useState(false);
  const [inventory, setInventory] = useState([]);
  const getInventory = async () => {
    setInventoryChecked(false);
    const response = await fetch("api/inventario/GetInventory");
    if (response.ok) {
      const data = await response.json();
      setInventory(data);
      setInventoryChecked(true);
    } else {
      console.log(response.text);
    }
  };
  // this method allows to auto call getinventory when page is started
  useEffect(() => {
    getInventory();
  }, []);
  // display inventory on console
  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  const date = CurrentDateFormat();
  const dateDB = DateFormatBD();
  // get existent products from DB
  const [SKUProducts, setSKUProducts] = useState([]);
  const [SKUProduct, setSKUProduct] = useState(SKUProducts[0]);
  const getSKUProducts = async () => {
    const response = await fetch("api/producto/GetProducts");
    if (response.ok) {
      const data = await response.json();
      setSKUProducts(data);
      setSKUProduct(data[0].sku);
    } else {
      console.log(response.text + " Error getSKUProducts");
    }
  };
  useEffect(() => {
    getSKUProducts();
  }, []);
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

  const [productAmount, setProductAmount] = useState(10);
  const handleChangeProductAmount = (event) => {
    setProductAmount(event.target.value);
  };
  //TO DO get batch count from inventory product
  const [batch, setBatch] = useState(1);
  const handleChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const handleCancel = () => {
    setSKUProduct(SKUProducts[0]);
    setProductAmount(0);
    setBatch(1);
    //setDate
  };

  // const [newInventoryRow, setNewInventoryRow] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    // generate id
    const responseId = await fetch("api/inventario/GetNewId");
    if (responseId.ok) {
      const newInventoryId = await responseId.json();

      const newInventory = {
        iD_Inventario: newInventoryId.id,
        producto: SKUProduct,
        cantidad: productAmount,
        lote: batch,
        fecha_ingreso: dateDB,
      };

      // setNewInventoryRow(newInventory);
      const oldProductAmount = 0;
      // add inventory
      const responseInventory = await fetch("api/inventario/AddInventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newInventory),
      });
      if (responseInventory.ok) {
        // const responseRow = await fetch(
        //   `api/inventario/GetInventoryRow/${newInventory.iD_Inventario}`
        // );
        // if (responseRow.ok) {
        const dataRow = await responseInventory.json();
        // console.dir(
        //   dataRow.productoNavigation + " productNav, ",
        //   dataRow.cantidad + " cantidad"
        // );
        console.dir(dataRow);
        await calculateNewProductTotal(dataRow, oldProductAmount);
        handleCancel();
        getInventory();
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
        iD_Inventario: inventoryRow.iD_Inventario,
        producto: inventoryRow.producto,
        cantidad: inventoryRow.cantidad,
        lote: inventoryRow.lote,
        fecha_ingreso: inventoryRow.fecha_ingreso,
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
            <button
              className="btn btn-success"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              Agregar Inventario
            </button>
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

                  <SelectProduct
                    products={SKUProducts}
                    value={SKUProduct}
                    onChange={handleChangeSKUProduct}
                    text="SKU"
                  />
                  <small>
                    * Si no ve el producto en la lista, agrégelo en la sección
                    productos
                  </small>
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
                        onClick={getInventory}
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
            <button className="btn btn-warning text-light" type="button">
              Eliminar Inventario
            </button>
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
  const newTotal = inventoryRow.productoNavigation.totalExistente + difference;
  const newAvailable = inventoryRow.productoNavigation.disponible + difference;
  const responseProduct = await fetch("api/producto/EditProducto", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ...inventoryRow.productoNavigation,
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
    const response = await fetch("api/inventario/GetInventory");
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
export default Inventory;
