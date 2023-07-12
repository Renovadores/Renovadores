import React, { useState, useEffect, useRef } from "react";
import { GetToken } from "../../../GetToken";

const ListaProductos = ({
  ordenId,
  isOrden,
  isOrdenEditable,
  ordenUpdated,
  onDetalleUpdate,
  token,
}) => {
  const [newtoken, setToken] = useState("");
  const [detalle, setDetalle] = useState([]);
  const [producto, setProducto] = useState([]);

  const fetchDetalle = async () => {
    try {
      const response = await fetch(`/api/detalle/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setDetalle(data.filter((d) => d.ordenId === ordenId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducto = async () => {
    try {
      const response = await fetch("api/producto/GetProducts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDetalle = async (productoId) => {
    const objetoDetalle = {
      ordenId: ordenId,
      productoId: productoId,
      pedidos: inputValues[productoId].pedidos,
      sinUsar: inputValues[productoId].pedidos,
      usados: inputValues[productoId].usados,
      devueltos: inputValues[productoId].devueltos,
      descuento: inputValues[productoId].descuento,
    };

    try {
      const response = await fetch(`api/Detalle/${ordenId}/${productoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objetoDetalle),
      });

      if (response.ok) {
        if(onDetalleUpdate){
          onDetalleUpdate()
        }
        // Reinicia el estado para volver a actualizar
        fetchDetalle();
      } else {
        console.error("Error al actualizar el detalle:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (token !== "") {
      if (!isOrdenEditable || ordenUpdated) {
        fetchDetalle();
        fetchProducto();
      }
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token, isOrdenEditable]);

  useEffect(() => {
    if (token !== "") {
      if (ordenUpdated && !isOrdenEditable) {
        for (const id in inputValues) {
          updateDetalle(id);
        }
      }
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token, ordenUpdated, isOrdenEditable]);

  useEffect(() => {
    if (token !== "") {
      if (!ordenUpdated) {
        setInputValues((prevInputValues) => {
          const updatedInputValues = {};

          detalle.forEach((detalle) => {
            updatedInputValues[detalle.productoId] = {
              pedidos: detalle.pedidos,
              usados: detalle.usados,
              devueltos: detalle.devueltos,
              descuento: detalle.descuento,
            };
          });

          return updatedInputValues;
        });
      }
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token, ordenUpdated, detalle]);

  const inputRef = useRef(null);
  const handleInputChange = (event, productoId) => {
    if (event.key === "Enter" || event.key === "Tab") {
      if (isOrden) {
        const { name, value } = event.target;

        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [productoId]: {
            ...prevInputValues[productoId],
            [name]: value,
          },
        }));
        updateDetalle(productoId);
      }
      event.target.blur();
      event.preventDefault();
    }
  };

  return (
    <div className="list-group">
      {detalle.map((detalle) => {
        const { productoId, pedidos, usados, devueltos, descuento } = detalle;
        const productoValues = inputValues[productoId] || {};
    const key = `${detalle.productoId}-${detalle.ordenId}`;
        return (
          <li
            key={key}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {producto.find((p) => p.productoId === productoId)
                  ?.nombre || "NULL"}
              </h5>
              <span className="medium-text">{productoId}</span>
            </div>

            <div className="input-group flex-column">
              <div className="input-group">
                {[
                  {
                    label: "Pedidos",
                    placeholder: `${pedidos}`,
                    disabled: !isOrdenEditable,
                    name: "pedidos",
                    value: productoValues.pedidos || "",
                  },
                  {
                    label: "Usados",
                    placeholder: `${usados}`,
                    disabled: !isOrden && !isOrdenEditable,
                    name: "usados",
                    value: productoValues.usados || "",
                  },
                  {
                    label: "Devueltos",
                    placeholder: `${devueltos}`,
                    disabled: !isOrdenEditable,
                    name: "devueltos",
                    value: productoValues.devueltos || "",
                  },

                  {
                    label: "Descuento",
                    placeholder: `${descuento}`,
                    disabled: !isOrdenEditable,
                    name: "descuento",
                    value: productoValues.descuento || "",
                  },
                ].map((item, index) => {
                  if (
                    item.label !== "Descuento" ||
                    (item.label === "Descuento" && !isOrden)
                  ) {
                    return (
                      <>
                        <span className="input-group-text" id="addon-wrapping">
                          {item.label}
                        </span>
                        <input
                          type="number"
                          className={item.className || "form-control"}
                          style={{ minWidth: "15%" }}
                          placeholder={item.placeholder}
                          aria-describedby="addon-wrapping"
                          disabled={item.disabled}
                          value={item.value}
                          name={item.name}
                          onChange={(event) => {
                            setInputValues((prevInputValues) => ({
                              ...prevInputValues,
                              [productoId]: {
                                ...prevInputValues[productoId],
                                [item.name]: event.target.value,
                              },
                            }));
                          }}
                          onKeyDown={(event) => {
                            handleInputChange(event, productoId);
                          }}
                          ref={inputRef}
                        />
                        {!isOrden && item.label === "Descuento" && (
                          <span className="input-group-text">%</span>
                        )}
                      </>
                    );
                  } else {
                    return null; // Skip rendering for this specific condition
                  }
                })}

                {isOrden && (
                  <span className="badge text-bg-info d-flex align-items-center">
                    Descuento{" "}
                    {detalle.descuento !== null ? detalle.descuento : 0}%
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};
export default ListaProductos;
