import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-4 lg:px-0">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
