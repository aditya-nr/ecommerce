import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import BuyerHome from './BuyerHome.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import BuyerHomeProducts from './pages/BuyerHomeProducts.jsx';
import SellerHome from './SellerHome.jsx';
import SellerLogin from './pages/SellerLogin.jsx';
import SellerRegister from './pages/SellerRegister.jsx';
import SellerAddProduct from './pages/SellerAddProduct.jsx';
import SellerProducts from './pages/SellerProducts.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders.jsx';
import SellerOrders from './pages/SellerOrders.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BuyerHome />,
    children: [
      {
        path: '/',
        element: <BuyerHomeProducts />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/orders',
        element: <Orders />
      }
    ]
  },
  {
    path: '/seller',
    element: <SellerHome />,
    children: [
      {
        path: 'products',
        element: <SellerProducts />
      },
      {
        path: 'add',
        element: <SellerAddProduct />
      },
      {
        path: "orders",
        element: <SellerOrders />
      }

    ]
  },
  {
    path: '/seller-login',
    element: <SellerLogin />
  },
  {
    path: '/seller-register',
    element: <SellerRegister />
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
