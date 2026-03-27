import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex">
      <img src={logo} alt="ZapShift Logo" className="h-8 w-auto translate-x-3"/>
      <h2 className="text-2xl font-bold translate-y-2">ZapShift</h2>
    </div>
  );
};

export default Logo;
