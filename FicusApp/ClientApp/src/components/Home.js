import React, { useEffect } from "react";
import { useState } from "react";
import ComponentReport from "./ComponentReport";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [year] = useState(new Date().getFullYear());
  const [todayOrders, setTodayOrders] = useState([]);
  const navigate = useNavigate();
  const handleEvent = (event) => {
    navigate('/eventos/informacion', { state: event });
  }

  useEffect(() => {
    const getTodayOrders = async () => {
      const response = await fetch("api/orden/GetTodayOrders");
      if (response.ok) {
        const orders = await response.json();
        setTodayOrders(orders);
        const responseH = await fetch("api/HistorialOrden");
        if (responseH.ok) {
          const data = await responseH.json();
          console.log(data);
        }
      }
    }
    getTodayOrders();
  }, [])
  return (
    <div>
      <div className="container py-2">
        <div className="container bg-success px-4 px-lg-5 my-5 py-5">
          <div className="row">
            <div className="col">
              <h1 className="text-center text-light mb-3">Para entregar hoy:</h1>
              {
                todayOrders.length > 0 ?
                  <table className="table table-hover">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="text-center text-dark">
                          ID Orden
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Cliente
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Evento
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-light">
                      {
                        todayOrders.map((order) => (
                          <tr key={order.ordenId}>
                            <th scope="row" className="text-center">
                              <Link to={`/ordenes/${order.ordenId}`}>{order.ordenId}</Link>
                            </th>
                            <td className="text-center">{order.cliente.nombreEmpresa}</td>
                            <th scope="row" className="text-center">
                              {
                                order.evento !== null ?
                                  <a className="link" type="button" onClick={() => handleEvent(order.evento)}>
                                    {order.evento.nombreEvento}
                                  </a>
                                  :
                                  <></>
                              }

                            </th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                :
                  <h4 className="text-light text-center mb-5">No hay ordenes asignadas para hoy</h4>
              }
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col">
                        <h1 className="text-light text-center mb-3">Reporte Huella Ambiental</h1>
                      </div>
                    </div>
                    <ComponentReport parametro={`api/reporte/GetAnnualEnvironmentalReport/${year}`} label="Gramos" />
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col">
                        <h1 className="text-light text-center mb-3">Reporte Cantidad Ordenes</h1>
                      </div>
                    </div>
                    <ComponentReport parametro={`api/reporte/GetAnnualOrderReport/${year}`} label="Cantidad" />
                  </div>
                </div>
                <button className="carousel-control-prev btn btn-info" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next btn btn-info" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

export function currentDateFormat() {
  const current = new Date();
  const day = current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const month = (current.getMonth() + 1) < 10 ? "0" + (current.getMonth() + 1) : current.getMonth() + 1;
  const year = current.getFullYear();
  const date = `${day}-${month}-${year}`;

  return date;
}
