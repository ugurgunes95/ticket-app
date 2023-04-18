import React, { useEffect, useState } from "react";
import { useRefreshMutation } from "../features/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "../features/auth/authSlice";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentToken);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const result = await refresh();
        dispatch(setCredentials(result.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !token ? getAccessToken() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
};

export default PersistLogin;
