import Home from './components/Home';
import Clients from './components/Clients';
import ClientInformation from './components/ClientInformation';
import Stock from './components/Stock';
import ProductInformation from './components/ProductInformation';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
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
    path: '/cerrarSesion',
    element: <Home />,
  },
];

export default AppRoutes;
