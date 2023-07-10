import { useNavigate } from 'react-router-dom';
function ButtonAddOrder(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/ordenes');
  }
  return (
    <div className="row mx-5 mt-3 d-flex justify-content-center">
      <div className="col-8 p-0 d-flex justify-content-center">
        {
          props.enable === true ?
            <>
              <button className="btn btn-primary" form="order-form" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                Generar Orden
              </button>
              <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header bg-info d-flex justify-content-center">
                      <h1 className="modal-title fs-5 text-light" id="staticBackdropLabel">Orden Generada</h1>
                    </div>
                    {
                      props.orderId !== null ?
                        <>
                          <div className="modal-body text-center">
                            ID de la nueva orden: {<label className="fw-bold">{props.orderId}</label>}
                          </div>
                          <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Entendido</button>
                          </div>
                        </>
                        :
                        <div className="modal-body">
                          Registrando la orden...
                        </div>
                    }

                  </div>
                </div>
              </div>
            </>

            :
            <button className="btn btn-primary" form="order-form" type="submit" disabled>
              Generar Orden
            </button>
        }

      </div>
    </div>
  );
}

export default ButtonAddOrder;