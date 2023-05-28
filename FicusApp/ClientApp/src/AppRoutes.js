import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Vacio from "./components/Vacio"
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
} from "react-icons/md";

const AppRoutes = [
  {
    path: '/home',
    element: <Home />,
    name: "Home",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    index: true
  },
  {
    path: '/vacio',
    element: <Vacio />,
    name: "Vacio",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />
  }
];

export default AppRoutes;
