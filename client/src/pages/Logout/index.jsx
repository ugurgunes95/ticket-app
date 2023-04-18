import React, { useEffect } from "react";
import { useLogoutMutation } from "../../features/api/authApiSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import Loading from "../../components/Loading";

const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      dispatch(logOut());
    };
    handleLogout();
  }, []);

  return isLoading ? <Loading /> : <Navigate to={"/"} replace />;
};

export default Logout;
