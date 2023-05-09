import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ProductInformation() {
  const location = useLocation();
  // get id and product name sent by navigate hook in Stock.js
    const productId = location.state;
    const [productInfo, setInfo] = useState("");
    const getProduct = async () => {
        const response = await fetch(`api/producto/GetProducto/${productId}`);
        if (response.ok) {
            const data = await response.json();
            setInfo(data);
            console.log(data);
        } else {
            console.log(response.text);
        }
    }

    useEffect(() => {
        async function getProduct() {
            const response = await fetch(`api/producto/GetProducto/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setInfo(data);

            } else {
                console.log(response.text);
            }
        }
        getProduct();
    }, []);

    const addDefaultEditForm = (data) => {
        //setCompany(data.nombre);
        setSKU(data.productId);
        setName(data.name);
        setColor(data.Color);
        setDescription(data.descripcion);
        setDimentions(data.dimensiones);
        setBowlWeight(data.peso_recipiente);
        setNotReusable(data.peso_desechable);
        setComercialP(data.Alquiler_Comercios);
        setRetailP(data.Alquiler_Retail);
        setCategory(data.Categoria);
        setFamily(data.Familia);
        setImage(data.Imagen);
    }

    const [SKU, setSKU] = useState("");
    const handleChangeSKU = (event) => {
        setSKU(event.target.value)
    }

    const [name, setName] = useState("");
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const [color, setColor] = useState("");
    const handleChangeColor = (event) => {
        setColor(event.target.value)
    }

    const [description, setDescription] = useState("");
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const [dimentions, setDimentions] = useState("");
    const handleChangeDimentions = (event) => {
        setDimentions(event.target.value)
    }

    const [bowlWeight, setBowlWeight] = useState("");
    const handleChangeBowlWeight = (event) => {
        setBowlWeight(event.target.value)
    }

    const [notReusable, setNotReusable] = useState("");
    const handleChangeNotReusable = (event) => {
        setNotReusable(event.target.value)
    }

    const [comercialP, setComercialP] = useState("");
    const handleChangeComercialP = (event) => {
        setComercialP(event.target.value)
    }

    const [retailP, setRetailP] = useState("");
    const handleChangeRetailP = (event) => {
        setRetailP(event.target.value)
    }

    const [category, setCategory] = useState("");
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    const [family, setFamily] = useState("");
    const handleChangeFamily = (event) => {
        setFamily(event.target.value)
    }

    const [image, setImage] = useState("");
    const handleChangeImage = (event) => {
        setImage(event.target.value)
    }

  return (
      <div className="container" >
          <div className="card m-3 mt-5" >
              <div className="card-body">
                  <div className="row align-items-center">
                      <div className="col-10">
                          <h5 className="card-title"> {productInfo.nombre} </h5>
                      </div>
                      <div className="col-2">
                          <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                              Editar
                          </button>
                          <div className="offcanvas offcanvas-start " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                              <div className="offcanvas-header">
                                  <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del producto</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">SKU: {productInfo.SKU} </li>
                  <li className="list-group-item">nombre: {productInfo.nombre} </li>
                  <li className="list-group-item">Color: {productInfo.color} </li>
                  <li className="list-group-item">Descripción: {productInfo.descripcion} </li>
                  <li className="list-group-item">Dimensiones: {productInfo.dimensiones} </li>
                  <li className="list-group-item">Familia: {productInfo.familia} </li>
                  <li className="list-group-item">Categoria: {productInfo.categoria} </li>
                  <li className="list-group-item">Imagen: {productInfo.imagen} </li>
              </ul>
          </div>
      </div>
  );
}

export default ProductInformation;
