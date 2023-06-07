import { useNavigate } from 'react-router-dom';

function ButtonAddOrder(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/ordenes/nueva-orden', { state: props.clientId });
  }
  return (
    <div className="row m-3 my-5 d-flex justify-content-center">
      <div className="col p-0 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleClick}>
          Nueva Orden
        </button>
      </div>
    </div>
  );
}

export default ButtonAddOrder;