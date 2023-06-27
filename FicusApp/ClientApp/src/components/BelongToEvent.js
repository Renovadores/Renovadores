import { useEffect, useState } from "react";
import { GetToken } from "../GetToken";

function BelongToEvent(props) {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (token !== "") {
      const getEvents = async () => {
        const eventResponse = await fetch("api/evento/GetEventos", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (eventResponse.ok) {
          const data = await eventResponse.json();
          console.log(data)
          setEvents(data);
        }
      }
      getEvents();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);

  return (
    <div>
      <div className={props.belongToEvent === true ? "form-check form-switch" : "form-check form-switch mb-3"}>
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={props.belongToEvent} onChange={props.handleBelongToEvent} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pertenece a un evento</label>
      </div>
      {
        props.belongToEvent === true ?
          <div>
            <label htmlFor="exampleDataList" className="form-label mt-3">Seleccionar evento (Si no existe se genera automáticamente)</label>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={props.eventName} onChange={props.handleEvent} autoComplete="off" list="datalistOptions" />
              <label htmlFor="floatingInput">Nombre del evento</label>
            </div>
            <datalist id="datalistOptions">
              {
                events.map((event, index) => (
                  <option value={event.nombreEvento} key={index} />
                ))
              }
            </datalist>
          </div>
          :
          <>
          </>
      }
    </div>
  );
}
export default BelongToEvent;