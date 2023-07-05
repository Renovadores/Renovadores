import Home from "./components/Home";
import Clients from "./components/Clients";
import ClientInformation from "./components/ClientInformation";
import Stock from "./components/Stock";
import ProductInformation from "./components/ProductInformation";
import Inventory from "./components/Inventory";
import AddOrder from "./components/AddOrder";
import Orden from "./components/Ordenes";
import OrdenInfo from "./components/Ordenes/components/OrdenInfo.js";
import GraficoOrdenes from "./components/Ordenes/components/GraficoOrdenes";
import Reportes from "./components/Reportes";

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
    path: "/clientes/informacion/:iD_Cliente",
    element: <ClientInformation />,
  },

  {
    path: "/productos",
    element: <Stock />,
  },

  {
    path: "/productos/informacion/:ProductoId",
    element: <ProductInformation />,
  },

  {
    path: "/clientes/informacion",
    element: <ClientInformation />,
  },

  {
    path: "/inventario",
    element: <Inventory />,
  },

  {
    path: "/producto",
    element: <Stock />,
  },
  {
    path: "/productos/informacion",
    element: <ProductInformation />,
  },
  {
    path: "/ordenes",
    element: <Orden />,
  },
  {
    path: "/ordenes/:ordenId",
    element: <OrdenInfo />,
  },

  {
    path: "/ordenes/nueva-orden",
    element: <AddOrder />,
    },
    {
        path: "/reportes",
        element: <Reportes />,
    },
  {
    path: "/cerrarSesion",
    element: <Home />,
    },
];

export default AppRoutes;
