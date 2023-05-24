import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputInt from "./InputInt";
function AddOrder() {
  // get client id sent by navigate function in Client.js
  const location = useLocation();
  const clientId = location.state;
  // get a new order id (order code)
  const [idOrder, setIdOrder] = useState("");
  const generateIdOrder = async () => {
    //const responseId = await fetch("api/orden/GetNewId");
    //if (responseId.ok) {
    //  const id = responseId.json();
        setIdOrder(1);
    //} else {
    //  console.log(responseId.text);
    //}
  }
  useEffect(() => {
    generateIdOrder();
  }, [])

  const date = currentDateFormat();
  //TO-DO: Get user name automatically from login info
  const [clientName, setClientName] = useState("");
  
  useEffect(() => {
    const getClientName = async () => {
      console.log(clientId)
      const responseClientName = await fetch(`api/cliente/GetCliente/${clientId}`)
      if (responseClientName.ok) {
        const data = await responseClientName.json();
        setClientName(data.nombreEmpresa);
      } else {
        console.log(responseClientName.text);
      }
    }
    getClientName();
  }, [clientId])

  const [deliveryDate, setDeliveryDate] = useState("");
  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  }

  const [collectionDate, setCollectionDate] = useState("");
  const handleCollectionDate = (event) => {
    setCollectionDate(event.target.value);
  }

  const [belongToEvent, setBelongToEvent] = useState("");
  const handleBelongToEvent = (event) => {
    if (event.target.checked === false) {
      //delete data
    }
    setBelongToEvent(event.target.checked);
  }

  const [cuantity, setCuantity] = useState("")
  const handleCuantity = (event) => {
    setCuantity(event.target.value)
    console.log(event.target.value);
  }

  const [selectedProduct, setSelectProduct] = useState("")
  const handleSelectedProduct = (index) => {
    setSelectProduct(index)
    console.log(index);
  }

  const handleDelete = (index) => {
    console.log("Se elimino el producto")
  }
  
  const handleSubmit = () => {
  }
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md">
          <div className="row">
            <h3>Informacion General de la Orden</h3>
          </div>
          <div className="row mt-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Codigo de la orden: {idOrder}</li>
              <li className="list-group-item">Fecha de creacion: {date}</li>
              <li className="list-group-item">Cliente: {clientName}</li>
              <li className="list-group-item">Responsable de la orden: Alejandro</li>
              <li className="list-group-item"></li>
            </ul>
          </div>
          <div className="row">
        
            <form onSubmit={handleSubmit}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={belongToEvent} onChange={handleBelongToEvent} />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pertenece a un evento</label>
              </div>
              {
                belongToEvent === true ?
                  <div>
                    <label htmlFor="exampleDataList" className="form-label mt-3">Seleccionar evento (Si no existe se genera automaticamente)</label>
                    <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Escriba para buscar..." />
                    <datalist id="datalistOptions">
                      <option value="Feria Verde" />
                      <option value="Feria 2" />
                      <option value="Feria 3" />
                      <option value="Feria 4" />
                    </datalist>
                  </div>
                :
                  <>
                  </>
              }

              <label htmlFor="startDate" className="mt-3">Fecha de entrega de la orden</label>
              <input id="startDate" className="form-control w-50" type="date" value={deliveryDate} onChange={handleDeliveryDate} />

              <label htmlFor="endDate" className="my-3">Fecha de recepcion de la orden</label>
              <input id="endDate" className="form-control w-50 mb-4" type="date" value={collectionDate} onChange={handleCollectionDate} />

            </form>
          </div>
        </div>

        <div className="col-md">
          <div className="row">
            <h3 className="mb-4">Seleccion de Productos</h3>
          </div>
          <div className="row my-2">
            <div className="col">
              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Escriba para buscar un producto..." />
            </div>
          </div>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Montezuma</div>
                EC-07-1-JA  L:06.50 W:02.00 H:1.12
              </div>
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Montezuma EC-07-1-JA</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <label>Total disponible: 14</label>
                    <InputInt variable={cuantity} handler={handleCuantity} text="Indique la cantidad"></InputInt>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary">Aceptar</button>
                  </div>
                </div>
              </div>
            </div>

            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
              </div>
              <span className="badge bg-primary rounded-pill">50</span>
            </li>
          </ol>
          <h5 className="mt-4">Productos seleccionados:</h5>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Montezuma<span className="badge bg-primary rounded-pill mx-4">14</span></div>
                EC-07-1-JA  L:06.50 W:02.00 H:1.12
              </div>
              <span className="btn badge bg-danger rounded-pill" style={{color:"white"}}>X</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Tapanti<span className="badge bg-primary rounded-pill mx-4">20</span></div>
                EC-12-1-CL  L:06.50 W:02.00 H:1.12
              </div>
              <span className="btn badge bg-danger rounded-pill" style={{ color: "white" }}>X</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Corcovado<span className="badge bg-primary rounded-pill mx-4">10</span></div>
                EC-17-JA  L:06.50 W:02.00 H:1.12
              </div>
              <span className="btn badge bg-danger rounded-pill" style={{ color: "white" }}>X</span>
            </li>
          </ol>
          <div className="row m-5 d-flex justify-content-center">
            <div className="col-8 p-0 d-flex justify-content-center">
              <button className="btn btn-primary">
                Generar Orden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function currentDateFormat() {
  const current = new Date();
  const day = current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const month = (current.getMonth() + 1) < 10 ? "0" + (current.getMonth() + 1) : current.getMonth() + 1;
  const year = current.getFullYear();
  const date = `${day}-${month}-${year}`;

  return date;
}

export default AddOrder;