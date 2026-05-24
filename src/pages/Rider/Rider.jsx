import React from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import rider from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";

const Rider = () => {
  // Initialize react-hook-form structures
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((center) => center.region);

  // remove duplicate regions
  const regions = [...new Set(regionDuplicate)];

  // explore useMemo useCallback
  const senderRegion = useWatch({ control, name: "senderRegion" });

  const handleRiderApplication = (data) => {
    console.log("Submitted Rider Data via RHF:", data);
    reset(); // Clear form fields upon success
  };

  return (
    <div className="max-w-7xl py-6 md:py-10 min-h-screen flex items-center justify-center">
      <div className="w-7xl bg-white border border-base-200 rounded-3xl p-6 md:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#03373d] tracking-tight">
              Be a Rider
            </h1>
            <p className="text-xs md:text-sm text-accent/90 max-w-xl leading-relaxed">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          <div className="divider opacity-40"></div>

          {/* Form Action Handler binding directly to react-hook-form */}
          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-5"
          >
            <h3 className="text-lg font-bold text-[#03373d] tracking-tight">
              Tell us about yourself
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.name ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Driving License */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Driving License Number
                </label>
                <input
                  type="text"
                  placeholder="Driving License Number"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.licenseNumber ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("licenseNumber", {
                    required: "Driving license is required",
                  })}
                />
                {errors.licenseNumber && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.licenseNumber.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.email ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.phone ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Region Select */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Your Region
                </label>
                <select
                  className={`select select-bordered w-full bg-base-50/30 text-secondary text-sm font-medium focus:outline-hidden ${errors.senderRegion ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("senderRegion", {
                    required: "Please select a region",
                  })}
                >
                  <option value="">Select your Region</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="rajshahi">Rajshahi</option>
                </select>
                {errors.region && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.region.message}
                  </span>
                )}
              </div>

              {/* District Select */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Your District
                </label>
                <select
                  className={`select select-bordered w-full bg-base-50/30 text-secondary text-sm font-medium focus:outline-hidden ${errors.district ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("district", {
                    required: "Please select a district",
                  })}
                >
                  <option value="">Select your District</option>
                  <option value="savar">Savar</option>
                  <option value="mirpur">Mirpur</option>
                  <option value="dhanmondi">Dhanmondi</option>
                </select>
                {errors.district && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.district.message}
                  </span>
                )}
              </div>

              {/* NID No */}
              <div className="form-control w-full md:col-span-2">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  NID No
                </label>
                <input
                  type="text"
                  placeholder="NID"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.nid ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("nid", { required: "NID number is required" })}
                />
                {errors.nid && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.nid.message}
                  </span>
                )}
              </div>

              {/* Bike Brand Model and Year */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Bike Brand Model and Year
                </label>
                <input
                  type="text"
                  placeholder="Bike Brand Model and Year"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.bikeModel ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("bikeModel", {
                    required: "Bike details are required",
                  })}
                />
                {errors.bikeModel && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.bikeModel.message}
                  </span>
                )}
              </div>

              {/* Bike Registration Number */}
              <div className="form-control w-full">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Bike Registration Number
                </label>
                <input
                  type="text"
                  placeholder="Bike Registration Number"
                  className={`input input-bordered w-full bg-base-50/30 text-secondary text-sm focus:outline-hidden ${errors.bikeRegistration ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("bikeRegistration", {
                    required: "Bike registration number is required",
                  })}
                />
                {errors.bikeRegistration && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.bikeRegistration.message}
                  </span>
                )}
              </div>

              {/* Tell Us About Yourself */}
              <div className="form-control w-full md:col-span-2">
                <label className="label-text text-xs font-bold text-black mb-1.5">
                  Tell Us About Yourself
                </label>
                <textarea
                  placeholder="Tell Us About Yourself"
                  className={`textarea textarea-bordered w-full bg-base-50/30 text-secondary text-sm h-24 resize-none focus:outline-hidden ${errors.about ? "border-error focus:border-error" : "focus:border-primary"}`}
                  {...register("about", {
                    required: "Please write a brief summary about yourself",
                  })}
                ></textarea>
                {errors.about && (
                  <span className="text-error text-xs mt-1 font-medium">
                    {errors.about.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn w-full bg-[#caeb66] hover:bg-[#b8d654] border-none text-secondary font-bold text-sm tracking-wide shadow-xs"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Illustration Graphic Layout */}
        <div className="hidden lg:col-span-5 lg:flex items-center justify-center h-full sticky top-10">
          <div className="relative w-full max-w-sm">
            <img
              src={rider}
              alt="Delivery Rider Illustration"
              className="w-full h-auto object-contain drop-shadow-md"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="flex-col items-center justify-center p-8 bg-base-50 border border-dashed border-base-300 rounded-2xl text-center space-y-2">
              <div className="text-6xl">🏍️</div>
              <h4 className="font-bold text-secondary">Join Our Network</h4>
              <p className="text-xs text-accent">
                Real-time parcel delivery optimization across city sub-regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
