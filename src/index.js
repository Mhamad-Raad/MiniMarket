import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cashier from './pages/Cashier';
import Warehouse from './pages/Warehouse';
import Admin from './pages/Admin';

const router = createBrowserRouter([
  { path: '/', Component: Cashier },
  { path: '/warehouse', Component: Warehouse },
  { path: '/admin', Component: Admin },
  { path: '*', Component: () => <h1>404 Not Found</h1> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

