import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BelongToEvent from "./BelongToEvent";
import ButtonAddOrder from "./ButtonAddOrder";
import { GetToken } from "../GetToken";
import MatchingProductList from "./MatchingProductList";
import MatchingProductsInput from "./MatchingProductsInput";
import SearchCriteriaSwitch from "./SearchCriteriaSwitch";
import SelectedProductList from "./SelectedProductList";
import MatchingClientInput from "./MatchingClientInput";
import MatchingClientList from "./MatchingClientList";
import SelectedClient from "./SelectedClient";

function AddOrder() {
  const location = useLocation();
  const [clientId, setClientId] = useState(location.state);
  const [token, setToken] = useState("");

  const [currentUserId] = useState(JSON.parse(sessionStorage.getItem('userId')));
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    const response = await fetch(`api/usuario/GetUser/${currentUserId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setUserName(data.nombre);
    } else {

    }
  }
  const getClientName = async () => {
    const responseClientName = await fetch(`api/cliente/GetCliente/${clientId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (responseClientName.ok) {
      const data = await responseClientName.json();
      setClientName(data.nombreEmpresa);
    } else {
      console.log(responseClientName.text);
    }
  }
  useEffect(() => {
    if (token !== "") {
      /*generateIdOrder();*/
      getUserName();
      if (clientId !== null) {
        getClientName();
      }
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);

  const [matchingProducts, setMatchingProducts] = useState([])

  const [selectedProducts, setSelectedProducts] = useState([])

  const date = currentDateFormat();
  const dateDB = dateFormatBD();

  const [clientName, setClientName] = useState("");

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

  // this method is used when search criteria is changed
  const searchProductInput = () => {
    if (productInput === "") {
      setMatchingProducts([])
    } else {
      getMatchProducts(productInput);
    }
  }

  const [productInput, setProductInput] = useState("");
  const handleProductInput = (event) => {
    setProductInput(event.target.value);
    if (event.target.value === "") {
      setMatchingProducts([])
    } else {
      getMatchProducts(event.target.value);
    }
  }

  const [searchByCodeOrName, setSearchByCodeOrName] = useState(false);
  const handleSearchCriteria = (event) => {
    setSearchByCodeOrName(event.target.checked)
  }

  useEffect(() => {
    searchProductInput();
  }, [searchByCodeOrName])

  const [selectedClient, setSelectedClient] = useState(null);
  const [matchingClients, setMatchingClients] = useState([]);
  const getMatchClients = async (input) => {
    input = input.replace(/^[ \t]+|[ \t]+$/gm, "");
    input = input.replace(/[\s]+/g, ' ');
    if (input !== null && input !== ""){
      //get some products from stock that match with input
      const currentToken = await GetToken();
      const responseClients = await fetch(`api/cliente/GetMatchClients/${input}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (responseClients.ok) {
        const matchClients = await responseClients.json();
        setMatchingClients(matchClients)
      }
    }
  }

  const [clientInput, setClientInput] = useState("");
  const handleClientInput = (event) => {
    setClientInput(event.target.value);
    if (event.target.value === "") {
      setMatchingClients([])
    } else {
      getMatchClients(event.target.value);
    }
  }

  const handleSelectedClient = async (id) => {
    if (id !== "") {
      var client = JSON.parse(JSON.stringify(matchingClients.find(selectedClient => selectedClient.clienteId === id)));
      setSelectedClient(client);
      setClientInput("");
      setMatchingClients([]);
    }
  }

  const handleCancelClient = () => {
    setSelectedClient(null);
  }

  const getMatchProducts = async (input) => {
    input = input.replace(/^[ \t]+|[ \t]+$/gm, "");
    input = input.replace(/[\s]+/g, ' ');
    if (input !== null && input !== "") {
      //get some products from stock that match with input
      const currentToken = await GetToken();
      const responseInventory = await fetch(`api/producto/GetMatchProducts/${input}/${searchByCodeOrName}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (responseInventory.ok) {
        const matchProducts = await responseInventory.json();
        // verify if cuantity of some product was already changed
        for (var i = 0; i < matchProducts.length; i++) {
          for (var j = 0; j < selectedProducts.length; j++) {
            if (matchProducts[i].productoId === selectedProducts[j].productoId) {
              matchProducts[i].disponible -= selectedProducts[j].pedidos;
            }
          }
        }
        setMatchingProducts(matchProducts)
      }
    }
  }

  const [cuantity, setCuantity] = useState("")
  const handleCuantity = (event) => {
    setCuantity(event.target.value)
  }

  const [cost, setCost] = useState(0);
  const handleSelectedProduct = async (sku) => {
    if (sku !== "" && cuantity !== "" && cuantity > 0) {

      var selectedProduct = JSON.parse(JSON.stringify(matchingProducts.find(selectedProduct => selectedProduct.productoId === sku)));
      var productCost = selectedProduct.alquilerRetail;
      setCost(cost + (cuantity * productCost));
      var productName = selectedProduct.nombre;
      var productSize = selectedProduct.dimensiones;

      //Verify if the product is already added
      var selectedProductInfo = selectedProducts.find(selectedProduct => selectedProduct.productoId === sku);
      if (selectedProductInfo) {
        var newCuantity = parseInt(selectedProductInfo.pedidos) + parseInt(cuantity);
        selectedProductInfo.pedidos = newCuantity;
      } else {
        selectedProductInfo = { ordenId: "", productoId: sku, nombre: productName, pedidos: cuantity, dimensiones: productSize, alquilerRetail: productCost }
        setSelectedProducts([...selectedProducts, selectedProductInfo])
      }
      setProductInput("");
      setMatchingProducts([])
    }
    setCuantity("");
  }

  const handleDelete = async (sku) => {
    var productToDelete = selectedProducts.find(product => product.productoId === sku);
    setCost(cost - (productToDelete.pedidos * productToDelete.alquilerRetail));
    setSelectedProducts((currentProduct) => currentProduct.filter((product) => product.productoId !== sku))
    setCuantity("");
  }

  const [orderCode, setOrderCode] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentToken = await GetToken();
    var eventId = null;
    if (eventName !== "") {
      // verify the event doesn�t exist
      const responseEventExists = await fetch(`api/evento/findEvento/${eventName}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (responseEventExists.ok) {
        const data = await responseEventExists.json();
        if (data.exist) {

        } else {
          //add event
          const responseEvent = await fetch("api/evento/AddEvento", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ eventoId: 0, nombreEvento: eventName, descripcionEvento: '' })
          });
          if (responseEvent.ok) {
            console.log("Evento creado con éxito!")
          }
        }
      }
      const responseEventId = await fetch(`api/evento/GetEventId/${eventName}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (responseEventId.ok) {
        const data = await responseEventId.json();
        eventId = data.id;
      }
    }
    //generate new order id
    var orderId;
    const response = await fetch("api/orden/GetNewCode", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      orderId = data.id;
    }
    var clienteId = clientId !== null ? clientId : selectedClient.clienteId;
    const responseOrder = await fetch("api/orden/AddOrder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify({ ordenId: orderId, fechaAlquiler: deliveryDate, usuarioId: currentUserId, clienteId: clienteId, eventoId: eventId, registroLimpiezaId: 0, limpiezaUnidad: 0, limpieza: 0, monto: cost, descuento: 0 })
    });
    if (responseOrder.ok) {
      console.log("Orden agregada")
      //Add selected products to data base
      for (let i = 0; i < selectedProducts.length; i++) {
        var productId = selectedProducts[i].productoId;
        var pedidos = selectedProducts[i].pedidos;
        var responseDetail = await fetch("api/detalle/AddDetalle", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({ ordenId: orderId, productoId: productId, pedidos: pedidos, sinUsar: 0, usados: 0, devueltos: 0, descuento: 0 })
        });
        if (responseDetail.ok) {
          // Go to stock and reduce product cuantity
          const responseStock = await fetch(`api/producto/GetProducto/${productId}`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${currentToken}`
            }
          });
          if (responseStock.ok) {
            const productStock = await responseStock.json();
            productStock.disponible -= pedidos;
            productStock.enUso = parseInt(productStock.enUso) + parseInt(pedidos);
            // Edit record
            const response = await fetch("api/producto/EditProducto", {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${currentToken}`
              },
              body: JSON.stringify(productStock)
            });
            if (response.ok) {
              
            }
          } else {
            // notify error
          }
        }
      }
      const responseHistorial = await fetch(`api/HistorialOrden`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ ordenId: orderId, faseId: 1, inicio: dateDB })
      });
      if (responseHistorial.ok) {
        // Show pop up with order id
        setOrderCode(orderId);
      }
    }
    // Error to add order
  }

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md mx-md-3 card">
          <div className="row card-head">
            <h3 className="d-flex justify-content-center text-center mt-2">Información General de la Orden</h3>
          </div>
          <div className="row mt-2 card-body">
            <ul className="list-group list-group-flush rounded">
              <li className="list-group-item">Fecha de creación: {date}</li>
              <li className="list-group-item">Responsable de la orden: {userName}</li>
              {
                clientId !== null ?
                  <li className="list-group-item">Cliente: {clientName}</li>
                  :
                  <></>
              }
              <form id="order-form" onSubmit={handleSubmit} >
                {
                  clientId === null && selectedClient === null ?
                    <div className="row mt-3">
                      <h5 className="mt-2 mb-4 mx-2 d-flex justify-content-start">Selección del cliente: </h5>
                      <MatchingClientInput clientInput={clientInput} handler={handleClientInput} />
                      {
                        matchingClients.length === 0 && clientInput !== "" ?
                          <label>No se encontró el cliente</label>
                          :
                          matchingClients.length !== 0 && clientInput !== "" ?
                            <MatchingClientList clients={matchingClients} handleSelectedClient={handleSelectedClient} />
                            :
                            <></>
                      }
                    </div>
                    :
                    <></>
                }
                {
                  selectedClient !== null ?
                    <SelectedClient client={selectedClient} handler={ handleCancelClient } />
                    :
                    <></>
                }
                <div className="px-2">
                  <h5 className="mt-3 d-flex justify-content-start">Fechas: </h5>
                  <label htmlFor="startDate">Fecha de entrega de la orden</label>
                  <input id="startDate" className="form-control w-50" type="date" value={deliveryDate} onChange={handleDeliveryDate} />

                  <label htmlFor="endDate" className="mt-3">Fecha de recepción de la orden</label>
                  <input id="endDate" className="form-control w-50 mb-4" type="date" value={collectionDate} onChange={handleCollectionDate} />

                  <h5 className="mt-2 mb-2 d-flex justify-content-start">Evento: </h5>
                  <BelongToEvent belongToEvent={belongToEvent} handleBelongToEvent={handleBelongToEvent} eventName={eventName} handleEvent={handleEvent} />
                </div>
              </form>
            </ul>
          </div>
        </div>

        <div className="col-md mt-3 mx-md-3 mt-md-0 card">
          <div className="row card-head">
            <h3 className="mt-2 mb-4 d-flex justify-content-center">Selección de Productos</h3>
          </div>
          <div className="card-body">
            <SearchCriteriaSwitch handle={handleSearchCriteria} />
            <MatchingProductsInput productInput={productInput} handler={handleProductInput} />
            {
              matchingProducts.length === 0 && productInput !== "" ?
                <label>No se encontró el producto</label>
                :
                matchingProducts.length !== 0 && productInput !== "" ?
                  <MatchingProductList products={matchingProducts} cuantity={cuantity} handleCuantity={handleCuantity} handleSelectedProduct={handleSelectedProduct} />
                  :
                  <></>
            }

            {
              selectedProducts.length > 0 ?
                <>
                  <SelectedProductList products={selectedProducts} variable={cuantity} handler={handleDelete} />
                  <div className="container mt-5 mb-5">
                    <label>Costo de la orden: {"\u20A1" + cost}</label>
                  </div>
                </>
                :
                <></>

            }
            {
              deliveryDate === "" || selectedProducts.length === 0 || (selectedClient === null && clientId === null) ?
                <ButtonAddOrder enable={false} />
                :
                <ButtonAddOrder enable={true} orderId={ orderCode } />
            }
          </div>
        </div>
      </div>
    </div>
  );
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

function currentDateFormat() {
  const current = new Date();
  const day = current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const month = (current.getMonth() + 1) < 10 ? "0" + (current.getMonth() + 1) : current.getMonth() + 1;
  const year = current.getFullYear();
  const date = `${day}-${month}-${year}`;

  return date;
}

export default AddOrder;