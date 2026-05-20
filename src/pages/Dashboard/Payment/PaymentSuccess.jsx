import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
  FaPrint,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(() => {
          // console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  // In a real app, you might fetch these from URL search params or state passed via router
  const transactionId =
    "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-md mx-auto my-12 p-4 md:p-6 text-center">
      {/* Success Card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden">
        {/* Top Decorative Brand Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>

        {/* Success Icon Animation Wrapper */}
        <div className="flex justify-center">
          <div className="relative">
            <FaCheckCircle className="size-16 text-emerald-500 animate-bounce" />
            <div className="absolute inset-0 size-16 bg-emerald-500/10 rounded-full blur-md -z-10"></div>
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-secondary tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-sm text-accent max-w-xs mx-auto">
            Thank you for your order. Your shipment allocation has been
            successfully processed.
          </p>
        </div>

        <div className="divider my-2"></div>

        {/* Transaction Summary Box */}
        <div className="bg-base-50 p-4 rounded-xl border border-base-200 text-left space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-accent font-medium uppercase tracking-wider">
              Transaction ID
            </span>
            <span className="font-mono font-bold text-secondary">
              {transactionId}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-accent font-medium uppercase tracking-wider">
              Date
            </span>
            <span className="font-medium text-secondary flex items-center gap-1">
              <FaCalendarAlt className="size-3 text-accent" /> {currentDate}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-accent font-medium uppercase tracking-wider">
              Payment Method
            </span>
            <span className="font-medium text-secondary">Stripe / Card</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Main Action: Back to Dashboard */}
          <Link
            to="/dashboard/my-parcel"
            className="btn btn-primary w-full text-secondary font-bold border-none hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
          >
            Go to Dashboard
            <FaArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary Action: Print Receipt / Help */}
          <button
            onClick={() => window.print()}
            className="btn btn-sm btn-ghost w-full gap-2 text-accent hover:text-secondary font-medium"
          >
            <FaPrint className="size-3" /> Print Receipt
          </button>
        </div>
      </div>

      {/* Subtle Support Subtext */}
      <p className="text-xs text-accent mt-6">
        Having trouble? Contact our corporate support channel at{" "}
        <span className="text-secondary font-semibold underline cursor-pointer">
          support@zapshift.com
        </span>
      </p>
    </div>
  );
};

export default PaymentSuccess;
