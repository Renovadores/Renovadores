import { useEffect, useState } from 'react';
import { GetToken } from "../GetToken";
import EventList from './EventList';

function Events() {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState("");
  const GetEvents = async () => {
    const eventResponse = await fetch("api/evento/GetEventos", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (eventResponse.ok) {
      var data = await eventResponse.json();
      setEvents(data);
    }
  }

  useEffect(() => {
    if (token !== "") {
      GetEvents();
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
      <div className="row mx-2">
        <h1>Eventos</h1>
      </div>
      <div className="row">
        <EventList events={events} />
      </div>
      
    </div>
  );
}
export default Events;