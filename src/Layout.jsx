import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Greeting from "./components/Greetings";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Greeting />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
