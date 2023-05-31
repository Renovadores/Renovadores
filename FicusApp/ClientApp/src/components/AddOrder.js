import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MatchingProductsList from "./MatchingProductList";
import MatchingProductsInput from "./MatchingProductsInput";
import SelectedProductList from "./SelectedProductList";

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

  const [stock, setStock] = useState([{ nombre: "Montezuma", sku: "EC-07-1-JA", cantidad: "14", dimensiones: "20x30" }, { nombre: "Montezuma", sku: "EC-07-1-CL", cantidad: "45", dimensiones: "20x30" }, { nombre: "Tapanti", sku: "EC-12-1-CL", cantidad: "20", dimensiones: "20x30" }, { nombre: "Corcovado", sku: "EC-13-1-CL", cantidad: "20", dimensiones: "20x30" }])

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

  const [cost, setCost] = useState(0);

  const handleProductInput = (event) => {
    let input = event.target.value
    console.log(input)
    if (input === "") {
      setMatchingProducts([])
    } else {
      setMatchingProducts(stock.filter(product => product.nombre.indexOf(input) !== -1));
    }
  }

  const handleSelectedProduct = (sku) => {
    //TO-DO: verify if the cuantity is valid and decrease total products
    if (cuantity !== "" && cuantity > 0) {
      console.log(stock.find(product => product.sku === sku));
      var selectedProduct = JSON.parse(JSON.stringify(stock.find(selectedProduct => selectedProduct.sku === sku)));
      selectedProduct.cantidad = cuantity;
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setCost(cost + (cuantity * 1000));
      stock.find(product => product.sku === sku).cantidad -= cuantity;
      console.log(stock);
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
  
  const handleSubmit = () => {
    //TO-DO: add selectedProducts to data base
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

          <MatchingProductsInput handler={handleProductInput} />
          <MatchingProductsList products={matchingProducts} handleCuantity={handleCuantity} handleSelectedProduct={handleSelectedProduct} />

          <h5 className="mt-4">Productos seleccionados:</h5>
          <SelectedProductList products={selectedProducts} variable={cuantity} handler={handleDelete} />
          <div className="row mt-5 mb-1">
            <h5>Costo de la orden: {cost} colones</h5>
          </div>
          <div className="row mx-5 d-flex justify-content-center">
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