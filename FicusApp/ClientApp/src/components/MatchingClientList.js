//import CuantityProductModal from "./CuantityProductModal";
//import DisableProductModal from "./DisableProductModal";

function MatchingClientList(props) {
  return (
    <div className="container">
      <ol className="list-group list-group-numbered" id="listOptions">
        {
          props.clients.map((client, index) => (
            <div key={index} className="my-1">
              <li className="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center border border-primary" onClick={ ()=> props.handleSelectedClient (client.clienteId) } >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{client.nombreEmpresa}</div>
                  Contacto: { client.contacto }
                </div>
              </li>
            </div>
          ))
        }
      </ol>
    </div >
  );
}
export default MatchingClientList;