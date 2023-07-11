import React, { useState, useEffect } from "react";
import { formatDate, getFaseBadge, calcularDuracion } from "./utils.js";
import { GetToken } from "../../../GetToken.js";

const HistorialOrdenes = ({ ordenId }) => {
  const [token, setToken] = useState("");
  const [historial, setHistorial] = useState([]);
  const [fase, setFase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await GetToken();
        setToken(responseToken);

        const responseHistorial = await fetch(`/api/historialorden/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${responseToken}`,
          },
        });
        const historialData = await responseHistorial.json();
        setHistorial(historialData.filter((d) => d.ordenId === ordenId));

        const responseFase = await fetch(`/api/fase/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${responseToken}`,
          },
        });
        const faseData = await responseFase.json();
        setFase(faseData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Fase</th>
            <th scope="col">Inicio</th>
            <th scope="col">Duración</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((h) => (
            <tr key={h.id}>
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
