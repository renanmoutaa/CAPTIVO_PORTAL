import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { GuestPortal } from "./pages/GuestPortal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/admin" replace />,
    },
    {
        path: "/admin/*",
        element: <App />,
    },
    {
        path: "/guest/s/:site",
        element: <GuestPortal />,
    }
]);
