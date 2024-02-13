import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/pages/authentication/Login";
import Register from "./components/pages/authentication/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResponsiveDrawer from "./components/pages/Navbar/Navbar";
import Dashboard from "./components/Layout/dashboardLayout/DashboardLayout";
import PublicLayout from "./components/Layout/publicLayout/PublicLayout";
import DashboardLayout from "./components/Layout/dashboardLayout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </React.StrictMode>
);
