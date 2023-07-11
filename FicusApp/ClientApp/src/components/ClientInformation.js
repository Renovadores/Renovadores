import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import { GetToken } from "../GetToken";
import Input from './Input';
import SelectPersonInCharge from "./SelectPersonInCharge";
import SelectPriority from "./SelectPriority";
import SelectState from "./SelectState";
import Spinner from "./Spinner";
import InfoClientList from "./InfoClientList";
import ButtonOrder from "./ButtonOrder";
import ButtonDeleteClient from "./ButtonDeleteClient";
import ComponentReport from "./ComponentReport";
import InputInt from "./InputInt";

function ClientInformation() {
  // get client id sent by navigate function in Client.js
  const location = useLocation();
  const clientId = location.state;
  const [token, setToken] = useState("");

  // get client info from data base
  const [clientInfo, setInfo] = useState("");
  const [clientSegments, setClientSegments] = useState([]);
  const [clientMedia, setClientMedia] = useState([]);
  const [personInChargeName, setPersonInChargeName] = useState("");
  const [users, setUsers] = useState([]);
  const getClient = async () => {
    const response = await fetch(`api/cliente/GetCliente/${clientId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const dataClient = await response.json();
      console.log(dataClient);
      setDate(dateFormat(dataClient.fechaAgregado));
      setInfo(dataClient);
      // get personInCharge name (in user table)
      const responseUser = await fetch(`api/usuario/GetUser/${dataClient.responsableId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (responseUser.ok) {
        const dataUser = await responseUser.json();
        setPersonInChargeName(dataUser.nombre);
      }
      // get segments (in client_Segment table)
      const responseClientSegments = await fetch(`api/clientesegmento/GetSegments/${clientId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (responseClientSegments.ok) {
        const dataSegments = await responseClientSegments.json();
        setClientSegments(dataSegments);
        // get media (in client_Comunication table)
        const responseClientMedia = await fetch(`api/clientecomunicacion/GetMedia/${clientId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (responseClientMedia.ok) {
          const dataMedia = await responseClientMedia.json();
          setClientMedia(dataMedia);
          addDefaultEditForm(dataClient, dataSegments, dataMedia);
        }
      }
      // get users
      const responseUsers = await fetch("api/usuario/GetUsers", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (responseUsers.ok) {
        const dataUsers = await responseUsers.json();
        setUsers(dataUsers);
      }
    } else {
      console.log(response.text);
    }
  }

  const [year, setYear] = useState(2022);
  const handleYear = (event) => {
    const input = event.target.value;
    console.log(input);
    if (input >= 2022) {
      setYear(input);
    }
  }

  useEffect(() => {
    if (token !== "") {
      getClient();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);

  const addDefaultEditForm = (dataClient, dataSegments, dataMedia) => {
    setCompany(dataClient.nombreEmpresa);
    setContacto(dataClient.contacto);
    setTelefono(dataClient.telefono);
    setCorreoElectronico(dataClient.correo);
    setPaginaWeb(dataClient.web);

    setCafeteria(dataSegments.includes("Cafeteria"));
    setCatering(dataSegments.includes("Catering"));
    setCentroEducativo(dataSegments.includes("Centro Educativo"));
    setComidaPreparada(dataSegments.includes("Comida Preparada"));
    setEmpresa(dataSegments.includes("Empresa"));
    setFeria(dataSegments.includes("Feria"));
    setOtro(dataSegments.includes("Otro"));
    setOtroSector(dataSegments.includes("Otro Sector"));
    setPanaderia(dataSegments.includes("Panaderia"));
    setRestaurante(dataSegments.includes("Restaurante"));
    setSupermercado(dataSegments.includes("Supermercado"));
    setUsuarioFinal(dataSegments.includes("Usuario Final"));

    setCorreo(dataMedia.includes("Correo"));
    setInstagram(dataMedia.includes("Instagram"));
    setLlamada(dataMedia.includes("Llamada"));
    setWhatsapp(dataMedia.includes("Whatsapp"));
    setZoom(dataMedia.includes("Zoom"));
    setOtra(dataMedia.includes("Otra"));

    setPersonInCharge(dataClient.responsableId);
    setPriority(dataClient.prioridad);
    setState(dataClient.estado);
  }

  const [date, setDate] = useState("");

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

  const [personInCharge, setPersonInCharge] = useState(1);
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

  var media = []

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
    setOtra(event.target.checked)
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

  // Edit Client
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cafeteria) {
      segments.push("Cafeteria");
    }
    if (catering) {
      segments.push("Catering");
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
      segments.push("Otro");
    }
    // media
    if (correo) {
      media.push("Correo");
    }
    if (llamada) {
      media.push("Llamada");
    }
    if (instagram) {
      media.push("Instagram");
    }
    if (whatsapp) {
      media.push("Whatsapp");
    }
    if (zoom) {
      media.push("Zoom");
    }
    if (otra) {
      media.push("Otra")
    }
    const currentToken = await GetToken();
    const response = await fetch("api/cliente/EditCliente", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify({ clienteId: clientId, fechaAgregado: clientInfo.fechaAgregado, responsableId: personInCharge, prioridad: priority, estado: state, nombreEmpresa: company, contacto: contacto, telefono: telefono, correo: correoElectronico, web: paginaWeb })
    });

    if (response.ok) {
      // add new segments
      for (let i = 0; i < segments.length; i++) {
        if (!clientSegments.includes(segments[i])) {
          const responseSegmento = await fetch("api/clientesegmento/AddSegment", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ clienteId: clientId, segmentoId: segments[i] })
          });
          if (!responseSegmento.ok) {
            // store or notify which segment fails
          }
        }
      }
      // delete unchecked segments
      for (let i = 0; i < clientSegments.length; i++) {
        if (!segments.includes(clientSegments[i])) {
          const responseSegmento = await fetch("api/clientesegmento/DeleteClientSegment", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ clienteSegmentoId: 0, clienteId: clientId, segmentoId: clientSegments[i] })
          });
          if (!responseSegmento.ok) {
            // store or notify which segment fails
          }
        }
      }
      // add new media
      for (let i = 0; i < media.length; i++) {
        if (!clientMedia.includes(media[i])) {
          const responseMedia = await fetch("api/clientecomunicacion/AddClientMedia", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ clienteId: clientId, medioId: media[i] })
          });
          if (!responseMedia.ok) {
            // store or notify which media fails
          }
        }
      }
      // delete unchecked media
      for (let i = 0; i < clientMedia.length; i++) {
        if (!media.includes(clientMedia[i])) {
          const responseMedia = await fetch("api/clientecomunicacion/DeleteClientMedia", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ clienteComunicacionId: 0, clienteId: clientId, medioId: clientMedia[i] })
          });
          if (!responseMedia.ok) {
            // store or notify which segment fails
          }
        }
      }
      if (token === currentToken) {
        getClient();
      }
      setToken(currentToken);
    }

    segments = [];
    media = [];
  }

  const navigate = useNavigate();
  const handleDeleteClient = async () => {
    const currentToken = await GetToken();
    const responseDelete = await fetch("api/cliente/DeleteCliente", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify(clientInfo)
    }
    );
    //TO-DO: use state to show a delete message
    if (responseDelete.ok) {
      navigate('/clientes', { state: clientId });
    }
  }
  return (
    <div className="container" >
      {
        clientInfo === "" ?
          <Spinner />
          :
          <div className="container" >
            <div className="row bg-success">
              <div className="col">
                <div className="card m-3 mt-5" >
                  <div className="card-body">
                    <div className="row align-items-center responsive">
                      <div className="col-8 col-sm-9">
                        <h5 className="card-title"> {clientInfo.nombreEmpresa} </h5>
                      </div>
                      <div className="col-4 col-sm-3 d-flex justify-content-md-end">
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                          Editar
                        </button>
                        <div className="offcanvas offcanvas-start " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                          <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Informacion del cliente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                          <div className="offcanvas-body">
                            <form onSubmit={handleSubmit}>
                              <Input variable={company} handler={handleChangeCompany} text="Nombre del cliente" />
                              <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Agregado el: {date} </label>
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

                              <SelectPersonInCharge variable={personInCharge} users={users} handler={handleChangePersonInCharge} />
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
                                  <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" >Agregar</button>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                  <button className="btn btn-danger text-light" type="button" onClick={() => addDefaultEditForm(clientInfo, clientSegments, clientMedia)} data-bs-dismiss="offcanvas">Cancelar</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InfoClientList clientInfo={clientInfo} clientSegments={clientSegments} clientMedia={clientMedia} date={date} personInChargeName={personInChargeName} />
                </div>
              </div>
              <div className="col mt-5 mb-3">
                <div className="col-4 p-2">
                  <InputInt text="Año" default="2022" handler={handleYear} />
                </div>
                <div className="mx-2 mb-4">
                  <ComponentReport parametro={`api/reporte/GetClientAnnualEnvironmentalReport/${clientId}/${year}`} label="Gramos" texto="Reporte Huella Ambiental" />
                </div>
                <div className="mx-2 mb-5">
                  <ComponentReport parametro={`api/reporte/GetClientAnnualOrderReport/${clientId}/${year}`} label="Cantidad" texto="Reporte de Ordenes" />
                </div>
              </div>
            </div>
            <ButtonOrder clientId={clientId} />
            <ButtonDeleteClient clientId={clientId} clientName={clientInfo.nombreEmpresa} handler={handleDeleteClient} />
          </div>
      }
    </div>
  );
}

export function dateFormat(dateDB) {
  var arrayDate = dateDB.split("-");
  const day = arrayDate[2].substring(0, 2);
  const date = day + "-" + arrayDate[1] + "-" + arrayDate[0];

  return date;
}

export default ClientInformation;
