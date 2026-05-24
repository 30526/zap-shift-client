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
  FaTrash,
  FaUserCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: riders = [],
    refetch,
  } = useQuery({
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

  // update rider status
  const updateRiderStatus = (rider, newStatus) => {
    const updateInfo = { status: newStatus, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center", // Moves the alert to the exact center of the screen
          icon: "success",
          iconColor: "#caeb66", // Brand primary lime
          title: `Rider Has Been ${newStatus}`,
          showConfirmButton: false,
          timer: 2500,
          background: "#03373d", // Brand secondary deep dark green
          color: "#ffffff", // High contrast text color
          customClass: {
            popup: "rounded-2xl border border-[#b8b7b7]/10 shadow-2xl", // Smooth corner matching
            title: "font-bold text-lg tracking-tight",
          },
        });
      }
    });
  };

  // handle rider approval
  const handleRiderApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  // handle rider rejection
  const handleRiderRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
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
                    <td className="py-5 pr-6 align-middle">
                      {rider.status === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                          {/* 1. ACCEPT BUTTON */}
                          <div
                            className="tooltip tooltip-top font-semibold text-xs"
                            data-tip="Accept Application"
                          >
                            <button
                              onClick={() => handleRiderApproval(rider)}
                              className="btn btn-square btn-sm min-h-9 h-9 w-9 bg-primary/50 hover:bg-[#caeb66] text-secondary border-none rounded-xl transition-all shadow-xs group"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="size-4 group-hover:scale-110 transition-transform"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* 2. REJECT BUTTON */}
                          <div
                            className="tooltip tooltip-top font-semibold text-xs"
                            data-tip="Reject Application"
                          >
                            <button
                              onClick={() => handleRiderRejection(rider)}
                              className="btn btn-square btn-sm min-h-9 h-9 w-9 bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white border-none rounded-xl transition-all shadow-xs group"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="size-4 group-hover:scale-110 transition-transform"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* 3. TRASH BUTTON */}
                          <div
                            className="tooltip tooltip-top font-semibold text-xs"
                            data-tip="Delete Permanently"
                          >
                            <button className="btn btn-square btn-sm min-h-9 h-9 w-9 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white border-none rounded-xl transition-all shadow-xs group">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* APPROVED BADGE */}
                      {rider.status === "approved" && (
                        <div className="flex items-center justify-center">
                          <div className="font-bold flex items-center badge badge-success bg-emerald-50 text-emerald-700 border-emerald-100 rounded-md px-2.5 py-3 text-xs tracking-wide uppercase">
                            Approved
                          </div>
                        </div>
                      )}

                      {/* REJECTED BADGE */}
                      {rider.status === "rejected" && (
                        <div className="flex items-center justify-center">
                          <div className="font-bold flex items-center badge badge-error bg-rose-50 text-rose-700 border-rose-100 rounded-md px-2.5 py-3 text-xs tracking-wide uppercase">
                            Rejected
                          </div>
                        </div>
                      )}
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
