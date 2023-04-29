import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';

function Clients() {
  // TO-DO fetch data from back-end
  const clients = [
    {
      id: 1,
      name: "Cumpanis"
    },
    {
      id: 2,
      name: "Feria Verde"
    },
    {
      id: 3,
      name: "Cliente 3"
    },
    {
      id: 4,
      name: "Cliente 4"
    },
    {
      id: 5,
      name: "Cliente 5"
    },
    {
      id: 6,
      name: "Cliente 6"
    },
    {
      id: 7,
      name: "Cliente 7"
    },
    {
      id: 8,
      name: "Cliente 8"
    }
  ]

  // When user click on client button, 'navigate hook' redirect him to new page
  const navigate = useNavigate(); // Allows referencinging a specific path defined in AppRoutes
  const handleClick = (clientId, clientName) => {
    navigate('/clientes/informacion', { state: { id: clientId, name: clientName } });
    //second argument allows to pass parameters
  };
  // TO-DO: separate in new components to simplify code
  return (
    <div className="container pt-3">
      <div className="row m-2 mb-4">
        <div className="col-3">
          <h4>Clientes</h4>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <button className="btn btn-success" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Agregar Cliente</button>

          <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del nuevo cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <p>Formulario</p>
              {/* TO-DO: Add form */}
              <button className="btn btn-success">Agregar</button>
            </div>
          </div>

        </div>
        <div className="col-3 d-flex justify-content-begin">
          <button className="btn btn-danger">Eliminar Cliente</button>
        </div>
        <div className="col-3">
          <div className="dropdown d-flex justify-content-end">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filtrar
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Prioridad</a></li>
              <li><a className="dropdown-item" href="#">Fecha</a></li>
              <li><a className="dropdown-item" href="#">Reservaciones</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row m-2 mt-4 d-flex justify-content-center">      
          {
            clients.map((client) => (
              <div className="col-sm-6 col-md-3" key={client.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{client.name}</h5>
                    <p className="card-text">Some info.</p>
                    <button className="btn btn-primary" onClick={() => handleClick(client.id, client.name)}>Ver cliente</button>
                  </div>
                </div>
              </div>
            ))
          }      
      </div>

      <div className="row m-2 mt-4"> 
        <nav aria-label="...">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Clients;