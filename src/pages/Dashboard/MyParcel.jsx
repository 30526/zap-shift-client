import React from "react";
import { FaTrashAlt, FaEye, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // tanstack query
  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  //  delete parcel
  const handleParcelDelete = (id) => {
    console.log(id);
    // ask if he is sure to delete or not with sweet alert
    Swal.fire({
      title: "Are you sure to delete this?",
      html: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D92243", // Primary (lime green)
      cancelButtonColor: "#03373d", // Secondary (dark teal)
      confirmButtonText: '<span style=" font-weight: 600;">Delete</span>',
      cancelButtonText: '<span style="font-weight: 600;">Cancel</span>',
      iconColor: "#caeb66", // Warning icon color
    }).then((result) => {
      if (result.isConfirmed) {
        // delete the parcel data from database
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted",
              text: "Your parcel request has been deleted.",
              icon: "success",
              confirmButtonColor: "#caeb66",
              confirmButtonText:
                '<span style="color: #0b0b0b; font-weight: 600;">OK</span>',
              iconColor: "#caeb66", // Success icon color
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-secondary tracking-tight">
            My Parcels
          </h1>
          <p className="text-sm text-accent mt-1">
            Manage and track your delivery orders
          </p>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-50">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs font-medium uppercase tracking-wider text-accent">
              Total Shipments
            </div>
            <div className="stat-value text-2xl text-secondary font-black">
              {parcels.length}
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-auto p-4">
            {/* Table Head */}
            <thead>
              <tr className="bg-base-200 border-b border-base-300 text-secondary font-semibold text-sm">
                <th className="py-4 pl-6 w-12 text-center">#</th>
                <th className="py-4">Item Details</th>
                <th className="py-4">Delivery Cost</th>
                <th className="py-4">Payment Status</th>
                <th className="py-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-secondary/90 font-medium">
              {parcels.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-accent">
                    No parcels found. Create an order to get started.
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, i) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-base-50/50 transition-colors border-b border-base-200"
                  >
                    {/* Index */}
                    <td className="pl-6 text-center text-accent/80 font-mono text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </td>

                    {/* Parcel Name */}
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-secondary hover:text-primary-focus transition-colors">
                          {parcel.parcelName || "Standard Package"}
                        </span>
                        <span className="text-xs text-accent font-normal flex items-center gap-1 mt-0.5">
                          <FaCalendarAlt className="size-3" /> ID:{" "}
                          {parcel._id?.slice(-8) || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Cost */}
                    <td className="py-4 font-semibold text-secondary">
                      {parcel.cost ? `${parcel.cost} BDT` : "—"}
                    </td>

                    {/* Payment Status (Styled with clean badges) */}
                    <td className="py-4">
                      {parcel.paymentStatus === "Paid" ? (
                        <span className="badge badge-success badge-sm gap-1 py-3 px-3 font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-sm gap-1 py-3 px-3 font-semibold bg-amber-50 text-amber-700 border-amber-200">
                          <span className="size-1.5 rounded-full bg-amber-500"></span>
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          className="btn btn-square btn-sm btn-ghost text-accent hover:text-secondary hover:bg-base-200 tooltip tooltip-top"
                          data-tip="View Details"
                        >
                          <FaRegEdit className="size-4" />
                        </button>
                        {/* View Button */}
                        <button
                          className="btn btn-square btn-sm btn-ghost text-accent hover:text-secondary hover:bg-base-200 tooltip tooltip-top"
                          data-tip="View Details"
                        >
                          <FaEye className="size-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="btn btn-square btn-sm btn-ghost text-error/70 hover:text-error hover:bg-error/10 tooltip tooltip-top"
                          data-tip="Delete Parcel"
                        >
                          <FaTrashAlt className="size-3.5" />
                        </button>
                      </div>
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

export default MyParcel;
