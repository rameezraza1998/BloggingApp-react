import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'; 
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Error from "./components/Error.jsx";
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout acts as a wrapper for nested routes
    children: [
      {
        path: "", // Default route (home page)
        element: <Home />,
      },
      {
        path: "register", // Register page route
        element: <Register />,
      },
      {
        path: "login", // Login page route
        element: <Login />,
      },
      {
        path: "profile", // Profile page route
        element: <ProtectedRoutes component={<Profile />} />,
      },
      {
        path: "dashboard", // Dashboard page route
        element: <ProtectedRoutes component={<Dashboard />} />,
      },
    ],
  },
  {
    path: "*", // Error page route
    element: <Error />,
  },
]);

// Rendering the RouterProvider
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
