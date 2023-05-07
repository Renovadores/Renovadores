import Home from "./components/Home";
import Clients from "./components/Clients";
import ClientInformation from "./components/ClientInformation";
import Stock from "./components/Stock";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  
  {
    path: '/clientes',
    element: <Clients />
  },

  {
    path: '/clientes/informacion',
    element: <ClientInformation />
  },

  {
    path: '/inventario',
    element: <Stock />
  },

  {
    path: '/cerrarSesion',
    element: <Home />
  }
];

export default AppRoutes;
