import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCoins,
  FaWeightHanging,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });

  // accept parcel
  const handleDeliveryStatus = (parcel, status) => {
    const statusInfo = { deliveryStatus: status };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center", // Moves the alert to the exact center of the screen
            icon: "success",
            iconColor: "#caeb66", // Brand primary lime
            title: "Parcel Accepted!",
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

  // reject parcel
  const handleRejectedDelivery = (parcel) => {
    const statusInfo = {
      deliveryStatus: "pending-pickup",
      riderEmail: parcel.riderEmail,
    };
    // alert
    Swal.fire({
      title: "Are you sure you want to reject this parcel?",
      html: `<p class="text-sm text-accent/80">Rejecting this parcel will return it to the pending pickup queue. You can accept it later if you change your mind.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66", // Primary (lime green)
      cancelButtonColor: "#03373d", // Secondary (dark teal)
      confirmButtonText:
        '<span style="color: #0b0b0b; font-weight: 600;">Proceed</span>',
      cancelButtonText: '<span style="font-weight: 600;">Cancel</span>',
      iconColor: "#caeb66", // Warning icon color
    }).then((result) => {
      if (result.isConfirmed) {
        // change the parcel status
        axiosSecure
          .patch(`/parcels/${parcel._id}/status`, statusInfo)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "center", // Moves the alert to the exact center of the screen
                icon: "success",
                iconColor: "#caeb66", // Brand primary lime
                title: "Your parcel has been rejected!",
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
      }
    });
  };
  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 overflow-x-hidden">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
              Incoming Delivery Request Matrix
            </h1>
            <p className="text-sm text-accent font-medium">
              Review manifest metrics, payload mass, and routing vectors to
              accept or drop job tasks.
            </p>
          </div>

          {/* Dynamic Request Counter Badge */}
          <div className="bg-secondary/5 border border-secondary/10 px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Open Requests
            </span>
            <span className="bg-primary text-secondary font-black text-lg px-3 py-0.5 rounded-lg shadow-xs font-mono">
              {parcels.length}
            </span>
          </div>
        </div>

        {/* Main Logistics List Container */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <div className="w-full overflow-x-hidden">
            {/* Swaps beautifully from stack layers on mobile to a flat data table grid on large viewports */}
            <table className="w-full table-auto lg:table-fixed border-collapse block lg:table">
              {/* Desktop Table Header Profile Matrix */}
              <thead className="hidden lg:table-header-group">
                <tr className="bg-secondary text-white font-bold text-sm">
                  <th className="py-4 pl-6 text-left w-[25%] rounded-tl-xl">
                    Cargo & Manifest
                  </th>
                  <th className="py-4 text-left w-[42%]">
                    Logistics Routing Path
                  </th>
                  <th className="py-4 text-left w-[15%]">Rider Payout</th>
                  <th className="py-4 pr-6 text-center w-[18%] rounded-tr-xl">
                    Decision Controls
                  </th>
                </tr>
              </thead>

              {/* Dynamic Content Mapping Body */}
              <tbody className="text-dark font-medium block lg:table-row-group divide-y divide-gray-100 lg:divide-none w-full">
                {parcels.length === 0 ? (
                  <tr className="block lg:table-row">
                    <td
                      colSpan="4"
                      className="text-center py-16 text-accent font-semibold block lg:table-cell w-full"
                    >
                      No active delivery assignments found on your dashboard.
                    </td>
                  </tr>
                ) : (
                  parcels.map((parcel) => (
                    <tr
                      key={parcel._id}
                      className="hover:bg-gray-50/60 transition-colors p-4 md:p-5 lg:p-0 flex flex-col lg:table-row w-full space-y-4 lg:space-y-0 border-b border-gray-100 last:border-none"
                    >
                      {/* 1. Cargo Profiles & Manifest Details */}
                      <td className="py-0 lg:py-4 lg:pl-6 align-middle block lg:table-cell w-full lg:w-auto min-w-0">
                        <div className="flex items-start gap-3 w-full min-w-0">
                          <div className="p-3 bg-secondary/5 text-secondary rounded-xl shrink-0 border border-secondary/10 mt-0.5">
                            <FaBoxOpen className="size-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-secondary block truncate text-base lg:text-sm max-w-[calc(100vw-120px)] lg:max-w-none">
                              {parcel.parcelName || "Standard Package"}
                            </span>

                            {/* Sub-Metric Badges Row */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-accent mt-1 font-medium">
                              <span className="font-mono font-bold tracking-wider text-secondary/80 bg-secondary/5 px-1.5 py-0.5 rounded text-[10px] uppercase">
                                {parcel.trackingId || "No Token"}
                              </span>
                              <span className="text-gray-200 hidden sm:inline">
                                •
                              </span>
                              <span className="flex items-center gap-1 bg-red-50 text-red-700 font-bold text-[10px] uppercase px-1.5 py-0.5 rounded border border-red-100">
                                <FaWeightHanging className="size-2" />{" "}
                                {parcel.parcelWeight} kg
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Routing System Path Vectors (Origin -> Destination Layout) */}
                      <td className="py-0 lg:py-4 align-middle block lg:table-cell w-full lg:w-auto min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-dark/90 w-full min-w-0">
                          {/* Extraction Source Point */}
                          <div className="flex items-center gap-1.5 min-w-0 sm:max-w-[45%]">
                            <FaMapMarkerAlt className="text-accent size-3 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[10px] text-accent block font-bold uppercase tracking-wide leading-none mb-0.5">
                                Pickup
                              </span>
                              <span
                                className="block truncate font-bold text-secondary/90"
                                title={parcel.senderAddress}
                              >
                                {parcel.senderAddress}
                              </span>
                            </div>
                          </div>

                          {/* Direction Axis Icon */}
                          <div className="hidden sm:flex items-center justify-center text-gray-300 shrink-0">
                            <FaArrowRight className="size-3" />
                          </div>

                          {/* Final Drop Point Node */}
                          <div className="flex items-center gap-1.5 min-w-0 sm:max-w-[45%] border-t border-dashed border-gray-100 pt-2 sm:pt-0 sm:border-none">
                            <FaMapMarkerAlt className="text-secondary size-3 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[10px] text-accent block font-bold uppercase tracking-wide leading-none mb-0.5">
                                Dropoff
                              </span>
                              <span
                                className="block truncate font-bold text-secondary/90"
                                title={parcel.receiverAddress}
                              >
                                {parcel.receiverAddress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 3. Rider Revenue Value */}
                      <td className="py-0 lg:py-4 align-middle block lg:table-cell w-full lg:w-auto">
                        <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-1">
                          <span className="text-xs font-bold text-accent/70 uppercase tracking-wider lg:hidden">
                            Rider Fee:
                          </span>
                          <span className="text-sm font-black text-secondary flex items-center gap-1 bg-primary/20 px-2.5 py-1 rounded-xl border border-primary/30 shadow-2xs">
                            <FaCoins className="text-secondary size-3 opacity-80" />{" "}
                            {parcel.cost} BDT
                          </span>
                        </div>
                      </td>

                      {/* 4. Symmetrical Trigger Action Controls */}
                      <td className="py-0 lg:py-4 lg:pr-6 align-middle block lg:table-cell w-full lg:w-auto">
                        <div className="flex items-center justify-between lg:justify-end border-t border-dashed border-gray-100 pt-3.5 lg:pt-0 lg:border-none gap-2">
                          <span className="text-xs font-bold text-accent/70 uppercase tracking-wider lg:hidden">
                            Job Actions:
                          </span>

                          <div className="grid gap-2 w-full sm:w-auto justify-end">
                            {/* Accept Package Trigger Button */}
                            {parcel.deliveryStatus === "driver_assigned" ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleDeliveryStatus(
                                      parcel,
                                      "rider_arriving",
                                    )
                                  }
                                  type="button"
                                  className="btn btn-sm bg-primary text-secondary border border-primary/20 hover:bg-secondary hover:text-white font-bold rounded-xl text-xs gap-1 px-3.5 h-9 min-h-9 transition-all active:scale-95 shadow-2xs flex-1 sm:flex-none"
                                >
                                  <FaCheck className="size-2.5" />
                                  Accept Job
                                </button>

                                {/* Reject Package Trigger Button */}
                                <button
                                  onClick={() => handleRejectedDelivery(parcel)}
                                  type="button"
                                  className="btn btn-sm border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white font-bold rounded-xl text-xs gap-1 px-3 h-9 min-h-9 transition-all active:scale-95 shadow-2xs flex-1 sm:flex-none"
                                >
                                  <FaTimes className="size-2.5" />
                                  Reject
                                </button>
                              </>
                            ) : (
                              <>
                                <span>Delivery Accepted</span>
                                <button
                                  onClick={() =>
                                    handleDeliveryStatus(
                                      parcel,
                                      "marked_as_picked_up",
                                    )
                                  }
                                  type="button"
                                  className="btn btn-sm bg-primary text-secondary border border-primary/20 hover:bg-secondary hover:text-white font-bold rounded-xl text-xs gap-1 px-3.5 h-9 min-h-9 transition-all active:scale-95 shadow-2xs flex-1 sm:flex-none"
                                >
                                  <FaCheck className="size-2.5" />
                                  Mark as Picked Up
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeliveryStatus(
                                      parcel,
                                      "marked_as_delivered",
                                    )
                                  }
                                  type="button"
                                  className="btn btn-sm bg-primary text-secondary border border-primary/20 hover:bg-secondary hover:text-white font-bold rounded-xl text-xs gap-1 px-3.5 h-9 min-h-9 transition-all active:scale-95 shadow-2xs flex-1 sm:flex-none"
                                >
                                  <FaCheck className="size-2.5" />
                                  Mark as Delivered
                                </button>
                              </>
                            )}
                          </div>
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
    </>
  );
};

export default AssignedDeliveries;
