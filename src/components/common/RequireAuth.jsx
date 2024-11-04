import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthContext from "src/hooks/useAuthContext";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuthContext();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;