import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import BelongToEvent from "./BelongToEvent";
import ButtonAddOrder from "./ButtonAddOrder";
import MatchingProductList from "./MatchingProductList";
import MatchingProductsInput from "./MatchingProductsInput";
import SearchCriteriaSwitch from "./SearchCriteriaSwitch";
import SelectedProductList from "./SelectedProductList";

function AddOrder() {
  const location = useLocation();
  const [clientId] = useState(location.state);

  const [currentUserId] = useState(JSON.parse(sessionStorage.getItem('userId')));
  const [userName, setUserName] = useState("");
  
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
    const getUserName = async () => {
      const response = await fetch(`api/usuario/GetUser/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        setUserName(data.nombre);
      } else {
        console.log(response.text);
      }
    }
    getUserName();
    generateIdOrder();
  }, [currentUserId, userName])

  const [matchingProducts, setMatchingProducts] = useState([])

  const [selectedProducts, setSelectedProducts] = useState([])

  const date = currentDateFormat();
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

  const getMatchProducts = async (input) => {
    //get some products from stock that match with input
    const responseInventory = await fetch(`api/producto/GetMatchProducts/${input}/${searchByCodeOrName}`)
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
        selectedProductInfo = { ordenId: orderId, productoId: sku, nombre: productName, pedidos: cuantity, dimensiones: productSize, alquilerRetail: productCost }
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

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    var eventId = null;
    if (eventName !== "") {
      // verify the event doesn�t exist
      const responseEventExists = await fetch(`api/evento/findEvento/${eventName}`)
      if (responseEventExists.ok) {
        const data = await responseEventExists.json();
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
          if (responseEvent.ok) {

          }
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
        var productId = selectedProducts[i].productoId;
        var pedidos = selectedProducts[i].pedidos;
        var responseDetail = await fetch("api/detalle/AddDetalle", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ ordenId: orderId, productoId: productId, pedidos: pedidos, sinUsar: 0, usados: 0, devueltos: 0, descuento: 0 })
        });
        if (responseDetail.ok) {
          // Go to stock and reduce product cuantity
          const responseStock = await fetch(`api/producto/GetProducto/${productId}`);
          if (responseStock.ok) {
            const productStock = await responseStock.json();
            productStock.disponible -= pedidos;
            productStock.enUso = parseInt(productStock.enUso) + parseInt(pedidos);
            console.log(productStock);
            // Edit record
            const response = await fetch("api/producto/EditProducto", {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
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
              <li className="list-group-item">Responsable de la orden: {userName}</li>
              <li className="list-group-item"></li>
            </ul>
          </div>
          <div className="row">
        
            <form id="order-form" onSubmit={handleSubmit} >
              
              <label htmlFor="startDate" className="mt-3">Fecha de entrega de la orden</label>
              <input id="startDate" className="form-control w-50" type="date" value={deliveryDate} onChange={handleDeliveryDate} autoFocus />

              <label htmlFor="endDate" className="mt-3">Fecha de recepcion de la orden</label>
              <input id="endDate" className="form-control w-50 mb-4" type="date" value={collectionDate} onChange={handleCollectionDate} />

              <BelongToEvent belongToEvent={belongToEvent} handleBelongToEvent={handleBelongToEvent} eventName={eventName} handleEvent={handleEvent} />
            </form>
          </div>
        </div>

        <div className="col-md">
          <div className="row">
            <h3 className="mb-4 d-flex justify-content-center">Seleccion de Productos</h3>
          </div>

          <SearchCriteriaSwitch handle={handleSearchCriteria} />
          <MatchingProductsInput productInput={productInput} handler={handleProductInput} />
          {
            matchingProducts.length === 0 && productInput !== "" ?
              <label>No se encontro el producto</label>
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
            deliveryDate === "" || selectedProducts.length === 0 ?
              <ButtonAddOrder enable= {false} />
              :
              <ButtonAddOrder enable= {true} />
          }
          
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