import { useLocation } from "react-router-dom";

function ClientInformation() {
  const location = useLocation();
  // get info sent by navigate hook in Client.js
  const clientInfo = location.state;
  console.log(clientInfo);
  return (
    <div className="container">
      <h2>{clientInfo.empresa}</h2>
      <h2>{clientInfo.agregado}</h2>
      <h2>{clientInfo.responsable}</h2>
      <h2>{clientInfo.prioridad}</h2>
    </div>
  );
}

export default ClientInformation;