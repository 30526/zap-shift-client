import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <div className="flex flex-col-reverse md:flex-row flex-1">
        <div className="flex-1 p-8">
          <Logo />
          <Outlet />
        </div>
        <div className="flex-1 bg-primary/10 w-full flex items-center justify-center">
          <img src={authImage} alt="Auth Image" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
