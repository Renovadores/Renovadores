const NoProducts = () => (
  <h5 className="d-flex justify-content-center">
    No se encontraron productos en la base de datos.
  </h5>
);

const ProductRow = ({ product }) => (
  <tr>
    {/*<th scope="row">{product.id_Inventario}</th>*/}
    <td>{product.producto}</td>
    <td>{product.estadoNavigation.descripcion_estadoproducto}</td>
    <td>{product.cantidad}</td>
    <td>{product.lote}</td>
    <td>{product.fecha_ingreso}</td>
  </tr>
);

const ProductsTable = ({ inventory }) => (
  <table className="table table-hover table-striped">
    <thead className="bg-primary text-light">
      <tr>
        {/*<th scope="col">#</th>*/}
        <th scope="col">Producto</th>
        <th scope="col">Estado</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Lote</th>
        <th scope="col">Fecha Ingreso</th>
      </tr>
    </thead>
    <tbody className="bg-light">
      {inventory.map((product, productIndex) => (
        <ProductRow key={productIndex} product={product} />
      ))}
    </tbody>
  </table>
);

function InventoryList({ inventory }) {
  return (
    <div className="row">
      {/*Database list */}
      {inventory.length !== 0 ? (
        <ProductsTable inventory={inventory} />
      ) : (
        <NoProducts />
      )}
    </div>
  );
}
export default InventoryList;
