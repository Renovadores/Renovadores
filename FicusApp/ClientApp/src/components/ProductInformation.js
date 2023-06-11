import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import Input from "./Input";
import InputInt from "./InputInt";
import CheckBox from "./CheckBox";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";
import { useParams, useLocation, Link } from "react-router-dom";

function ProductInformation() {
    const params = useParams();
    // get info from URL
    const SKU = params.SKU;
    const [productInfo, setInfo] = useState("");
    const getProduct = async () => {
        const responseProduct = await fetch(`api/producto/GetProducto/${SKU}`);
        if (responseProduct.ok) {
            const data = await responseProduct.json();
            setInfo(data);
            console.log(data);
            addDefaultEditForm(data);
        } else {
            console.log(responseProduct.text);
        }
    };
    // this method allows to auto call getProduct when page is started
    useEffect(() => {
        getProduct();
    }, []);



    const [sku, setSKU] = useState("");
    const handleChangeSKU = (event) => {
        setSKU(event.target.value);
    };

    const [nombre, setNombre] = useState("");
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const [color, setColor] = useState("");
    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };

    const [descripcion, setDescripcion] = useState("");
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const [dimensiones, setDimensiones] = useState("");
    const handleChangeDimensiones = (event) => {
        setDimensiones(event.target.value);
    };

    const [peso_recipiente, setPeso_recipiente] = useState("");
    const handleChangePeso_recipiente = (event) => {
        setPeso_recipiente(event.target.value);
    };

    const [peso_desechable, setPeso_desechable] = useState("");
    const handleChangePeso_desechable = (event) => {
        setPeso_desechable(event.target.value);
    };

    const [alquiler_comercios, setAlquiler_comercios] = useState("");
    const handleChangeAlquiler_comercios = (event) => {
        setAlquiler_comercios(event.target.value);
    };

    const [alquiler_retail, setAlquiler_retail] = useState("");
    const handleChangeAlquiler_retail = (event) => {
        setAlquiler_retail(event.target.value);
    };

    const [categoria, setCategoria] = useState("");
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const [familia, setFamilia] = useState("");
    const handleChangeFamilia = (event) => {
        setFamilia(event.target.value);
    };

    const [image, setImage] = useState("");
    const handleChangeImage = (event) => {
        setImage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(
            sku,
            nombre,
            color,
            descripcion,
            dimensiones,
            peso_recipiente,
            peso_desechable,
            alquiler_comercios,
            alquiler_retail,
            categoria,
            familia
        );
        const response = await fetch("api/producto/EditProducto", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                color: color,
                sku: sku,
                nombre: nombre,
                descripcion: descripcion,
                dimensiones: dimensiones,
                peso_recipiente: peso_recipiente,
                peso_desechable: peso_desechable,
                alquiler_comercios: alquiler_comercios,
                alquiler_retail: alquiler_retail,
                categoria: categoria,
                familia: familia,
            }),
        });
        console.log(response);

        if (response.ok) {
            getProduct();
        }
    };

    const addDefaultEditForm = (data) => {
        setSKU(data.sku);
        setNombre(data.nombre);
        setColor(data.color);
        setDescripcion(data.descripcion);
        setDimensiones(data.dimensiones);
        setPeso_recipiente(data.peso_recipiente);
        setPeso_desechable(data.peso_desechable);
        setAlquiler_comercios(data.alquiler_Comercios);
        setAlquiler_retail(data.alquiler_Retail);
        setCategoria(data.categoria);
        setFamilia(data.familia);
        setImage(data.Imagen);
    };

    return (
        <div className="container">
            <div className="card m-3 mt-5">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8 col-xs-2 px-2">
                            <h5 className="card-title"> {productInfo.nombre} </h5>
                        </div>
                        <div className="col-8 col-xs-2 px-2">
                            <Link to={`/inventario`}>
                            <button
                                className="btn btn-primary"
                                type="button"
                                >
                            
                                Ver en inventario
                                </button>
                            </Link>
                            </div>
                            <div className="col-2 col-xs-2 px-2">
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasWithBothOptions"
                                aria-controls="offcanvasWithBothOptions"
                            >
                                Editar
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
                                        Informacion del producto
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
                                        <Input variable={sku} handler={handleChangeSKU} text="SKU" />
                                        <div className="mb-3">
                                        </div>
                                        <Input variable={nombre} handler={handleChangeNombre} text="Nombre" />
                                        <div className="mb-3">
                                        </div>
                                        <Input variable={descripcion} handler={handleChangeDescripcion} text="Desripcion" />
                                        <div className="mb-3">
                                        </div>
                                        <Input variable={dimensiones} handler={handleChangeDimensiones} text="Dimensiones" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={peso_recipiente} handler={handleChangePeso_recipiente} text="Peso de Recipiente" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={peso_desechable} handler={handleChangePeso_desechable} text="Peso Desechable" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={alquiler_comercios} handler={handleChangeAlquiler_comercios} text="Precio Comercio" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={alquiler_retail} handler={handleChangeAlquiler_retail} text="Precio Retail" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={peso_desechable} handler={handleChangePeso_desechable} text="Peso Desechable" />
                                        <div className="mb-3">
                                        </div>
                                        <SelectCategory variable={categoria} handler={handleChangeCategoria} />
                                        <SelectFamily variable={familia} handler={handleChangeFamilia} />
                                        <SelectColor variable={color} handler={handleChangeColor} />

                                        <div className="row">
                                            <div className="col-6 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={getProduct} >Agregar</button>
                                            </div>
                                            <div className="col-6 d-flex justify-content-center">
                                                <button className="btn btn-danger" type="button" onClick={() => addDefaultEditForm(productInfo)} data-bs-dismiss="offcanvas">Cancelar</button>
                                            </div>
                                        </div>
                                        </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        SKU: {sku} </li>
                    <li className="list-group-item">
                        Color: {productInfo.color} </li>
                    <li className="list-group-item">
                        Descripcion: {productInfo.descripcion}{" "}</li>
                    <li className="list-group-item">
                        Dimensiones: {productInfo.dimensiones}{" "}</li>
                    <li className="list-group-item">
                        Peso: {productInfo.peso_recipiente} </li>
                    <li className="list-group-item">
                        Peso sustituido: {productInfo.peso_desechable} </li>
                    <li className="list-group-item">
                        Precio comercios: {productInfo.alquiler_Comercios} </li>
                    <li className="list-group-item">
                        Precio retail: {productInfo.alquiler_Retail} </li>
                    <li className="list-group-item">
                        Familia: {productInfo.familia} </li>
                    <li className="list-group-item">
                        Categoria: {productInfo.categoria}{" "}</li>
                    <li className="list-group-item">
                        Imagen: {productInfo.imagen} </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductInformation;