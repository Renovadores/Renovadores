import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from "./Input";
import InputInt from "./InputInt";
import CheckBox from "./CheckBox";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";

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


    // Edit Client
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(Date, SKU, name, color, description, dimentions, bowlWeight, notReusable, comercialP, retailP, category, family);
        const response = await fetch("api/cliente/EditCliente", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ fecha_Agregado: Date, color: color, sku: SKU, name: name, descripcion: description, dimensiones: dimentions, peso_recipiente: bowlWeight, peso_desechable: notReusable, alquiler_comercios: comercialP, alquiler_retail: retailP, category: category, family: family })
        });
        if (response.ok) {
            //handleCancel();
            getProduct();
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
                                    <div className="offcanvas-body">
                                        <form onSubmit={handleSubmit}>
                                            <Input variable={SKU} handler={handleChangeSKU} text="SKU" />
                                            <Input variable={name} handler={handleChangeName} text="Nombre" />
                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput" className="form-label">Agregado el: {date}</label>
                                            </div>
                                            <Input variable={description} handler={handleChangeDescription} text="Descripción" />
                                            <Input variable={dimentions} handler={handleChangeDimentions} text="Dimensiones" />
                                            <InputInt variable={bowlWeight} handler={handleChangeBowl_Weight} text="Peso de Recipiente" />
                                            <InputInt variable={notReusable} handler={handleChangeNo_Reusable} text="Peso Desechable" />
                                            <InputInt variable={alquiler_comercios} handler={handleChangeAlquiler_Comercios} text="Precio Comercio" />
                                            <InputInt variable={alquiler_retail} handler={handleChangeAlquiler_Retail} text="Precio Retail" />

                                            <SelectCategory variable={category} handler={handleChangeCategory} />
                                            <SelectFamily variable={family} handler={handleChangeFamily} />
                                            <SelectColor variable={color} handler={handleChangeColor} />

                                            <div className="row">
                                                <div className="col-6 d-flex justify-content-center">
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={getProducts} >Agregar</button>
                                                </div>
                                                <div className="col-6 d-flex justify-content-center">
                                                    <button className="btn btn-danger" type="button" onClick={handleCancel} data-bs-dismiss="offcanvas">Cancelar</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
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
        );
    }
}
export default ProductInformation;
