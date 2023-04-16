import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Root = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

export default Root;
