// Dar mejor formato a la fecha
export function formatDate(dateUnFormatted) {
  const date = new Date(dateUnFormatted);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("es-ES", options);
  return formattedDate;
}

// Customiza la forma en la que se ve cada estado
export function getFaseBadge({ faseId, faseText }) {
  const opciones = {
    0: <span className="badge text-bg-danger">{faseText}</span>,
    1: <span className="badge text-bg-secondary">{faseText}</span>,
    2: <span className="badge text-bg-info">{faseText}</span>,
    3: <span className="badge text-bg-success">{faseText}</span>,
    default: <span className="badge text-bg-secondary">Indefinido</span>,
  };
  const resultado = opciones[faseId] || opciones.default;
  return resultado;
}

export function getFaseButton({ fases, faseId }) {
  const descripcion = fases.find(
    (f) => f?.faseId === faseId
  )?.descripcionEstado;

  const opciones = {
    1: (
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {descripcion}
      </button>
    ),
    2: (
      <button
        type="button"
        className="btn btn-info dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {descripcion}
      </button>
    ),
    3: (
      <button
        type="button"
        className="btn btn-success dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {descripcion}
      </button>
    ),
    default: (
      <button
        type="button"
        className="btn btn-danger dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Indefinido
      </button>
    ),
  };
  const resultado = opciones[faseId] || opciones.default;

  return resultado;
}

// Calcular la duración dada una fecha de inicio y una final

export function calcularDuracion(inicio, final) {
  const startDate = new Date(inicio);
  const endDate = final ? new Date(final) : new Date();

  const diff = Math.abs(endDate - startDate);
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} día${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
  }
}

// Devuelve la orden con el inicio más nuevo

export function getLatestFase(data, ordenId) {
  const filteredData = data.filter((obj) => obj.ordenId === ordenId);
  if (filteredData.length === 0) {
    return null;
  }
  const latest = filteredData.reduce((prevObj, currObj) => {
    if (new Date(currObj.inicio) > new Date(prevObj.inicio)) {
      return currObj;
    } else {
      return prevObj;
    }
  });

  return latest;
}
