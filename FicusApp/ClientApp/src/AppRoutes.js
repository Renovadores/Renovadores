import { Navigate } from 'react-router-dom';
import { Home } from "./components/Home";
import Vacio from "./components/Vacio"
import { Icon } from "@chakra-ui/react";
import Orden from "./components/Ordenes";
import {
  MdBarChart,
} from "react-icons/md";
import {
  FaBox,
} from "react-icons/fa";

const AppRoutes = [
  {
    path: '/home',
    element: <Home />,
    name: "Home",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    index: true
  },
  {
    path: '/orden',
    element: <Orden />,
    name: "Ordenes",
    icon: <Icon as={FaBox} width='15px' height='15px' color='inherit' />
  },
  {
    path: '/vacio',
    element: <Vacio />,
    name: "Vacio",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />
  },
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
];

export default AppRoutes;
