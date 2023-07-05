import { useEffect, useState } from "react";
import { GetToken } from "../GetToken";

function Pagination(props) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [lastNumber, setLastNumber] = useState(2);
  const [active, setActive] = useState(0);
  const [paginationLength, setPaginationLength] = useState([]);

  const getData = async (value) => {
    const currentToken = await GetToken();
    const dataResponse = await fetch(props.apiRoute + `/${value * 8}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    });
    if (dataResponse.ok) {
      const data = await dataResponse.json();
      props.setElements(data);
    }
  }
  const handleClick = (index) => {
    setActive(index);
    getData(index);
  }
  const handleClickNext = (index) => {
    if (index > lastNumber) {
      setFirstNumber(index);
      if (paginationLength.length === index) {
        setLastNumber(index);
      } else if (paginationLength.length === index + 1) {
        setLastNumber(index + 1);
      } else {
        setLastNumber(index + 2);
      }
    }
    setActive(index);
    getData(index);
  }
  const handleClickBefore = (index) => {
    if (index < firstNumber) {
      setLastNumber(index);
      if (index === 0) {
        setFirstNumber(index);
      } else if (index - 1 === 0) {
        setFirstNumber(index - 1);
      } else {
        setFirstNumber(index - 2);
      }
    }
    setActive(index);
    getData(index);
  }
  useEffect(() => {
    const getTotal = async () => {
      const currentToken = await GetToken();
      const totalResponse = await fetch(props.apiTotalElements, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (totalResponse.ok) {
        const total = await totalResponse.json();
        const size = parseInt((total - 1) / 8);
        if (size > 0) {
          var array = Array(size).fill(2);
          setPaginationLength(array);
          getData(active);
        }
      }
    }
    getTotal();
  }, [props.update]);
  return (
    <div className="row m-2 mt-4 d-flex justify-content-center">
      <h6 className="d-flex justify-content-center text-center">
        {active + 1}/{paginationLength.length + 1}
      </h6>
      {
        paginationLength.length > 0 ?
          <nav aria-label="...">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className={active === 0 ? "page-link user-select-none disabled" : "page-link user-select-none text-info btn"}
                  onClick={() => handleClickBefore(active - 1)}>Anterior</a>
              </li>
              {
                paginationLength.map((number, index) => (
                  index + firstNumber >= firstNumber && index + firstNumber <= lastNumber ?
                    <li className={active === index + firstNumber ? "page-item active" : "page-item"}
                      key={index + firstNumber}>
                      <a className={active === index + firstNumber ? "page-link user-select-none btn bg-info" : "page-link user-select-none text-info btn"}
                        onClick={() => handleClick(index + firstNumber)}>
                        {index + firstNumber + 1}
                      </a>
                    </li>
                    :
                    <div key={index + firstNumber}></div>
                ))
              }
              <li className="page-item">
                <a className={paginationLength.length === active ?
                  "page-link user-select-none disabled" : "page-link user-select-none text-info btn"}
                  onClick={() => handleClickNext(active + 1)}>Siguiente</a>
              </li>
            </ul>
          </nav>
          :
          <></>
      }
    </div>
  );
}
export default Pagination;