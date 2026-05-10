import { FaUserPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        toast.success("Registration successful!");
        //1. store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. Send the photo to store in imgbb and get url
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;
        axios.post(image_API_URL, formData).then((res) => {
          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then()
            .catch((error) => {
              toast.error(error.message);
            });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-sm">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-3xl font-black text-black mb-1">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600">Register with ZapShift</p>
        </div>

        {/* Profile Upload Placeholder */}
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center relative border border-gray-100">
            <FaUserPlus className="text-gray-400 text-2xl" />
            <div className="absolute bottom-1 right-0 bg-white rounded-full p-0.5 border border-gray-100">
              <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[8px] text-secondary">↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="space-y-2" onSubmit={handleSubmit(handleRegistration)}>
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-xs">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered text-accent w-full h-10 rounded-lg bg-white border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
          </div>

          {/* photo  */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-xs">
                Photo
              </span>
            </label>
            <input
              type="file"
              placeholder="Your photo"
              className="file-input input-bordered text-accent w-full h-10 rounded-lg bg-white border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm"
              {...register("photo", {
                required: true,
                validate: {
                  lessThan1MB: (files) =>
                    files[0]?.size <= 1048576 ||
                    "Image size must be less than 1 MB",
                  acceptedFormats: (files) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(
                      files[0]?.type,
                    ),
                },
              })}
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-xs">Photo is required</p>
            )}
            {errors.photo?.type === "lessThan1MB" && (
              <p className="text-red-500 text-xs">{errors.photo.message}</p>
            )}
            {errors.photo?.type === "acceptedFormats" && (
              <p className="text-red-500 text-xs">{errors.photo.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-xs">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered text-accent w-full h-10 rounded-lg bg-white border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500 text-xs">Please enter a valid email</p>
            )}
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-xs">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="input input-bordered text-accent w-full h-10 rounded-lg bg-white border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-300 text-sm"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button className="btn w-full bg-primary hover:bg-primary/90 border-none text-secondary font-bold rounded-lg h-10 min-h-[40px] mt-2">
            Register
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primary underline font-bold cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </p>
          <div className="divider text-gray-400 text-xs my-4">Or</div>

          {/* Google Register */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
