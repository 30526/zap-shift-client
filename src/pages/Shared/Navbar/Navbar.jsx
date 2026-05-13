import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcel">My Parcel</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl px-6 mt-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-accent px-1">{links}</ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline border-secondary/20 text-secondary/80 font-semibold rounded-lg transition-all active:scale-[0.95] px-8 hover:bg-red-200"
          >
            Log Out
          </button>
        ) : (
          <NavLink to="/login">
            <button className="btn btn-outline border-secondary/20 text-secondary/80 font-semibold rounded-lg transition-all active:scale-[0.95] px-8">
              Sign In
            </button>
          </NavLink>
        )}
        <NavLink to="/rider">
          <button className="btn bg-primary text-secondary font-semibold rounded-lg ml-2 transition-all active:scale-[0.95] px-8">
            Be a Rider
          </button>
        </NavLink>
        <button className="btn bg-black rounded-full px-2.5 animate-bounce hover:animate-none">
          <FiArrowUpRight size={20} className="text-primary" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
