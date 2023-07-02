import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { GetToken } from '../GetToken';

function EventList() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate('/eventos/informacion', { state: event });
  }

  const [editable, setEditable] = useState(false);
  const [elementId, setElementId] = useState("");
  const handleEdit = (elementId) => {
    if (editable === false) {
      setElementId(elementId);
    } else {
      setElementId("");
    }
    setEditable(!editable);
  }

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const GetEvents = async () => {
      const currentToken = await GetToken();
      const eventResponse = await fetch("api/evento/GetEventos", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (eventResponse.ok) {
        var data = await eventResponse.json();
        setEvents(data);
      }
    }
    GetEvents();
  }, [editable])

  const [description, setDescription] = useState("");
  const handleEdition = (event) => {
    setDescription(event.target.value);
  }
  const handleDescription = async (event) => {
    event.descripcionEvento = description;
    const currentToken = await GetToken();
    const descriptionResponse = await fetch(`api/evento/EditDescription`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify(event)
    });
    if (descriptionResponse.ok) {
      console.log("Se guardó la descripción del evento")
    }
    setEditable(false);
    setElementId("");
  }
  return (
    <div className="container m-2 mt-4">
      <div className="row">
      {
        events.length !== 0 ?
          events.map((event) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={event.eventoId}>
              <div className="card h-100">
                <div className="container card-body">
                  <div className="row card-title d-flex">
                    <div className="col-9">
                      <h5>{event.nombreEvento}</h5>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                      <div>
                        <span className={editable && elementId === "description" + event.eventoId ? " m-0 btn border border-primary bg-secondary" : " m-0 btn"}
                         onClick={() => handleEdit("description" + event.eventoId)}>
                          <FiEdit />
                        </span>
                      </div>
                    </div>
                  </div>
                  <textarea className={editable && elementId === "description" + event.eventoId ? "card-text utf-8 border border-dark rounded border-2 p-1 overFlow-none w-100" : " p-1 w-100"}
                    onChange={handleEdition}
                    rows="3"
                    readOnly={elementId !== "description" + event.eventoId}
                    style={{ resize: "none", border: "none", outline: "none" }}
                    defaultValue={event.descripcionEvento} />
                  {
                    editable && elementId === "description" + event.eventoId ?
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-info" onClick={()=>handleDescription(event)}>
                          Guardar
                        </button>
                      </div>
                      :
                      <></>
                  }
                </div>
                <div className="card-footer d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={() => handleClick(event)}>Ver evento</button>
                </div>
              </div>
            </div>
          ))
          :
          <h5 className="d-flex justify-content-center">No se encontraron eventos en la base de datos</h5>
      }
      </div>
    </div>
  );
}
export default EventList;
