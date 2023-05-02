import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

function Clients() {
  // get clients from data base
  const [clients, setClients] = useState([]);
  const getClients = async () => {
    const response = await fetch("api/cliente/GetClientes");
    if (response.ok) {
      const data = await response.json();
      setClients(data);
    } else {
      console.log("error");
    }
  }
  // this method allows to auto call getClients when page is started
  useEffect(() => {
    getClients();
    console.log(clients);
  }, []);

  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`; 
  const dateDB = dateFormat();

  // store form information in variables
  const [company, setCompany] = useState("");
  const handleChangeCompany = (event) => {
    setCompany(event.target.value)
  }
  useEffect(() => {
    console.log(company);
  }, [company]);

  const [personInCharge, setPersonInCharge] = useState("Alejandro");
  const handleChangePersonInCharge = (event) => {
    setPersonInCharge(event.target.value)
  }
  useEffect(() => {
    console.log(personInCharge);
  }, [personInCharge]);

  const [priority, setPriority] = useState("Baja");
  const handleChangePriority = (event) => {
    setPriority(event.target.value)
  }
  useEffect(() => {
    console.log(priority);
  }, [priority]);

  const [state, setState] = useState("Clientes");
  const handleChangeState = (event) => {
    setState(event.target.value)
  }
  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleCancel = () => {
    setCompany("");
    // TO-DO: clear info for the other fields 
  }

  //Add client to data base
  const handleSubmit = async (event) => {
    //event.preventDefault();
    const response = await fetch("api/cliente/AddCliente", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ empresa: company, agregado: dateDB, responsable: personInCharge, prioridad: priority })
    });

    if (response.ok) {
      handleCancel();
    }
  }


  // When user click on client button, 'navigate hook' redirect him to new page
  const navigate = useNavigate(); // Allows referencing a specific path defined in AppRoutes
  const handleClick = (clientId, clientName) => {
    navigate('/clientes/informacion', { state: { id: clientId, name: clientName } });
    //second argument allows to pass parameters
  };

  // TO-DO: separate in new components to simplify code
  return (
    <div className="container pt-3">
      <div className="row m-2 mb-4">
        <h4>Clientes</h4>
      </div>
      <div className="row m-2 mb-5">
        <div className="col-sm-6 col-md-3 d-flex my-2 my-md-0">
          <button className="btn btn-success" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            Agregar Cliente
          </button>
          <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del nuevo cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleCancel}></button>
            </div>
            <div className="offcanvas-body">
              <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={company} onChange={handleChangeCompany}  />
                  <label htmlFor="floatingInput">Empresa</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Agregado el: {date}</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Segmento</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Cafeteria</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Catering</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Centro educativo</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Comida preparada</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Empresa</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Feria</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Otro Sector</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Panaderia</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Restaurante</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Usuario Final</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Supermercado</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Otro</label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label" >Responsable</label>
                  <select className="form-select" aria-label="Default select example" value={personInCharge} onChange={handleChangePersonInCharge}>
                    <option value="Alejandro">Alejandro</option>
                    <option value="Andrea">Andrea</option>
                    <option value="Fabiola">Fabiola</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Prioridad</label>
                  <select className="form-select" aria-label="Default select example" value={priority} onChange={handleChangePriority}>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Estado</label>
                  <select className="form-select" aria-label="Default select example" value={state} onChange={handleChangeState}>
                    <option value="Clientes">Clientes</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Medio de Comunicacion</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Correo</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Llamada</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Instagram</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Whatsapp</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Zoom</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Otra</label>
                  </div>
                </div>


                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Contacto</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="tel" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Telefono</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Correo Electronico</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Pagina Web</label>
                </div>
                <div className="row">
                  <div className="col-6 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={ getClients } >Agregar</button>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <button className="btn btn-danger">Cancelar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3  d-flex my-2 my-md-0">
          <button className="btn btn-danger" >Eliminar Cliente</button>
        </div>
        <div className="col-sm-6 col-md-3 d-flex my-2 my-md-0">
          <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Buscar cliente..." />
        </div>

        <div className="col-sm-6 col-md-3 d-flex my-2 my-md-0">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filtrado
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Prioridad</a></li>
              <li><a className="dropdown-item" href="#">Recientes</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row m-2 mt-4 d-flex justify-content-center">
        {
          clients.map((client) => (
            <div className="col-sm-6 col-md-3 mb-3" key={client.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{client.empresa}</h5>
                  <p className="card-text">Some info.</p>
                  <button className="btn btn-primary" onClick={() => handleClick(client.id, client.empresa)}>Ver cliente</button>
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
              <a className="page-link">Anterior</a>
            </li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item" aria-current="page">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function dateFormat() {
  const current = new Date();
  var month = `${current.getMonth() + 1}`;
  if ( month < 10) {
    month = '0' + month;
  }
  var day = `${current.getDate()}`;
  if (day < 10) {
    day = '0' + day;
  }
  const date = `${current.getFullYear()}-${month}-${day}`;
  return date;
}

export default Clients;