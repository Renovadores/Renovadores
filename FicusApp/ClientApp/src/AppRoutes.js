import { Navigate } from 'react-router-dom';
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
  },
  {
    path: '/*', // Catch-all route for unmatched paths
    element: <Navigate to="/home" replace />,
  },
];

export default AppRoutes;
