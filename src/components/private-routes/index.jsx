import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { IsAuthContext } from "../context/useIsAuthContext";

const PrivateRoutes = () => {
  const { isAuth } = useContext(IsAuthContext);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
