import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetToken } from "../../../GetToken";
import ListaProductos from "./ListaProductos.js";
import HistorialOrden from "./HistorialOrdenes.js";
import ClienteInfo from "./ClienteInfo.js";
import GraficoOrdenes from "./GraficoOrdenes.js";

import { FaEdit, FaTimes } from "react-icons/fa";

const OrdenInfo = () => {
  const [token, setToken] = useState("");
  // Toma el ID de la orden del URL
  const location = useLocation();
  const ordenId = parseInt(location.pathname.split("/").pop());

  const [orden, setOrden] = useState([]);
  const fetchOrden = async () => {
    try {
      const response = await fetch(`/api/orden/GetOrders`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setOrden(data.filter((d) => d.ordenId === ordenId)[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isOrdenEditable, setIsOrdenEditable] = useState(false);
  const [isOrdenUpdated, setOrdenUpdated] = useState(false);
  const handleEditarOrden = (valor, updated) => {
    setIsOrdenEditable(valor);
    if (typeof updated !== 'undefined') {
      setOrdenUpdated(updated);
    }
  };

  useEffect(() => {
    if (token !== "") {
      // Tomar los datos de todas las ordenes
      fetchOrden();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);

  return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="card">
                <div className="card-body">
                  <h5 class="card-title">Información del Cliente</h5>
                  {
                    orden.length === 0 ?
                      <></>
                      :
                      <ClienteInfo clienteId={orden.clienteId} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Grafico</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body justify-content-between">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title fs-5 text-center mb-0">
                  Lista de productos
                </h5>
                {isOrdenEditable ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary align-items-center me-2"
                      onClick={() => handleEditarOrden(false, true)}
                    >
                      <span className="me-1">Aceptar</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger align-items-center"
                      onClick={() => handleEditarOrden(false, false)}
                    >
                      <span className="me-1">Cancelar</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary align-items-center"
                    onClick={() => handleEditarOrden(true, true)}
                  >
                    <span className="me-1">Editar</span>
                    <FaEdit />
                  </button>
                )}
              </div>
              <div>
                <ListaProductos
                  ordenId={ordenId}
                  isOrden={false}
                  isOrdenEditable={isOrdenEditable}
                  ordenUpdated={isOrdenUpdated}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Historial de orden</h5>
              <HistorialOrden ordenId={ordenId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdenInfo;
