import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const PrivateRoute: React.FC = () => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return <div>Loading...</div>; 
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

