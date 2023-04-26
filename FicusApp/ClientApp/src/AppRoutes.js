import Home from "./components/Home";
import Clients from "./components/Clients";
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
    path: '/inventario',
    element: <Stock />
  },

  {
    path: '/cerrarSesion',
    element: <Home />
  }
];

export default AppRoutes;
