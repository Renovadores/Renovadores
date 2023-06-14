import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ListaProductos from "./ListaProductos.js";
import HistorialOrden from "./HistorialOrdenes.js";
import ClienteInfo from "./ClienteInfo.js";
import GraficoOrdenes from "./GraficoOrdenes.js";

const OrdenInfo = () => {
  // Toma el ID de la orden del URL
  const location = useLocation();
  const ordenId = parseInt(location.pathname.split("/").pop());

  const [orden, setOrden] = useState([]);
  const fetchOrden = async () => {
    try {
      const response = await fetch(`/api/orden/GetOrders`);
      const data = await response.json();
      setOrden(data.filter(d => d.ordenId === ordenId)[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Tomar los datos de todas las ordenes
    fetchOrden();
  }, []);

  return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="card">
                <div className="card-body">
                  <h5 class="card-title">Información del Cliente</h5>
                  <ClienteInfo clienteId={orden.clienteId}/>
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
                <div className="card-body">
                  <h5 class="card-title">Lista de productos</h5>
                  <div>
                    <ListaProductos ordenId={ordenId} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 class="card-title">Historial de orden</h5>
                  <HistorialOrden ordenId={ordenId}/>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};
export default OrdenInfo;
