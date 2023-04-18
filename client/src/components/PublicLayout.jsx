import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const token = useSelector(selectCurrentToken);

  return !token ? <Outlet /> : <Navigate to={"/journeys"} replace />;
};

export default PublicLayout;
