import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import {
  FaBoxOpen,
  FaCreditCard,
  FaLock,
  FaArrowLeft,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error("Checkout redirection failed:", error);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-80px)] flex flex-col justify-center">
      {/* Back Button Link */}
      <div className="flex items-center">
        <Link
          to="/dashboard/my-parcel"
          className="btn btn-sm btn-ghost gap-2 text-accent hover:text-secondary px-2"
        >
          <FaArrowLeft className="size-3" /> Back to My Parcels
        </Link>
      </div>

      {/* Main Grid Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-base-100 border border-base-300 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <span className="badge badge-primary bg-primary text-secondary font-bold px-3 py-2.5 rounded-md text-xs tracking-wide uppercase">
                Secure Checkout
              </span>
              <h1 className="text-3xl font-black text-secondary tracking-tight mt-3">
                Review Your Order
              </h1>
              <p className="text-sm text-accent mt-1">
                Please check your shipment particulars before initiating
                payment.
              </p>
            </div>

            <div className="divider my-2"></div>

            {/* Displaying Item Metadata */}
            <div className="flex gap-4 items-start bg-base-50 p-4 rounded-xl border border-base-200">
              <div className="p-3 bg-white text-secondary rounded-lg border border-base-300 shadow-xs">
                <FaBoxOpen className="size-6 text-secondary" />
              </div>
              <div className="space-y-1 grow">
                <div className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Item Label
                </div>
                <h3 className="font-bold text-secondary text-lg">
                  {parcel?.parcelName || "Standard Consignment"}
                </h3>
                <p className="text-xs font-mono text-accent/80">
                  Ref ID: #{parcel?._id?.toUpperCase()}
                </p>
              </div>
            </div>

            {/* User Details Row */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                <FaEnvelope className="text-accent size-4" />
                <span>Account Email:</span>
                <span className="text-accent font-normal ml-auto break-all">
                  {parcel?.senderEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cost Card Breakdown */}
        <div className="lg:col-span-5">
          <div className="bg-secondary text-white p-6 md:p-8 rounded-2xl shadow-md border border-secondary space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                <FaCreditCard className="size-5 text-primary" /> Payment Summary
              </h2>
              <div className="divider divider-neutral opacity-20"></div>

              {/* Receipt Breakdown Line Elements */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Base Shipping Fee</span>
                  <span>{parcel?.cost} BDT</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Processing Surcharge</span>
                  <span>0.00 BDT</span>
                </div>
                <div className="divider divider-neutral opacity-20 my-1"></div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-bold text-base text-white/90">
                    Amount Due
                  </span>
                  <span className="text-3xl font-black text-primary tracking-tight">
                    {parcel?.cost}{" "}
                    <span className="text-xs font-normal text-white/70">
                      BDT
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Trigger Button */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handlePayment}
                className="btn bg-primary animate-pulse w-full text-secondary font-bold text-base border-none hover:opacity-90 hover:animate-none transition-opacity flex items-center justify-center gap-2 py-4 h-auto shadow-md"
              >
                Proceed to Payment
              </button>

              {/* Trust Subtext badges */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-white/60 font-medium">
                <FaLock className="size-3 text-primary" /> End-to-End Encrypted
                Gateway Transaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
