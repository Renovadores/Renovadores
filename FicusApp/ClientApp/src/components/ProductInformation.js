import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import Input from "./Input";
import InputInt from "./InputInt";
import CheckBox from "./CheckBox";
import { GetToken } from "../GetToken";
import SelectColor from "./SelectColor";
import SelectCategory from "./SelectCategory";
import SelectFamily from "./SelectFamily";
import { useParams, useLocation, Link } from "react-router-dom";
import InputDelete from "./InputDelete";

function ProductInformation() {
    const [token, setToken] = useState("");
    const params = useParams();
    // get info from URL
    const ProductoId = params.ProductoId;
    const [productInfo, setInfo] = useState("");
    const getProduct = async () => {
        const responseProduct = await fetch(`api/producto/GetProducto/${ProductoId}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
      if (token !== "") {
        getProduct();
      } else {
        const getToken = async () => {
          const dbToken = await GetToken();
          setToken(dbToken);
        }
        getToken();
      }
    }, [token]);

    const [productoId, setProductoId] = useState("");
    const handleChangeProductoId = (event) => {
        setProductoId(event.target.value);
    };

    const [nombre, setNombre] = useState("");
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const [colorId, setColorId] = useState("");
    const handleChangeColorId = (event) => {
        setColorId(event.target.value);
    };

    const [descripcion, setDescripcion] = useState("");
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const [dimensiones, setDimensiones] = useState("");
    const handleChangeDimensiones = (event) => {
        setDimensiones(event.target.value);
    };

    const [pesoRecipiente, setPesoRecipiente] = useState("");
    const handleChangePesoRecipiente = (event) => {
        setPesoRecipiente(event.target.value);
    };

    const [pesoDesechable, setPesoDesechable] = useState("");
    const handleChangePesoDesechable = (event) => {
        setPesoDesechable(event.target.value);
    };

    const [alquilerComercios, setAlquilerComercios] = useState("");
    const handleChangeAlquilerComercios = (event) => {
        setAlquilerComercios(event.target.value);
    };

    const [alquilerRetail, setAlquilerRetail] = useState("");
    const handleChangeAlquilerRetail = (event) => {
        setAlquilerRetail(event.target.value);
    };

    const [categoriaId, setCategoriaId] = useState("");
    const handleChangeCategoriaId = (event) => {
        setCategoriaId(event.target.value);
    };

    const [familiaId, setFamiliaId] = useState("");
    const handleChangeFamiliaId = (event) => {
        setFamiliaId(event.target.value);
    };

    const [image, setImage] = useState("");
    const handleChangeImage = (event) => {
        setImage(event.target.value);
    };
    const [descontinuado, setDescontinuado] = useState(1);
    const handleChangeDescontinuado = (event) => {
        setDescontinuado(event.target.value);
    };
    const [totalExistente, setTotalExistente] = useState(1);
    const handleChangeTotalExistente = (event) => {
        setTotalExistente(event.target.value);
    };
    const [enUso, setEnUso] = useState(1);
    const handleChangeEnUso = (event) => {
        setEnUso(event.target.value);
    };
    const [disponible, setDisponible] = useState(1);
    const handleChangeDisponible = (event) => {
        setDisponible(event.target.value);
    };
    const [noDevueltos, setNoDevueltos] = useState(1);
    const handleChangeNoDevueltos = (event) => {
        setNoDevueltos(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(
            productoId,
            nombre,
            colorId,
            descripcion,
            dimensiones,
            pesoRecipiente,
            pesoDesechable,
            alquilerComercios,
            alquilerRetail,
            categoriaId,
            familiaId,
        );
        const currentToken = await GetToken();
        const response = await fetch("api/producto/EditProducto", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({
              colorId: colorId,
              productoId: productoId,
              nombre: nombre,
              descripcion: descripcion,
              dimensiones: dimensiones,
              pesoRecipiente: pesoRecipiente,
              pesoDesechable: pesoDesechable,
              alquilerComercios: alquilerComercios,
              alquilerRetail: alquilerRetail,
              categoriaId: categoriaId,
              familiaId: familiaId,
          }),
        });
        if (response.ok) {
          if (currentToken === token) {
            getProduct();
          } else {
            setToken(currentToken);
          }
        }
    };
    function irASeccionProductos() {
        window.location.href = "/productos";
    }
    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        console.log(
            productoId,
            nombre,
            colorId,
            descripcion,
            dimensiones,
            pesoRecipiente,
            pesoDesechable,
            alquilerComercios,
            alquilerRetail,
            categoriaId,
            familiaId,
            descontinuado
        );
        const currentToken = await GetToken();
        const response = await fetch("api/producto/DeleteProducto", {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({
                colorId: colorId,
                productoId: productoId,
                nombre: nombre,
                descripcion: descripcion,
                dimensiones: dimensiones,
                pesoRecipiente: pesoRecipiente,
                pesoDesechable: pesoDesechable,
                alquilerComercios: alquilerComercios,
                alquilerRetail: alquilerRetail,
                categoriaId: categoriaId,
                familiaId: familiaId,
                descontinuado: descontinuado,
            }),
        });
        console.log(response);

        if (response.ok) {
          irASeccionProductos();
        }
    };

    const addDefaultEditForm = (data) => {
        setProductoId(data.productoId);
        setNombre(data.nombre);
        setColorId(data.colorId);
        setDescripcion(data.descripcion);
        setDimensiones(data.dimensiones);
        setPesoRecipiente(data.pesoRecipiente);
        setPesoDesechable(data.pesoDesechable);
        setAlquilerComercios(data.alquilerComercios);
        setAlquilerRetail(data.alquilerRetail);
        setCategoriaId(data.categoriaId);
        setFamiliaId(data.familiaId);
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
                            <div className="col-sm-1 col-md-1  d-flex my-1 my-md-2">
                                <button
                                    className="btn btn-danger text-light"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasWithBothOptions2"
                                    aria-controls="offcanvasWithBothOptions"
                                >
                                    Eliminar
                                </button>

                                <div
                                    className="offcanvas offcanvas-start "
                                    data-bs-scroll="true"
                                    tabIndex="-1"
                                    id="offcanvasWithBothOptions2"
                                    aria-labelledby="offcanvasWithBothOptionsLabel"
                                >
                                    <div className="offcanvas-header">
                                        <h5
                                            className="offcanvas-title"
                                            id="offcanvasWithBothOptionsLabel"
                                        >
                                            Eliminar
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="offcanvas"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        Estas seguro que deseas eliminar este producto?
                                        &#8205; &#8205; &#8205; &#8205; &#8205;&#8205;&#8205; &#8205;
                                        <form onSubmit={handleSubmitDelete}>
                                        <div className="row">
                                                <div className="col-6 d-flex justify-content-center">                                                   
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" >Eliminar</button>
                                            </div>
                                                <div className="col-6 d-flex justify-content-center">
                                                        <button className="btn btn-danger text-light" type="button" onClick={() => addDefaultEditForm(productInfo)} data-bs-dismiss="offcanvas">Cancelar</button>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>  
                                </div>
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

                                        <Input variable={nombre} handler={handleChangeNombre} text="Nombre" />
                                        <div className="mb-3">
                                        </div>
                                        <Input variable={descripcion} handler={handleChangeDescripcion} text="Desripcion" />
                                        <div className="mb-3">
                                        </div>
                                        <Input variable={dimensiones} handler={handleChangeDimensiones} text="Dimensiones" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={pesoRecipiente} handler={handleChangePesoRecipiente} text="Peso de Recipiente" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={pesoDesechable} handler={handleChangePesoDesechable} text="Peso Desechable" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={alquilerComercios} handler={handleChangeAlquilerComercios} text="Precio Comercio" />
                                        <div className="mb-3">
                                        </div>
                                        <InputInt variable={alquilerRetail} handler={handleChangeAlquilerRetail} text="Precio Retail" />
                                        <div className="mb-3">
                                        </div>
                                        <div className="mb-3">
                                        </div>
                                        <SelectCategory variable={categoriaId} handler={handleChangeCategoriaId} />
                                        <SelectFamily variable={familiaId} handler={handleChangeFamiliaId} />
                                        <SelectColor variable={colorId} handler={handleChangeColorId} />

                                        <div className="row">
                                            <div className="col-6 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" >Agregar</button>
                                            </div>
                                            <div className="col-6 d-flex justify-content-center">
                                                <button className="btn btn-danger text-light" type="button" onClick={() => addDefaultEditForm(productInfo)} data-bs-dismiss="offcanvas">Cancelar</button>
                                            </div>
                                        </div>
                                        </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Producto ID: {productoId} </li>
                    <li className="list-group-item">
                        Color: {productInfo.colorId} </li>
                    <li className="list-group-item">
                        Descripcion: {productInfo.descripcion}{" "}</li>
                    <li className="list-group-item">
                        Dimensiones: {productInfo.dimensiones}{" "}</li>
                    <li className="list-group-item">
                        Peso: {productInfo.pesoRecipiente} </li>
                    <li className="list-group-item">
                        Peso sustituido: {productInfo.pesoDesechable} </li>
                    <li className="list-group-item">
                        Precio comercios: {productInfo.alquilerComercios} </li>
                    <li className="list-group-item">
                        Precio retail: {productInfo.alquilerRetail} </li>
                    <li className="list-group-item">
                        Familia: {productInfo.familiaId} </li>
                    <li className="list-group-item">
                        Categoria: {productInfo.categoriaId}{" "}</li>
                    <li className="list-group-item">
                            Imagen: {productInfo.imagen} </li>
                        <li className="list-group-item">
                            Total Producto: {productInfo.totalExistente} </li>
                        <li className="list-group-item">
                            En Uso: {productInfo.enUso} </li>
                        <li className="list-group-item">
                            Disponibles: {productInfo.disponible} </li>
                        <li className="list-group-item">
                            No Devueltos: {productInfo.noDevueltos} </li>
                    </ul>
                </div>
            </div>
          </div>
  );
}

export default ProductInformation;
