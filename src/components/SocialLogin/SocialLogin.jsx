import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Successfully signed in with Google!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn w-full bg-gray-100 hover:bg-gray-200 border-none text-black font-semibold rounded-lg h-11 min-h-[44px] flex items-center justify-center gap-3 normal-case transition-colors"
    >
      <FcGoogle className="text-xl" />
      Sign in with Google
    </button>
  );
};

export default SocialLogin;
