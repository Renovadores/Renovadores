import Logotipo from './images/Logotipo.png'

function Login(props) {
  return (
    <div className="container mt-0 p-5 pt-1 d-flex justify-content-center">
      <div className="row d-flex justify-content-center mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-center">
            <img src={Logotipo} alt="Logotipo de Ficus" height={100} />
          </div>
        </div>
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
        <div className="row d-flex justify-content-center mb-3">
          <div className="col-6 d-flex justify-content-center">
            <button className="btn btn-info" onClick={props.handleAuthenticate}>Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;