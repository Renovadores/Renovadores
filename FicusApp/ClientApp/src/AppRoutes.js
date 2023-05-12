import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Tabla from "./components/Tabla";
import Home from './components/Home';
import Clients from './components/Clients';
import ClientInformation from './components/ClientInformation';
import Stock from './components/Stock';
import ProductInformation from './components/ProductInformation';

const AppRoutes = [
  {
    index: true,
    path: "/home",
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: '/clientes',
    element: <Clients />,
  },

  {
    path: '/clientes/informacion',
    element: <ClientInformation />,
  },

  {
    path: '/productos',
    element: <Stock />,
  },

  {
    path: '/clientes/informacion',
    element: <ClientInformation />
  },

    {
        path: '/producto',
        element: <Stock />
    },
   {
    path: '/productos/informacion',
    element: <ProductInformation />,
  },
  {
    path: "/prueba",
    element: <SideBar />,
  },
  {
    path: "/prueba2",
    element: <NavBar />,
  },
  {
    path: "/tabla",
    element: <Tabla />,
  },
];

export default AppRoutes;
