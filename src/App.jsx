import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import Layout from "./Component/Layout/Layout";
import Register from "./Component/Register/Register";
import Products from "./Component/Products/Products";
import Login from "./Component/Login/Login";
import Notfound from "./Component/Notfound/Notfound";
import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import Home from "./Component/Home/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import DetailsProduct from "./Component/DetailsProduct/DetailsProduct";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Component/Payment/Payment";
import AllOrders from "./Component/AllOrders/AllOrders";
import Profile from "./Component/Profile/Profile";
import { Offline } from "react-detect-offline";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/DetailsProduct/:title/:id",
        element: (
          <ProtectedRoute>
            <DetailsProduct />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
      <Offline>
        <div className="bg-dark fixed-bottom text-white" > You're offline right now. Check your connection.</div>
      </Offline>
    </>
  );
}
