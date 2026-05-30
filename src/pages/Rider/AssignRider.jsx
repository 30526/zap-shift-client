import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaUser,
  FaMapMarkerAlt,
  FaCoins,
  FaBiking,
  FaCalendarAlt,
} from "react-icons/fa";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );

      return res.data;
    },
  });

  const handleAssignRider = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 overflow-x-hidden">
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
            Rider Assignment Hub
          </h1>
          <p className="text-sm text-accent font-medium">
            Allocate incoming delivery requests to active logistics personnel.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="bg-secondary/5 border border-secondary/10 px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
            Pending Dispatch
          </span>
          <span className="bg-primary text-secondary font-black text-lg px-3 py-0.5 rounded-lg shadow-xs font-mono">
            {parcels.length}
          </span>
        </div>
      </div>

      {/* Main Logistics Matrix Wrapper */}
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
        <div className="w-full overflow-x-hidden">
          {/* Changes from block layout on mobile viewports to a strict semantic layout table structure on desktop */}
          <table className="w-full table-auto lg:table-fixed border-collapse block lg:table">
            {/* Desktop Table Header Matrix - Entirely hidden on mobile viewports */}
            <thead className="hidden lg:table-header-group">
              <tr className="bg-secondary text-white font-bold text-sm">
                <th className="py-4 pl-6 text-left w-[30%] rounded-tl-xl">
                  Parcel Manifest & ID
                </th>
                <th className="py-4 text-left w-[22%]">Sender Profile</th>
                <th className="py-4 text-left w-[25%]">Collection Hub</th>
                <th className="py-4 text-left w-[13%]">Metric Cost</th>
                <th className="py-4 pr-6 text-center w-[10%] rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-dark font-medium block lg:table-row-group divide-y divide-gray-100 lg:divide-none w-full">
              {parcels.length === 0 ? (
                <tr className="block lg:table-row">
                  <td
                    colSpan="5"
                    className="text-center py-16 text-accent font-semibold block lg:table-cell w-full"
                  >
                    No packages are currently waiting to be allocated to riders.
                  </td>
                </tr>
              ) : (
                parcels.map((parcel) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50/60 transition-colors p-4 md:p-5 lg:p-0 flex flex-col lg:table-row w-full space-y-3.5 lg:space-y-0 border-b border-gray-100 last:border-none"
                  >
                    {/* 1. Parcel Details & Identity Tracking Manifest */}
                    <td className="py-0 lg:py-4 lg:pl-6 align-middle block lg:table-cell w-full lg:w-auto min-w-0">
                      <div className="flex items-start gap-3 w-full min-w-0">
                        <div className="p-3 bg-secondary/5 text-secondary rounded-xl shrink-0 border border-secondary/10 mt-0.5">
                          <FaBoxOpen className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-secondary block truncate text-base lg:text-sm max-w-[calc(100vw-120px)] lg:max-w-none">
                            {parcel.parcelName || "Standard Consignment"}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-accent mt-0.5 font-medium">
                            <span className="font-mono font-bold tracking-wider text-secondary/80 bg-secondary/5 px-1.5 py-0.5 rounded text-[10px] uppercase">
                              {parcel.trackingId || "UNTRACKED"}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1 text-[11px]">
                              <FaCalendarAlt className="size-2.5 opacity-70" />
                              {formatDate(parcel.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Sender Profile Layer */}
                    <td className="py-0 lg:py-4 align-middle block lg:table-cell w-full lg:w-auto min-w-0">
                      <div className="space-y-0.5 min-w-0 w-full">
                        <div className="flex items-center gap-1.5 text-sm text-secondary font-bold">
                          <FaUser className="text-accent/40 size-3 shrink-0" />
                          <span className="truncate max-w-[calc(100vw-60px)] lg:max-w-none">
                            {parcel.senderName}
                          </span>
                        </div>
                        <span className="text-xs text-accent block font-mono pl-4 truncate">
                          {parcel.senderPhone}
                        </span>
                      </div>
                    </td>

                    {/* 3. Collection Hub Location (Where to pick up) */}
                    <td
                      className="py-0 lg:py-4 align-middle block lg:table-cell w-full lg:w-auto min-w-0"
                      title={parcel.receiverAddress}
                    >
                      <div className="flex items-start gap-1.5 text-xs lg:text-sm text-dark/80 w-full min-w-0">
                        <FaMapMarkerAlt className="text-accent size-3.5 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="block truncate font-bold text-secondary/90 max-w-[calc(100vw-60px)] lg:max-w-none">
                            {parcel.receiverAddress || "No address provided"}
                          </span>
                          <span className="block text-[11px] text-accent font-semibold mt-0.5 truncate">
                            {parcel.receiverDistrict}, {parcel.receiverRegion}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 4. Financial Cost Metrics */}
                    <td className="py-0 lg:py-4 align-middle block lg:table-cell w-full lg:w-auto">
                      <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-1">
                        <span className="text-xs font-bold text-accent/70 uppercase tracking-wider lg:hidden">
                          Cost Value:
                        </span>
                        <span className="text-sm font-black text-secondary flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-lg border border-primary/30">
                          <FaCoins className="text-secondary size-3 opacity-80" />{" "}
                          {parcel.cost} BDT
                        </span>
                      </div>
                    </td>

                    {/* 5. Functional Action Trigger Button Grid Layer */}
                    <td className="py-0 lg:py-4 lg:pr-6 align-middle block lg:table-cell w-full lg:w-auto">
                      <div className="flex items-center justify-between lg:justify-center border-t border-dashed border-gray-100 pt-3.5 lg:pt-0 lg:border-none">
                        <span className="text-xs font-bold text-accent/70 uppercase tracking-wider lg:hidden">
                          Management:
                        </span>
                        <button
                          onClick={() => handleAssignRider()}
                          type="button"
                          className="btn btn-sm bg-primary text-secondary border border-primary/20 hover:bg-secondary hover:text-white font-bold rounded-xl text-xs gap-1.5 px-4 h-9 min-h-9 transition-all active:scale-98 shadow-xs"
                        >
                          <FaBiking className="size-3.5" />
                          Assign Rider
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
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
