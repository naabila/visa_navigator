import {
  createBrowserRouter,
 
} from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AllVisas from "../pages/AllVisas";
import AddVisas from "../pages/AddVisas";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MyVisas from "../pages/MyVisas";
import AppliedVisas from "../pages/AppliedVisas";
import Detail from "../pages/Detail"
import PrivateRoute from "../components/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        path:'/',
        loader:()=>fetch('https://server-jade-xi.vercel.app/latest-visa'),
        element:<Home />
      },
      {
        path:'/allvisas',
        loader:()=>fetch('https://server-jade-xi.vercel.app/visas'),
        element: <AllVisas />
      },
      {
        path:"/visadetails/:id",
        loader:({params})=>fetch(`https://server-jade-xi.vercel.app/visas/${params.id}`),
        element: <PrivateRoute><Detail /></PrivateRoute>
      },
      {
        path:'/addvisas',
        element: <PrivateRoute><AddVisas /></PrivateRoute>
      },
      {
        path:'/myvisas',
        
        element: <PrivateRoute><MyVisas /></PrivateRoute>
      },
      {
        path:'/appliedVisas',
        loader:()=>fetch('https://server-jade-xi.vercel.app/application'),
        element: <PrivateRoute><AppliedVisas /></PrivateRoute>
      },
      {
        path:'/register',
        element: <Register />
      },
      {
        path:'/login',
        element: <Login />
      }
    ]
  },
  {
    path:'*',
    element:<Error />
  }
]);
export default router;
