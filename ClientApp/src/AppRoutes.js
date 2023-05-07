import ArgNavMenu from "./components/ArgNavMenu";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
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
    element: <ArgNavMenu />,
  },
  {
    path: "/prueba2",
    element: <Tabla />,
  },
];

export default AppRoutes;
