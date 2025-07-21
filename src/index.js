import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Cashier from './pages/Cashier';
import Warehouse from './pages/Warehouse';
import Admin from './pages/Admin';
import './index.css';
import './i18n';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { path: '', Component: Cashier },
      { path: 'warehouse', Component: Warehouse },
      { path: 'admin', Component: Admin },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


