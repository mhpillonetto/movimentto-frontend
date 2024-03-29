import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shipment from './components/ShipmentListItem';
import './index.css';
import Checkin from './pages/Checkin';
import Drivers from './pages/Drivers/driversList';
import DriverDetails from './pages/Drivers/driverDetails';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Shipments from './pages/Shipment/shipmentsList';
import CreateShipment from './pages/Shipment/createShipment';
import ShipmentDetail from './pages/Shipment/shipmentDetail';
import TransporterDetails from './pages/Transporter';

const router = createBrowserRouter([
  {
    path: "/cadastro",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/*",
    element: <Landing />
  },
  {
    path: "/inicio",
    element: <Home />
  },
  {
    path: "/perfil",
    element: <Profile />
  },
  {
    path: "/cargas",
    element: <Shipments />
  },
  {
    path: "/cargas/detalhes",
    element: <ShipmentDetail />
  },
  {
    path: "/cargas/anuciar",
    element: <CreateShipment />
  },
  {
    path: "/checkin",
    element: <Checkin />
  },
  {
    path: "/motoristas",
    element: <Drivers />
  },
  {
    path: "/motoristas/perfil",
    element: <DriverDetails />
  },
  {
    path: "/transportadora",
    element: <TransporterDetails />
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
