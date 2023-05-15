import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import Input from './Input';
import SelectPersonInCharge from "./SelectPersonInCharge";
import SelectPriority from "./SelectPriority";
import SelectState from "./SelectState";

function ClientInformation() {
  // get client id sent by navigate function in Client.js
  const location = useLocation();
  const clientId = location.state;

  // get client info from data base
  const [clientInfo, setInfo] = useState("");
  const [clientSegments, setClientSegments] = useState([]);
  const [clientMedia, setClientMedia] = useState([]);
  const [personInChargeName, setPersonInChargeName] = useState("");
  const [users, setUsers] = useState([]);
  async function getClient() {
    const response = await fetch(`api/cliente/GetCliente/${clientId}`);
    if (response.ok) {
      const dataClient = await response.json();
      setDate(dateFormat(dataClient.fecha_Agregado));
      setInfo(dataClient);
      // get personInCharge name (in user table)
      const responseUser = await fetch(`api/usuario/GetUser/${dataClient.responsable}`);
      if (responseUser.ok) {
        const dataUser = await responseUser.json();
        setPersonInChargeName(dataUser.nombre);
      }
      // get segments (in client_Segment table)
      const responseClientSegments = await fetch(`api/cliente_segmento/GetSegments/${clientId}`)
      if (responseClientSegments.ok) {
        const dataSegments = await responseClientSegments.json();
        setClientSegments(dataSegments);
        // get media (in client_Comunication table)
        const responseClientMedia = await fetch(`api/cliente_comunicacion/GetMedia/${clientId}`)
        if (responseClientMedia.ok) {
          const dataMedia = await responseClientMedia.json();
          setClientMedia(dataMedia);
          addDefaultEditForm(dataClient, dataSegments, dataMedia);
        }
      }
      // get users
      const responseUsers = await fetch("api/usuario/GetUsers");
      if (responseUsers.ok) {
        const dataUsers = await responseUsers.json();
        setUsers(dataUsers);
        console.log(dataUsers);
      }
    } else {
      console.log(response.text);
    }
  }

  useEffect(() => {
    async function getClient() {
      const response = await fetch(`api/cliente/GetCliente/${clientId}`);
      if (response.ok) {
        const dataClient = await response.json();
        setDate(dateFormat(dataClient.fecha_Agregado));
        setInfo(dataClient);
        // get personInCharge name (in user table)
        const responseUser = await fetch(`api/usuario/GetUser/${dataClient.responsable}`);
        if (responseUser.ok) {
          const dataUser = await responseUser.json();
          setPersonInChargeName(dataUser.nombre);
        }
        // get segments (in client_Segment table)
        const responseClientSegments = await fetch(`api/cliente_segmento/GetSegments/${clientId}`)
        if (responseClientSegments.ok) {
          const dataSegments = await responseClientSegments.json();
          setClientSegments(dataSegments);
          // get media (in client_Comunication table)
          const responseClientMedia = await fetch(`api/cliente_comunicacion/GetMedia/${clientId}`)
          if (responseClientMedia.ok) {
            const dataMedia = await responseClientMedia.json();
            setClientMedia(dataMedia);
            addDefaultEditForm(dataClient, dataSegments, dataMedia);
          }
        }
        
        // get users
        const responseUsers = await fetch("api/usuario/GetUsers");
        if (responseUsers.ok) {
          const dataUsers = await responseUsers.json();
          setUsers(dataUsers);
          console.log(dataUsers);
        }
      } else {
        console.log(response.text);
      }
    }
    getClient();
  }, [clientId]);

  const addDefaultEditForm = (dataClient, dataSegments, dataMedia) => {
    setCompany(dataClient.nombre_Empresa);
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

    //TO-DO:  get values
    setCorreo(dataMedia.includes("Correo"));
    setInstagram(dataMedia.includes("Instagram"));
    setLlamada(dataMedia.includes("Llamada"));
    setWhatsapp(dataMedia.includes("Whatsapp"));
    setZoom(dataMedia.includes("Zoom"));
    setOtra(dataMedia.includes("Otra"));

    setPersonInCharge(dataClient.responsable);
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

  // Edit Client
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setSegments TO-DO: add segments to data base
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
    console.log(segments, clientId, media);
    const response = await fetch("api/cliente/EditCliente", {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: clientId, fecha_Agregado: clientInfo.fecha_Agregado, responsable: personInCharge, prioridad: priority, estado: state, nombre_Empresa: company, contacto: contacto, telefono: telefono, correo: correoElectronico, web: paginaWeb })
    });

    if (response.ok) {
      // add new segments
      for (let i = 0; i < segments.length; i++) {
        if (!clientSegments.includes(segments[i])) {
          const responseSegmento = await fetch("api/cliente_segmento/AddSegment", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cliente: clientId, segmento: segments[i] })
          });
          if (!responseSegmento.ok) {
            // store or notify which segment fails
          }
        }
      }
      // delete unchecked segments
      for (let i = 0; i < clientSegments.length; i++) {
        if (!segments.includes(clientSegments[i])) {
          // add new segment
          const responseSegmento = await fetch("api/cliente_segmento/DeleteClient_Segment", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cliente: clientId, segmento: clientSegments[i] })
          });
          if (!responseSegmento.ok) {
            // store or notify which segment fails
          }
        }
      }
      // add new media
      for (let i = 0; i < media.length; i++) {
        if (!clientMedia.includes(media[i])) {
          const responseMedia = await fetch("api/cliente_comunicacion/AddClientMedia", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cliente: clientId, medio: media[i] })
          });
          if (!responseMedia.ok) {
            // store or notify which media fails
          }
        }
      }
      // delete unchecked media
      for (let i = 0; i < clientMedia.length; i++) {
        if (!media.includes(clientMedia[i])) {
          // add new segment
          const responseMedia = await fetch("api/cliente_comunicacion/DeleteClientMedia", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cliente: clientId, medio: clientMedia[i] })
          });
          if (!responseMedia.ok) {
            // store or notify which segment fails
          }
        }
      }
      getClient();
    }

    segments = [];
    media = [];
  }

  return (
    <div className="container" >
      <div className="card m-3 mt-5" >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-8 col-sm-10">
              <h5 className="card-title"> {clientInfo.nombre_Empresa} </h5>
            </div>
            <div className="col-4 col-sm-2">
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
                    <Input variable={company} handler={handleChangeCompany} text="Empresa" />
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
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={getClient} >Agregar</button>
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <button className="btn btn-danger" type="button" onClick={() =>  addDefaultEditForm (clientInfo, clientSegments, clientMedia)} data-bs-dismiss="offcanvas">Cancelar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Segmentos: <> </>
            {
              clientSegments.map((segment, index) => (
                <label className="bg-secondary p-1 m-1" key={index}>{segment}</label>
              ))
            }
          </li>
          <li className="list-group-item">Medios de comunicacion: <> </>
            {
              clientMedia.map((media, index) => (
                <label className="m-1" key={index}>{media}</label>
              ))
            }
          </li>
          <li className="list-group-item">Fecha agregado: {date} </li>
          <li className="list-group-item">Responsable: {personInChargeName} </li>
          <li className="list-group-item">Prioridad: {clientInfo.prioridad} </li>
          <li className="list-group-item">Estado: {clientInfo.estado} </li>
          <li className="list-group-item">Contacto: {clientInfo.contacto} </li>
          <li className="list-group-item">Telefono: {clientInfo.telefono} </li>
          <li className="list-group-item">Correo: {clientInfo.correo} </li>
          <li className="list-group-item">Pagina Web: {clientInfo.web} </li>
        </ul>
      </div>
    </div>
  );
}

function dateFormat(dateDB) {
  var arrayDate = dateDB.split("-");
  const day = arrayDate[2].substring(0, 2);
  const date = day + "-" + arrayDate[1] + "-" + arrayDate[0];

  return date;
}

export default ClientInformation;