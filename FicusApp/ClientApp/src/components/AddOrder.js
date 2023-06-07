import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import BelongToEvent from "./BelongToEvent";
import MatchingProductList from "./MatchingProductList";
import MatchingProductsInput from "./MatchingProductsInput";
import SelectedProductList from "./SelectedProductList";

function AddOrder() {
  // get client id sent by navigate function in Client.js
  const location = useLocation();
  const [clientId] = useState(location.state);
  // get a new order id (order code)
  const [orderId, setIdOrder] = useState(0);
  const generateIdOrder = async () => {
    const response = await fetch("api/orden/GetNewCode");
    if (response.ok) {
      const data = await response.json();
      setIdOrder(data.id);
    } else {
      console.log(response.text);
    }
  }
  
  useEffect(() => {
    generateIdOrder();
  }, [])

  const [stock, setStock] = useState([{ nombre: "Montezuma", sku: "EC-07-1-JA", cantidad: "14", dimensiones: "20x30" }, { nombre: "Montezuma", sku: "EC-07-1-CL", cantidad: "45", dimensiones: "20x30" }, { nombre: "Tapanti", sku: "EC-12-1-CL", cantidad: "20", dimensiones: "20x30" }, { nombre: "Corcovado", sku: "EC-17-JA", cantidad: "20", dimensiones: "20x30" }])

  const [matchingProducts, setMatchingProducts] = useState([])

  const [selectedProducts, setSelectedProducts] = useState([])

  const date = currentDateFormat();
  const dateDB = dateFormatBD();
  //TO-DO: Get user name automatically from login info
  const [clientName, setClientName] = useState("");
  
  useEffect(() => {
    const getClientName = async () => {
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

  const [eventName, setEventName] = useState("");
  const handleEvent = (event) => {
    setEventName(event.target.value);
  }

  const handleProductInput = (event) => {
    let input = event.target.value
    console.log(input)
    if (input === "") {
      setMatchingProducts([])
    } else {
      setMatchingProducts(stock.filter(product => product.nombre.indexOf(input) !== -1));
    }
  }

  const [cost, setCost] = useState(0);
  const handleSelectedProduct = (sku) => {
    //TO-DO: verify if the cuantity is valid and decrease total products
    if (cuantity !== "" && cuantity > 0) {
      var selectedProduct = JSON.parse(JSON.stringify(stock.find(selectedProduct => selectedProduct.sku === sku)));
      selectedProduct.cantidad = cuantity;
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setCost(cost + (cuantity * 1000));
      stock.find(product => product.sku === sku).cantidad -= cuantity;
    }
    setCuantity("");
  }

  const [cuantity, setCuantity] = useState("")
  const handleCuantity = (event) => {
    console.log(event.target.value);
    setCuantity(event.target.value)
  }

  const handleDelete = (sku) => {
    console.log("Se elimino el producto");
    setCost(cost - selectedProducts.find(product=>product.sku === sku).cantidad*1000)
    setSelectedProducts((currentProduct) =>
      currentProduct.filter((product) => product.sku !== sku)
    )
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    var eventId = null;
    if (eventName !== "") {
      // verify the event doesn´t exist
      const responseEventExists = await fetch(`api/evento/findEvento/${eventName}`)
      if (responseEventExists.ok) {
        const data = await responseEventExists.json();
        console.log(data)
        if (data.exist) {
          console.log("El evento ya existe!")
        } else {
          //add event
          const responseEvent = await fetch("api/evento/AddEvento", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ eventoId: 0, nombreEvento: eventName, descripcionEvento: '' })
          });
        }
      }
      const responseEventId = await fetch(`api/evento/GetEventId/${eventName}`)
      if (responseEventId.ok) {
        const data = await responseEventId.json();
        eventId = data.id;
      }
    }
    

    const responseOrder = await fetch("api/orden/AddOrder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ordenId: orderId, fechaAlquiler: deliveryDate, usuarioId: 1, clienteId: clientId, eventoId: eventId, registroLimpiezaId: 0, limpiezaUnidad: 0, limpieza: 0, monto: cost, descuento: 0 })
    });
    if (responseOrder.ok) {
      console.log("Orden agregada")
      //Add selected products to data base
      for (let i = 0; i < selectedProducts.length; i++) {
        var responseDetail = await fetch("api/detalle/AddDetalle", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ ordenId: orderId, productoId: selectedProducts[i].sku, pedidos: selectedProducts[i].cantidad, sinUsar: 0, usados: 0, devueltos: 0, descuento: 0 })
        });
        if (responseDetail.ok) {

        }
      }
    }
    
    navigate('/clientes/informacion', { state: clientId });
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
              <li className="list-group-item">Codigo de la orden: {orderId}</li>
              <li className="list-group-item">Fecha de creacion: {date}</li>
              <li className="list-group-item">Cliente: {clientName}</li>
              <li className="list-group-item">Responsable de la orden: Alejandro</li>
              <li className="list-group-item"></li>
            </ul>
          </div>
          <div className="row">
        
            <form id="order-form" onSubmit={handleSubmit} >
              
              <BelongToEvent belongToEvent={belongToEvent} handleBelongToEvent={handleBelongToEvent} eventName={eventName} handleEvent={handleEvent} />

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

          <MatchingProductsInput handler={handleProductInput} />
          <MatchingProductList products={matchingProducts} handleCuantity={handleCuantity} handleSelectedProduct={handleSelectedProduct} />

          <h5 className="mt-4">Productos seleccionados:</h5>
          <SelectedProductList products={selectedProducts} variable={cuantity} handler={handleDelete} />
          <div className="row mt-5 mb-5">
            <h5>Costo de la orden: {"\u20A1" + cost}</h5>
          </div>
          <div className="row mx-5 d-flex justify-content-center">
            <div className="col-8 p-0 d-flex justify-content-center">
              <button className="btn btn-primary" form="order-form" type="submit">
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

function dateFormatBD() {
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

export default AddOrder;