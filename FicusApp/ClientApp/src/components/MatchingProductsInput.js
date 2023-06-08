
function MatchingProductsInput(props) {
  return (
    <div>
        <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={props.productInput} onChange={props.handler} autoComplete="off" />
          <label htmlFor="floatingInput">Escriba para buscar un producto...</label>
        </div>
    </div>
  );
}

export default MatchingProductsInput;