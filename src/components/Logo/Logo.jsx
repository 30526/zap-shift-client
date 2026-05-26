import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = ({ color, to }) => {
  return (
    <Link to={to || ""}>
      <div className="flex">
        <img
          src={logo}
          alt="ZapShift Logo"
          className="h-8 w-auto translate-x-3"
        />
        <h2
          className={`text-2xl font-black translate-y-2 text-${color || "black"}`}
        >
          ZapShift
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
