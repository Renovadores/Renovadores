import InputInt from "./InputInt";
import SelectInventoryState from "./SelectInventoryState";
import { useEffect, useState } from "react";

const NoProducts = () => (
  <h5 className="d-flex justify-content-center">
    No se encontraron productos en la base de datos.
  </h5>
);

const FormEditInventory = ({ product, states, onSubmit }) => {
  const [inventoryRow, setInventory] = useState(product);
  useEffect(() => {
    setInventory(product);
  }, [product]);
  const handleChangeProductAmount = (event) =>
    setInventory({
      ...inventoryRow,
      cantidad: event.target.value,
    });
  const handleChangeBatch = (event) =>
    setInventory({
      ...inventoryRow,
      lote: event.target.value,
    });
  const handleChangeInventoryState = (event) =>
    setInventory({ ...inventoryRow, estado: event.target.value });

  const handleSubmit = (event) => {
    console.dir({
      iD_Inventario: inventoryRow.iD_Inventario,
      producto: inventoryRow.producto,
      estado: inventoryRow.estado,
      cantidad: inventoryRow.cantidad,
      lote: inventoryRow.lote,
      fecha_ingreso: inventoryRow.fecha_ingreso + " handleSubmitEditForm",
    });
    onSubmit(event, inventoryRow);
  };

  return (
    <div
      id="offCanvasEditInventory"
      className="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabIndex="-1"
    >
      {inventoryRow ? (
        <>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasEditInventoryLabel">
              Información del Inventario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <form value={inventoryRow} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Agregado el: {product.fecha_ingreso} <br />
                  SKU: {product.producto}
                </label>
              </div>

              <SelectInventoryState
                inventories={states}
                value={inventoryRow.estado}
                onChange={handleChangeInventoryState}
              />
              <InputInt
                variable={inventoryRow.cantidad}
                handler={handleChangeProductAmount}
                text="Cantidad"
              />
              <InputInt
                variable={inventoryRow.lote}
                handler={handleChangeBatch}
                text="Lote"
              />

              <div className="row">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="offcanvas"
                  >
                    Editar
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    className="btn btn-danger text-light"
                    type="button"
                    data-bs-dismiss="offcanvas"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};
const ProductRow = ({ product, onSelectInventory }) => (
  <tr>
    {/*<th scope="row">{product.id_Inventario}</th>*/}
    <td>{product.producto}</td>
    <td>{product.estadoNavigation.descripcion_estadoproducto}</td>
    <td>{product.cantidad}</td>
    <td>{product.lote}</td>
    <td>{product.fecha_ingreso}</td>
    <td>
      <button
        className="btn btn-primary mx-2 text-light"
        data-bs-toggle="offcanvas"
        data-bs-target="#offCanvasEditInventory"
        aria-controls="offCanvasEditInventory"
        onClick={() => {
          onSelectInventory(product);
        }}
      >
        Editar
      </button>

      <button className="btn btn-danger text-light" product={product}>
        Eliminar
      </button>
    </td>
  </tr>
);

const ProductsTable = ({ inventory, onSelectInventory }) => (
  <table className="table table-hover table-striped">
    <thead className="bg-primary text-light">
      <tr>
        {/*<th scope="col">#</th>*/}
        <th scope="col">Producto</th>
        <th scope="col">Estado</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Lote</th>
        <th scope="col">Fecha Ingreso</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody className="bg-light">
      {inventory.map((product, productIndex) => (
        <ProductRow
          key={productIndex}
          product={product}
          onSelectInventory={onSelectInventory}
        />
      ))}
    </tbody>
  </table>
);

function InventoryList({
  inventory,
  inventoryRow,
  states,
  onSelectInventory,
  onSubmit,
}) {
  return (
    <div className="row">
      <FormEditInventory
        product={inventoryRow}
        states={states}
        onSubmit={onSubmit}
        onSelectInventory={onSelectInventory}
      />

      {/*Database list */}
      {inventory.length !== 0 ? (
        <ProductsTable
          inventory={inventory}
          onSelectInventory={onSelectInventory}
        />
      ) : (
        <NoProducts />
      )}
    </div>
  );
}
export default InventoryList;
