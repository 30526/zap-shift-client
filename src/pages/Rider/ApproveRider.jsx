import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import {
  FaClock,
  FaIdCard,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaRegClock,
  FaRegIdBadge,
  FaUserCheck,
} from "react-icons/fa";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Helper utility to format timestamp strings smoothly
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Upper Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#03373d] tracking-tight">
            Rider Verification
          </h1>
          <p className="text-sm text-accent mt-1">
            Review and validate incoming courier application vectors.
          </p>
        </div>

        {/* Real-time Status Metric Card */}
        <div className="stats shadow-xs border border-base-200 bg-white px-4 py-1.5 rounded-xl">
          <div className="stat p-2 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <FaClock className="size-5" />
            </div>
            <div>
              <div className="stat-title text-xs font-bold uppercase tracking-wider text-accent">
                Awaiting Review
              </div>
              <div className="stat-value text-2xl text-[#03373d] font-black">
                {riders.length} Applications
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Structural Table Container */}
      <div className="overflow-hidden rounded-2xl border border-base-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-collapse">
            {/* Structured Table Headers */}
            <thead>
              <tr className="bg-base-200 text-[#03373d] border-b border-base-200 font-semibold text-sm">
                <th className="py-4 pl-6">Rider Profile</th>
                <th className="py-4">Credentials & Verification</th>
                <th className="py-4">Vehicle Details</th>
                <th className="py-4">Location & Applied At</th>
                <th className="py-4 pr-6 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Content Stream */}
            <tbody className="text-secondary/90 text-sm">
              {riders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-accent font-medium"
                  >
                    No pending rider applications found in the review queue.
                  </td>
                </tr>
              ) : (
                riders.map((rider) => (
                  <tr
                    key={rider.id || rider._id}
                    className="border-b border-base-100 transition-colors hover:bg-base-50/40"
                  >
                    {/* Column 1: Personal Contact Block */}
                    <td className="py-5 pl-6 align-middle">
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-bold text-[#03373d] text-base">
                          {rider.name}
                        </span>
                        <span className="text-xs text-accent font-medium">
                          {rider.email}
                        </span>
                        <span className="text-xs text-secondary/70 font-mono mt-0.5">
                          {rider.phone}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Legal Identities (NID & License) */}
                    <td className="py-5 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs font-semibold text-secondary/80 flex items-center gap-1.5">
                          <FaIdCard className="text-accent size-3.5" /> NID:{" "}
                          <span className="font-mono text-secondary">
                            {rider.nid}
                          </span>
                        </span>
                        <span className="text-xs font-semibold text-secondary/80 flex items-center gap-1.5">
                          <FaUserCheck className="text-accent size-3.5" />{" "}
                          License:{" "}
                          <span className="font-mono text-secondary">
                            {rider.licenseNumber}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Asset Details (Bike specifications) */}
                    <td className="py-5 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs font-bold text-[#03373d] flex items-center gap-1.5">
                          <FaMotorcycle className="text-accent size-3.5" />{" "}
                          Model/Year:{" "}
                          <span className="font-normal text-secondary">
                            {rider.bikeModel}
                          </span>
                        </span>
                        <span className="text-xs font-semibold text-secondary/70 flex items-center gap-1.5">
                          <FaRegIdBadge className="text-accent size-3.5" />
                          Reg:{" "}
                          <span className="font-mono uppercase">
                            {rider.bikeRegistration}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Geographics & Timestamps */}
                    <td className="py-5 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                          <FaMapMarkerAlt className="text-accent size-3.5" />{" "}
                          {rider.district} (
                          {rider.senderRegion || "Main Region"})
                        </span>
                        <span className="text-[11px] font-medium text-secondary flex items-center gap-1.5">
                          <FaRegClock className="text-accent size-3.5" />
                          {formatDateTime(rider.createdAt)}
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Approval Action Execution Module */}
                    <td className="py-5 pr-6 text-center align-middle">
                      <button className="btn btn-sm min-h-9 h-9 px-5 bg-[#caeb66] hover:bg-[#b8d654] disabled:bg-base-200 border-none text-[#03373d] font-black rounded-xl shadow-xs tracking-wide transition-all uppercase text-xs">
                        {rider.status === "pending" ? "Pending" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveRider;
