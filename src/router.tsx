import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { GuestPortal } from "./pages/GuestPortal";
import { AdminLogin } from "./pages/AdminLogin";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    return <>{children}</>;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/admin" replace />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/guest/s/:site",
        element: <GuestPortal />,
    }
]);

