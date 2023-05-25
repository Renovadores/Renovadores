import Home from "./components/Home";
import Clients from "./components/Clients";
import ClientInformation from "./components/ClientInformation";
import Stock from "./components/Stock";
import ProductInformation from "./components/ProductInformation";
import Inventory from "./components/Inventory";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },

  {
    path: "/clientes",
    element: <Clients />,
  },

  {
    path: "/clientes/informacion",
    element: <ClientInformation />,
  },

  {
    path: "/productos",
    element: <Stock />,
  },

  {
    path: "/productos/informacion/:SKU",
    element: <ProductInformation />,
  },

  {
    path: "/inventario",
    element: <Inventory />,
  },

  {
    path: "/cerrarSesion",
    element: <Home />,
  },
];

export default AppRoutes;
