import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Greeting from "./components/Greetings";

function Layout() {
  return (
    <>
      <Navbar />
      <Greeting />
      <Outlet />
    </>
  );
}

export default Layout;
