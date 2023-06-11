function Login(props) {
  return (
    <div className="container m-5 p-5 d-flex justify-content-center">
      <div className="row d-flex justify-content-center mb-3">
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-center">
            <label>Usuario</label>
          </div>
        </div>
        <div className="row d-flex justify-content-center mb-3">
          <div className="col-6 d-flex justify-content-center">
            <input type="text" onChange={props.handleUserName}></input>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-center">
            <label>Contrasena</label>
          </div>
        </div>
        <div className="row d-flex justify-content-center mb-3">
          <div className="col-6 d-flex justify-content-center">
            <input type="password" onChange={props.handlePassword}></input>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-center">
            <button className="btn btn-info" onClick={props.handleAuthenticate}>Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;