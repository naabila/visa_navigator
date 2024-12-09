import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import {
  RouterProvider
} from "react-router-dom";
import './index.css'
import router from './routs/Routes.jsx';
import AuthProvider from './firebase/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
)
