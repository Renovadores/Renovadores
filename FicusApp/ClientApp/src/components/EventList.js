import { useNavigate } from 'react-router-dom';
function EventList(props) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate('/eventos/informacion', { state: event });
  }
  return (
    <div className="row m-2 mt-4">
      {
        props.events.length !== 0 ?
          props.events.map((event) => (
            <div className="col-sm-6 col-md-3 mb-3" key={event.eventoId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{event.nombreEvento}</h5>
                  <p className="card-text utf-8">Ordenes activas: </p>
                  <button className="btn btn-primary" onClick={() => handleClick(event) }>Ver evento</button>
                </div>
              </div>
            </div>
          ))
          :
          <h5 className="d-flex justify-content-center">No se encontraron eventos en la base de datos</h5>
      }
    </div>
  );
}
export default EventList;
