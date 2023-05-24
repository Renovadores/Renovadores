import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Vacio from "./components/Vacio"
import AdminLayout from "../src/layouts/admin";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/admin/default',
    element: <Vacio />
  }
];

export default AppRoutes;
