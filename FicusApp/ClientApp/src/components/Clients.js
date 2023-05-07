import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckBox from "./CheckBox";
import ClientList from "./ClientList";
import FilterClients from "./FilterClients";
import Input from "./Input";
import Pagination from "./Pagination";
import SelectPersonInCharge from "./SelectPersonInCharge";
import SelectPriority from "./SelectPriority";
import SelectState from "./SelectState";

function Clients() {
  // get clients from data base
  //this variable allows to know if there are no clients in db (to stop spinner)
  const [clientsChecked, setClientsChecked] = useState(false); 
  const [clients, setClients] = useState([]);
  const getClients = async () => {
    setClientsChecked(false);
    const response = await fetch("api/cliente/GetClientes");
    if (response.ok) {
      const data = await response.json();
      setClients(data);
      setClientsChecked(true);
    } else {
      console.log(response.text);
    }
  }
  

  // this method allows to auto call getClients when page is started
  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  const date = currentDateFormat();
  const dateDB = dateFormatBD();

  // store form information in variables
  // TO-DO: set variables in english
  const [company, setCompany] = useState("");
  const handleChangeCompany = (event) => {
    setCompany(event.target.value)
  }

  var segments = []

  const [cafeteria, setCafeteria] = useState(false);
  const handleCheckboxCafeteria = (event) => {
    setCafeteria(event.target.checked)
  }

  const [catering, setCatering] = useState(false);
  const handleCheckboxCatering = (event) => {
    setCatering(event.target.checked)
  }

  const [centroEducativo, setCentroEducativo] = useState(false);
  const handleCheckboxCentroEducativo = (event) => {
    setCentroEducativo(event.target.checked)
  }

  const [comidaPreparada, setComidaPreparada] = useState(false);
  const handleCheckboxComidaPreparada = (event) => {
    setComidaPreparada(event.target.checked)
  }

  const [empresa, setEmpresa] = useState(false);
  const handleCheckboxEmpresa = (event) => {
    setEmpresa(event.target.checked)
  }

  const [feria, setFeria] = useState(false);
  const handleCheckboxFeria = (event) => {
    setFeria(event.target.checked)
  }

  const [otroSector, setOtroSector] = useState(false);
  const handleCheckboxOtroSector = (event) => {
    setOtroSector(event.target.checked)
  }

  const [panaderia, setPanaderia] = useState(false);
  const handleCheckboxPanaderia = (event) => {
    setPanaderia(event.target.checked)
  }

  const [restaurante, setRestaurante] = useState(false);
  const handleCheckboxRestaurante = (event) => {
    setRestaurante(event.target.checked)
  }

  const [usuarioFinal, setUsuarioFinal] = useState(false);
  const handleCheckboxUsuarioFinal = (event) => {
    setUsuarioFinal(event.target.checked)
  }

  const [supermercado, setSupermercado] = useState(false);
  const handleCheckboxSupermercado = (event) => {
    setSupermercado(event.target.checked)
  }

  const [otro, setOtro] = useState(false);
  const handleCheckboxOtro = (event) => {
    setOtro(event.target.checked)
  }

  const [personInCharge, setPersonInCharge] = useState("Alejandro");
  const handleChangePersonInCharge = (event) => {
    setPersonInCharge(event.target.value)
  }

  const [priority, setPriority] = useState("Baja");
  const handleChangePriority = (event) => {
    setPriority(event.target.value)
  }

  const [state, setState] = useState("Clientes");
  const handleChangeState = (event) => {
    setState(event.target.value)
  }

  const [correo, setCorreo] = useState(false);
  const handleCheckboxCorreo = (event) => {
    setCorreo(event.target.checked)
  }

  const [llamada, setLlamada] = useState(false);
  const handleCheckboxLlamada = (event) => {
    setLlamada(event.target.checked)
  }

  const [instagram, setInstagram] = useState(false);
  const handleCheckboxInstagram = (event) => {
    setInstagram(event.target.checked)
  }

  const [whatsapp, setWhatsapp] = useState(false);
  const handleCheckboxWhatsapp = (event) => {
    setWhatsapp(event.target.checked)
  }

  const [zoom, setZoom] = useState(false);
  const handleCheckboxZoom = (event) => {
    setZoom(event.target.checked)
  }

  const [otra, setOtra] = useState(false);
  const handleCheckboxOtra = (event) => {
    setOtra(event.target.value)
  }

  const [contacto, setContacto] = useState("");
  const handleChangeContacto = (event) => {
    setContacto(event.target.value)
  }

  const [telefono, setTelefono] = useState("");
  const handleChangeTelefono = (event) => {
    setTelefono(event.target.value)
  }

  const [correoElectronico, setCorreoElectronico] = useState("");
  const handleChangeCorreoElectronico = (event) => {
    setCorreoElectronico(event.target.value)
  }

  const [paginaWeb, setPaginaWeb] = useState("");
  const handleChangePaginaWeb = (event) => {
    setPaginaWeb(event.target.value)
  }

  const handleCancel = () => {
    setCompany("");
    setCafeteria(false);
    setCatering(false);
    setCentroEducativo(false);
    setComidaPreparada(false);
    setEmpresa(false);
    setFeria(false);
    setOtro(false);
    setOtroSector(false);
    setPanaderia(false);
    setRestaurante(false);
    setSupermercado(false);
    setUsuarioFinal(false);
    setContacto("");
    setCorreo(false);
    setCorreoElectronico("");
    setInstagram(false);
    setLlamada(false);
    setOtra(false);
    setPaginaWeb("");
    setPersonInCharge("");
    setPriority("");
    setState("");
    setTelefono("");
    setWhatsapp(false);
    setZoom("");

  }

  //Add client to data base
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setSegments TO-DO: add segments to data base
    if (cafeteria){
      segments.push("Cafeteria");
    }
    if (catering) {
      segments.push("catering");
    }
    if (centroEducativo) {
      segments.push("Centro Educativo");
    }
    if (comidaPreparada) {
      segments.push("Comida Preparada");
    }
    if (empresa) {
      segments.push("Empresa");
    }
    if (feria) {
      segments.push("Feria");
    }
    if (otroSector) {
      segments.push("Otro Sector");
    }
    if (panaderia) {
      segments.push("Panaderia");
    }
    if (restaurante) {
      segments.push("Restaurante");
    }
    if (usuarioFinal) {
      segments.push("Usuario Final");
    }
    if (supermercado) {
      segments.push("Supermercado");
    }
    if (otro) {
      segments.push("Otra");
    }
    
    const response = await fetch("api/cliente/AddCliente", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ tipo: "", fecha_Agregado: dateDB, responsable: personInCharge, prioridad: priority, estado: state, nombre: company, telefono : telefono, correo : correoElectronico, web : paginaWeb})
    });
    
    if (response.ok) {
      handleCancel();
      getClients();
    }
    segments = [];
  }

  // When user click on client button, 'navigate' redirect him to new page
  const navigate = useNavigate(); // Allows referencing a specific path defined in AppRoutes
  const handleClickViewClient = (clientIndex) => {
    navigate('/clientes/informacion', { state: clients[clientIndex].id });
    //second argument "state" allows to pass parameters
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
          <div className="offcanvas offcanvas-start " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del nuevo cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <form onSubmit={handleSubmit}>
                <Input variable={company} handler={handleChangeCompany} text="Empresa"/>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Agregado el: {date}</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Segmento</label>
                  <CheckBox variable={cafeteria} handler={handleCheckboxCafeteria} text="Cafeteria" />
                  <CheckBox variable={catering} handler={handleCheckboxCatering} text="Catering" />
                  <CheckBox variable={centroEducativo} handler={handleCheckboxCentroEducativo} text="Centro Educativo" />
                  <CheckBox variable={comidaPreparada} handler={handleCheckboxComidaPreparada} text="Comida Preparada" />
                  <CheckBox variable={empresa} handler={handleCheckboxEmpresa} text="Empresa" />
                  <CheckBox variable={feria} handler={handleCheckboxFeria} text="Feria" />
                  <CheckBox variable={otroSector} handler={handleCheckboxOtroSector} text="Otro Sector" />
                  <CheckBox variable={panaderia} handler={handleCheckboxPanaderia} text="Panaderia" />
                  <CheckBox variable={restaurante} handler={handleCheckboxRestaurante} text="Restaurante" />
                  <CheckBox variable={usuarioFinal} handler={handleCheckboxUsuarioFinal} text="Usuario Final" />
                  <CheckBox variable={supermercado} handler={handleCheckboxSupermercado} text="Supermercado" />
                  <CheckBox variable={otro} handler={handleCheckboxOtro} text="Otro" />
                </div>

                <SelectPersonInCharge variable={personInCharge} handler={handleChangePersonInCharge} />
                <SelectPriority variable={priority} handler={handleChangePriority} />
                <SelectState variable={state} handler={handleChangeState} />

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Medio de Comunicacion</label>
                  <CheckBox variable={correo} handler={handleCheckboxCorreo} text="Correo" />
                  <CheckBox variable={llamada} handler={handleCheckboxLlamada} text="Llamada" />
                  <CheckBox variable={instagram} handler={handleCheckboxInstagram} text="Instagram" />
                  <CheckBox variable={whatsapp} handler={handleCheckboxWhatsapp} text="Whatsapp" />
                  <CheckBox variable={zoom} handler={handleCheckboxZoom} text="Zoom" />
                  <CheckBox variable={otra} handler={handleCheckboxOtra} text="Otra" />
                </div>

                <Input variable={contacto} handler={handleChangeContacto} text="Contacto" />
                <Input variable={telefono} handler={handleChangeTelefono} text="Telefono" />
                <Input variable={correoElectronico} handler={handleChangeCorreoElectronico} text="Correo Electronico" />
                <Input variable={paginaWeb} handler={handleChangePaginaWeb} text="Pagina Web" />

                <div className="row">
                  <div className="col-6 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={ getClients } >Agregar</button>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <button className="btn btn-danger" type="button" onClick={handleCancel} data-bs-dismiss="offcanvas">Cancelar</button>
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
        <FilterClients/>
      </div>
      {
        clientsChecked === false? 
        <div className="d-flex align-items-center justify-content-center">
          <strong>Cargando...</strong>
          <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
         </div>
          :
          <ClientList clients={clients} handler={handleClickViewClient} />
      }
      
      <Pagination />
    </div>
  );
}

function dateFormatBD() {
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

function currentDateFormat() {
  const current = new Date();
  const day = current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const month = (current.getMonth()+1) < 10 ? "0" + (current.getMonth()+1) : current.getMonth()+1;
  const year = current.getFullYear();
  const date = `${day}-${month}-${year}`;

  return date;
}

export default Clients;