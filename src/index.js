import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Singup from './pages/singup';
import Login from './pages/login';
import firebaseConfig from './firebaseConfig';
import Forgetpassword from './pages/forgetpass/index';
import store from './store'
import { Provider } from 'react-redux'
const router = createBrowserRouter([
  {
    path: "/",
    element:<Singup/>,
  },
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/forget",
    element:<Forgetpassword/>,
  },
  {
    path: "/home",
    element:<App/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
     
);
