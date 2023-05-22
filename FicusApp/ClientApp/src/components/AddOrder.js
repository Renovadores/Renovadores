import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Input from "./Input";
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
  useEffect(() => {
    getClientName();
  }, [])

  const [deliveryDate, setDeliveryDate] = useState("");
  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  }

  const [belongToEvent, setBelongToEvent] = useState("");
  const handleBelongToEvent = (event) => {
    setBelongToEvent(event.target.checked);
  }

  const handleSubmit = () => {
  }
  return (
    <div className="container">
      <div className="row">
        <h3> Informacion General de la Orden</h3>
      </div>
      <div className="row mt-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Codigo de la orden: {idOrder}</li>
          <li className="list-group-item">Fecha de creacion de la orden: {date}</li>
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
              <div className="form-check form-switch">
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
          <input id="startDate" className="form-control" type="date" value={deliveryDate} onChange={handleDeliveryDate} />

          <label htmlFor="endDate" className="mt-3">Fecha de recepcion de la orden</label>
          <input id="endDate" className="form-control" type="date" />

        </form>
      </div>

      <div className="row mt-3">
        <h3> Seleccion de Productos</h3>
      </div>
      <div className="row">
        section to select products
      </div>
      <div className="row">
        section to see and discard products selected
      </div>
      <div className="row m-3 my-5 d-flex justify-content-center">
        <div className="col-6 p-0 d-flex justify-content-center">
          <button className="btn btn-primary">
            Generar Orden
          </button>
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