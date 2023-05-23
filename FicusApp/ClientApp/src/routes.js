import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdLock,
} from "react-icons/md";
import {
  FaBox
} from "react-icons/fa";
import {
  HiDocument, HiDocumentRemove
} from "react-icons/hi";

// Admin Imports
import Vacio from  "components/Vacio";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  { name: "Registrarse",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Vacio",
    layout: "/admin",
    path: "/vacio",
    icon: <Icon as={HiDocumentRemove} width='20px' height='20px' color='inherit' />,
    component: Vacio,
  },
  // {
  //   name: "Clientes",
  //   layout: "/admin",
  //   path: "/vacio",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Vacio,
  // },
  // {
  //   name: "Productos",
  //   layout: "/admin",
  //   path: "/vacio",
  //   icon: <Icon as={FaBox} width='20px' height='15px' color='inherit' />,
  //   component: Vacio,
  // },
  // {
  //   name: "Ordenes",
  //   layout: "/admin",
  //   path: "/vacio",
  //   icon: <Icon as={HiDocument} width='20px' height='20px' color='inherit' />,
  //   component: Vacio,
  // },
];

export default routes;
