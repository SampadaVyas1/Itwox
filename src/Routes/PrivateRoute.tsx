import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  return email && password ? <Navigate to="/" replace /> : <Outlet />;
};

export default PrivateRoute;
