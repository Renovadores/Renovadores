import Logotipo from './images/Logotipo.png'

function Login(props) {
  const handleButton = (event) => {
    event.preventDefault();
    props.handleAuthenticate();
  }
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row d-flex justify-content-center mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-center">
            <img src={Logotipo} alt="Logotipo de Ficus" height={100} />
          </div>
        </div>
        <form onSubmit={handleButton}>
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
              <button type="submit" className="btn btn-info" >Ingresar</button>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-8 d-flex justify-content-center">
              <label className="text-danger">{props.message}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login;