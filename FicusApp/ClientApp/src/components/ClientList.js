function ClientList(props) {

  return (
    <div className="row m-2 mt-4">
      {
        props.clients.length !== 0 ?
          props.clients.map((client, index) => (
            <div className="col-sm-6 col-md-3 mb-3" key={client.clienteId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{client.nombreEmpresa}</h5>
                  <p className="card-text utf-8">Ordenes activas: </p>
                  <button className="btn btn-primary" onClick={() => props.handler(index)}>Ver cliente</button>
                </div>
              </div>
            </div>
          ))
       :
          <h5 className="d-flex justify-content-center">No se encontraron clientes en la base de datos</h5>
      }
    </div>
  );
}
export default ClientList;
