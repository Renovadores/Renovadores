import ButtonDeleteClient from "./ButtonDeleteClient";

function InfoClientList({ clientInfo, clientSegments, clientMedia , date, personInChargeName}) {
  return (
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
  );
}

export default InfoClientList;