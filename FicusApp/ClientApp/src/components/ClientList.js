function ClientList(props) {
  return (
    <div className="row mx-2 px-3">
      {
        props.clients.length !== 0 ?
          <div className="card overflow-auto mb-5 px-0" style={{ height: "75vh" }}>
            <table className="table table-hover border-success">
              <thead className="bg-success">
                <tr>
                  <th scope="col" className="text-center text-light">
                    ID
                  </th>
                  <th scope="col" className="text-center text-light">
                    Nombre
                  </th>
                  <th scope="col" className="text-center text-light">
                    Contacto
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {
                  props.clients.map((client) => (
                    <tr key={client.clienteId}>
                      <th scope="row" className="text-center">
                        <a className="link" type="button" onClick={() => props.handler(client.clienteId)}>
                          {client.clienteId}
                        </a>
                      </th>
                      <td className="text-center">{client.nombreEmpresa}</td>
                      <td className="text-center">{client.contacto}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
       :
          <h5 className="d-flex justify-content-center">No se encontraron clientes en la base de datos</h5>
      }
    </div>
  );
}
export default ClientList;
