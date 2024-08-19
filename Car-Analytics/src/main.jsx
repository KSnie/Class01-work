import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavbarComponent from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Highlighted from './pages/Highlighted';
import './App.css';

function Root() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  );
}

const router = createHashRouter(
  createRoutesFromElements(          
      <Route path="/" element={<Root />}> 
        <Route
          path="/"
          element={<Dashboard />}
        />   
        <Route
          path="/highlighted"
          element={<Highlighted />}
        /> 
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
