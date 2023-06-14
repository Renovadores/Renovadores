function ButtonAddOrder(props) {
  return (
    <div className="row mx-5 mt-3 d-flex justify-content-center">
      <div className="col-8 p-0 d-flex justify-content-center">
        {
          props.enable === true ?
            <button className="btn btn-primary" form="order-form" type="submit" >
              Generar Orden
            </button>
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