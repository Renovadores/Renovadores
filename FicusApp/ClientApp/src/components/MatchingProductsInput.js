function MatchingProductsInput(props) {
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col">
          <input className="form-control" list="listOptions" id="exampleDataList" placeholder="Escriba para buscar un producto..." onChange={props.handler} />
        </div>
      </div>
    </div>
  );
}

export default MatchingProductsInput;