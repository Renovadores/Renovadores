import { useLocation } from 'react-router-dom';

function ProductInformation() {
  const location = useLocation();
  // get id and product name sent by navigate hook in Stock.js
  let productId = location.state.id;
  let productName = location.state.name;
  return (
    <div className="container">
      <h1>Nombre: {productName}</h1>
      <h2>SKU: {productId}</h2>
    </div>
  );
}

export default ProductInformation;
