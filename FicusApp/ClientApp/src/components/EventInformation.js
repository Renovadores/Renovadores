import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetToken } from "../GetToken";
function EventInformation() {
  const location = useLocation();
  const event = location.state;
  const [eventDateList, setEventDateList] = useState([]);
  const [eventsChecked, setEventsChecked] = useState(false);
  const getEventsGroupByDate = async () => {
    const token = await GetToken();
    const eventResponse = await fetch(`api/orden/GetOrdersByDate/${event.eventoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (eventResponse.ok) {
      const events = await eventResponse.json();
      console.log(events);
      setEventDateList(events);
      setEventsChecked(true);
    }
  }
  useEffect(() => {
    getEventsGroupByDate();
  }, [])
  return (
    <div className="container vh-min-100 d-flex justify-content-center">
      {
        eventDateList.length === 0 ?
          <div className="vh-min-100 mx-2 text-center">
            <h1>{event.nombreEvento}</h1>
            {
              eventsChecked ?
                <h3 className="mt-5">El evento no tiene ordenes asignadas</h3>
                :
                <></>
            }
          </div>
          :
          <div>
            <div className="vh-min-100 mx-2 text-center">
              <h1>{event.nombreEvento}</h1>
            </div>
            {
              eventDateList.map((date, index) => (
                <div className="d-flex justify-content-center">
                  <div className="card my-3" style={{ width: 288 }} key={index} >
                    <div className="card-body">
                      <h5 className="card-title">Fecha: {dateFormat(date[0].fechaAlquiler)}</h5>
                      <p className="card-text">Descripcion, lugar y hora.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      {
                        date.map((order) => (
                          <li className="list-group-item" key={order.ordenId}>
                            <div>
                              {order.cliente.nombreEmpresa}
                            </div>

                            <a href={"/ordenes/" + order.ordenId} className="card-link">
                              Orden: {order.ordenId}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
}
export default EventInformation;

function dateFormat(dateDB) {
  var arrayDate = dateDB.split("-");
  const day = arrayDate[2].substring(0, 2);
  const date = day + "-" + arrayDate[1] + "-" + arrayDate[0];

  return date;
}