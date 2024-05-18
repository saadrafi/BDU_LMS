import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/pages/authentication/Login";
import Register from "./components/pages/authentication/Register";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PublicLayout from "./components/Layout/publicLayout/PublicLayout";
import DashboardLayout from "./components/Layout/dashboardLayout/DashboardLayout";
import AdminHomePage from "./components/pages/admin/adminHome/AdminHomePage";
import AdminDashboard from "./components/pages/admin/adminDashboard/AdminDashboard";
import ManageUsers from "./components/pages/admin/manageUsers/ManageUsers";
import OtpVerifyPage from "./components/pages/authentication/OtpVerifyPage";
import AddUser from "./components/pages/admin/manageUsers/AddUser";
import UpdatePassword from "./components/pages/authentication/UpdatePassword";
import TeacherDashboard from "./components/pages/teacher/teacherDashboard/TeacherDashboard";
import TeacherHomePage from "./components/pages/teacher/teacherHome/TeacherHomePage";
import ManageCourses from "./components/pages/admin/manageCouses/ManageCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: (
          <div>
            <h1 className="text-5xl text-center mt-10">Landing Page</h1>
          </div>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-otp",
        element: <OtpVerifyPage />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "",
            element: <AdminHomePage />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "add-user",
            element: <AddUser />,
          },
          {
            path: "manage-courses",
            element: <ManageCourses />,
          },
          {
            path: "manage-enrollments",
            element: (
              <div>
                <h1>Manage Enrollments</h1>
                <p>Content</p>
              </div>
            ),
          },
        ],
      },
      {
        path: "student",
        element: (
          <div>
            <h1>Student Dashboard</h1>
            <p>Content</p>
          </div>
        ),
      },
      {
        path: "teacher",
        element: <TeacherDashboard></TeacherDashboard>,
        children: [{ path: "", element: <TeacherHomePage></TeacherHomePage> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </React.StrictMode>
);
