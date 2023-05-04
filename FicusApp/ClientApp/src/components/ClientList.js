function ClientList(props) {
  return (
    <div className="row m-2 mt-4 d-flex justify-content-center">
      {
        props.clients.map((client, index) => (
          <div className="col-sm-6 col-md-3 mb-3" key={client.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{client.empresa}</h5>
                <p className="card-text">Some info.</p>
                <button className="btn btn-primary" onClick={() => props.handler(index)}>Ver cliente</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
export default ClientList;