import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Order from "../../Pages/Home/Services/Order";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Orders from "../../Pages/orders/Orders";
import Update from "../../Pages/orders/Update";
import PrivateRoutes from "../Private routes/PrivateRoutes";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/orders/:id',
        element: <PrivateRoutes><Order></Order></PrivateRoutes>,
        loader: async ({ params }) => {
          return fetch(`https://genius-car-server-lyart-seven.vercel.app/services/${params.id}`);
        }
      },
      {
        path: 'orders',
        element: <PrivateRoutes><Orders></Orders></PrivateRoutes>
      },
      {
        path: 'update/:id',
        element: <PrivateRoutes><Update></Update></PrivateRoutes>,
        loader: async ({ params }) => {
          return fetch(`https://genius-car-server-lyart-seven.vercel.app/orders/${params.id}`)
        }
      }
    ]
  }
]);

export default router;