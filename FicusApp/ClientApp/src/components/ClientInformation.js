import { useLocation } from "react-router-dom";

function ClientInformation() {
  const location = useLocation();
  // get id and client name sent by navigate hook in Client.js
  let clientId = location.state.id;
  let clientName = location.state.name;
  return (
    <div className="container">
      <h1>Empresa: {clientName}</h1>
    </div>
  );
}

export default ClientInformation;