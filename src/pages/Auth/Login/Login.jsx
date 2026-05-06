import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = useAuth();
  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-sm">
        {/* Header Section */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-black text-black mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-600">
            Login to your ZapShift account
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-xs">
                Email
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="mail@example.com"
                className="input input-bordered w-full h-11 rounded-lg bg-white text-accent border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm pl-4"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
              />
            </div>
          </div>

          <div className="form-control">
            <div className="flex justify-between items-center py-1">
              <label className="label p-0">
                <span className="label-text font-bold text-secondary text-xs">
                  Password
                </span>
              </label>
              <span className="text-[10px] underline text-primary font-bold cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className="input input-bordered w-full h-11 rounded-lg text-accent bg-white border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm pl-4"
                {...register("password", { required: true })}
              />
            </div>
          </div>

          <button className="btn w-full bg-primary hover:bg-primary/90 border-none text-secondary font-bold rounded-lg h-11 min-h-[44px] mt-4 shadow-sm transition-all active:scale-[0.98]">
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-primary underline font-bold cursor-pointer hover:underline">
                Register
              </span>
            </Link>
          </p>

          <div className="divider text-gray-400 text-[10px] uppercase tracking-widest my-6">
            Or Login With
          </div>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
