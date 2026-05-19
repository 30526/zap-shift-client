import React from "react";
import { Link, useNavigate } from "react-router";
import {
  FaExclamationTriangle,
  FaArrowLeft,
  FaSyncAlt,
  FaLifeRing,
} from "react-icons/fa";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto my-12 p-4 md:p-6 text-center">
      {/* Cancellation Card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden">
        {/* Top Decorative Warning Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500"></div>

        {/* Warning Icon Wrapper */}
        <div className="flex justify-center">
          <div className="relative">
            <FaExclamationTriangle className="size-14 text-amber-500" />
            <div className="absolute inset-0 size-14 bg-amber-500/10 rounded-full blur-md -z-10"></div>
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-secondary tracking-tight">
            Transaction Canceled
          </h1>
          <p className="text-sm text-accent max-w-xs mx-auto">
            The payment process was abandoned or interrupted. Don't worry—your
            account has not been charged.
          </p>
        </div>

        <div className="divider my-2"></div>

        {/* Informative Checklist for the User */}
        <div className="bg-base-50 p-4 rounded-xl border border-base-200 text-left space-y-2">
          <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
            Common issues:
          </h4>
          <ul className="text-xs text-accent space-y-1.5 list-disc list-inside">
            <li>Session expired or window closed mid-way.</li>
            <li>Incomplete card details or strict bank verification (OTP).</li>
            <li>Manual cancellation on the payment gateway page.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Primary Action: Go Back / Try Again */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary w-full text-white font-bold border-none hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
          >
            <FaSyncAlt className="size-3.5 transition-transform group-hover:rotate-45" />
            Try Payment Again
          </button>

          {/* Secondary Action: Safely return to Dashboard */}
          <Link
            to="/dashboard/my-parcel"
            className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-secondary w-full gap-2 text-accent font-semibold"
          >
            <FaArrowLeft className="size-3" /> Return to Dashboard
          </Link>
        </div>
      </div>

      {/* Instant Help Option */}
      <div className="flex items-center justify-center gap-2 text-xs text-accent mt-6">
        <FaLifeRing className="size-4 text-primary" />
        <span>Need assistance with billing?</span>
        <span className="text-secondary font-bold underline cursor-pointer hover:text-primary transition-colors">
          Talk to Support
        </span>
      </div>
    </div>
  );
};

export default PaymentCancel;
