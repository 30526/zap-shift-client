import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["pamentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // Helper function to cleanly format the ISO date string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-4xl font-black text-[#03373d] tracking-tight">
          Payment History
        </h1>
        <p className="text-sm text-accent mt-1">
          Review your recent transaction invoices
        </p>
      </div>

      {/* Main Container Layer */}
      <div className="overflow-hidden rounded-2xl border border-base-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-collapse">
            {/* Table Header Section aligned with your data keys */}
            <thead>
              <tr className="bg-base-50 text-secondary border-b border-base-200 font-medium text-sm">
                <th className="py-4 pl-6 font-semibold">Parcel Details</th>
                <th className="py-4 font-semibold">Paid At</th>
                <th className="py-4 font-semibold">Transaction Reference</th>
                <th className="py-4 font-semibold">Amount Paid</th>
                <th className="py-4 pr-6 text-center font-semibold">Action</th>
              </tr>
            </thead>

            {/* Table Rows Body Area */}
            <tbody className="text-secondary/90 text-sm">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-accent">
                    No payment statements recorded under this account profile.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-base-100 transition-colors"
                  >
                    {/* Column 1: Parcel Name & Hex ID Object */}
                    <td className="py-5 pl-6 align-middle">
                      <div className="flex flex-col">
                        <span className="font-semibold text-secondary">
                          {payment.parcelName || "Standard Consignment"}
                        </span>
                        <span className="text-xs font-mono text-accent mt-0.5">
                          ID: {payment.parcelId?.slice(-8) || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Date String Parser */}
                    <td className="py-5 align-middle text-secondary/80 font-medium">
                      {formatDate(payment.paidAt)}
                    </td>

                    {/* Column 3: Transaction ID / System Object Key Reference */}
                    <td className="py-5 align-middle font-mono text-xs">
                      {payment.transactionId ? (
                        <span className="text-secondary">
                          {payment.transactionId}
                        </span>
                      ) : (
                        <span className="text-accent italic bg-base-100 px-2 py-1 rounded-md border border-base-200">
                          Ref: #{payment._id?.slice(-8).toUpperCase()}
                        </span>
                      )}
                    </td>

                    {/* Column 4: Amount & Fixed Status Badge */}
                    <td className="py-5 align-middle">
                      <div className="flex items-center gap-2 font-bold text-secondary">
                        <span className="uppercase">
                          {payment.amount} {payment.currency || "usd"}
                        </span>
                        <span className="badge badge-sm rounded-md bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold px-2 py-2.5 uppercase tracking-wider">
                          {payment.paymentStatus || "paid"}
                        </span>
                      </div>
                    </td>

                    {/* Column 5: View Action Trigger */}
                    <td className="py-5 pr-6 text-center align-middle">
                      <button className="btn btn-sm min-h-9 h-9 px-5 bg-[#e4f2f3] hover:bg-[#d5ebee] border-none text-secondary font-bold rounded-lg shadow-xs transition-all tracking-wide">
                        View
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

export default PaymentHistory;
