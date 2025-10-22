// src/components/PrivateRoute.tsx
import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/signin",
}) => {

  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
