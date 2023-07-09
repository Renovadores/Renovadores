import React, { useState, useEffect } from "react";
import { formatDate, getFaseBadge, calcularDuracion } from "./utils.js";
import { GetToken } from "../../../GetToken.js";

const HistorialOrdenes = ({ ordenId }) => {
  const [token, setToken] = useState("");
  const [historial, setHistorial] = useState([]);
  const fetchHistorial = async () => {
    try {
      const response = await fetch(`/api/historialorden/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setHistorial(data.filter((d) => d.ordenId === ordenId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const [fase, setFase] = useState([]);
  const fetchFase = async (faseId) => {
    try {
      const response = await fetch(`/api/fase/`);
      const data = await response.json();
      setFase(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token !== "") {
      fetchHistorial();
      fetchFase();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token]);

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Fase</th>
            <th scope="col">Inicio</th>
            <th scope="col">Duración</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((h) => (
            <tr>
              <td>
                {getFaseBadge({
                  faseId: h.faseId,
                  faseText: fase.find((f) => f.faseId === h.faseId)
                    ?.descripcionEstado,
                })}
              </td>
              <td>{formatDate(h.inicio)}</td>
              <td>{calcularDuracion(h.inicio, h.fin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialOrdenes;
