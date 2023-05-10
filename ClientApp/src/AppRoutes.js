import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Tabla from "./components/Tabla";

const AppRoutes = [
  {
    index: true,
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
