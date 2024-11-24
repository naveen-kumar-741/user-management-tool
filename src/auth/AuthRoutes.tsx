import { Outlet, Navigate } from "react-router-dom";

const AuthRoutes = () => {
  const auth = localStorage.getItem("jwtToken");

  return auth ? <Navigate to="/user-management" /> : <Outlet />;
};

export default AuthRoutes;
