import { Outlet, Navigate } from "react-router-dom";

const AnonymousRoute = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  return email && password ? <Outlet /> : <Navigate to="/" replace />;
};

export default AnonymousRoute;
