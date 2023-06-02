
function BelongToEvent(props) {
  //TO-DO: Get events from DB
  const events = [{ nombre: "Feria Verde" }, { nombre: "Feria B" }, { nombre: "Feria C" }]
  return (
    <div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={props.belongToEvent} onChange={props.handleBelongToEvent} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pertenece a un evento</label>
      </div>
      {
        props.belongToEvent === true ?
          <div>
            <label htmlFor="exampleDataList" className="form-label mt-3">Seleccionar evento (Si no existe se genera automaticamente)</label>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={props.eventName} onChange={props.handleEvent} autoComplete="off" list="datalistOptions" />
              <label htmlFor="floatingInput">Nombre del evento</label>
            </div>
            <datalist id="datalistOptions">
              {
                events.map((event, index) => (
                  <option value={event.nombre} key={index} />
                ))
              }
            </datalist>
          </div>
          :
          <>
          </>
      }
    </div>
  );
}
export default BelongToEvent;