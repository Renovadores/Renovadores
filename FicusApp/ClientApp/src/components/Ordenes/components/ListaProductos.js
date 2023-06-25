import React, { useState, useEffect } from "react";
import { GetToken } from "../../../GetToken";

const ListaProductos = ({ ordenId }) => {
  const [token, setToken] = useState("");
  const [detalle, setDetalle] = useState([]);
  const [producto, setProducto] = useState([]);

  const fetchDetalle = async () => {
    try {
      const response = await fetch(`/api/detalle/`);
      const data = await response.json();
      setDetalle(data.filter((d) => d.ordenId === ordenId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducto = async () => {
    try {
      const response = await fetch(`/api/producto/GetProducts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token !== "") {
      // Tomar los datos de todas las ordenes
      fetchDetalle();
      fetchProducto();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);
  
  return (
    <div class="list-group">
      {detalle.map((detalle) => (
        <a
          // href="#"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              {producto.find((p) => p.productoId === detalle.productoId)
                ?.nombre || "NULL"}
            </h5>
            <medium>{detalle.productoId}</medium>
          </div>
          <ul class="list-group list-group-horizontal-sm flex-wrap">
            <li class="list-group-item flex-fill">
              <span class="pe-4">Pedidos </span>
              <strong>{detalle.pedidos}</strong>
            </li>
            <li class="list-group-item flex-fill">
              <span class="pe-4">Usados </span>
              <strong>{detalle.usados}</strong>
            </li>
            <li class="list-group-item flex-fill">
              <span class="pe-4">Devueltos </span>
              <strong>{detalle.devueltos}</strong>
            </li>
            <li class="list-group-item flex-fill">
              <span class="badge text-bg-info">
                Descuento {detalle.descuento !== null ? detalle.descuento : 0}%
              </span>
            </li>
          </ul>
        </a>
      ))}
    </div>
  );
};
export default ListaProductos;
