import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "./Input";
import InputInt from "./InputInt";
import Stock from "./Stock";
import InventoryList from "./InventoryList";

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

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

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
            
          />
        )}
      </section>
    </div>
  );
}
export default Inventory;
