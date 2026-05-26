import React from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaHome, FaShieldAlt, FaLock } from "react-icons/fa";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 md:p-8 font-sans antialiased select-none">
      {/* Horizontal Split Layout Container */}
      <div className="w-full max-w-4xl bg-base-100 rounded-3xl border border-base-300 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        {/* Left Side: Premium CSS Security Animation Engine (Replaces Lottie) */}
        <div className="w-full md:w-1/2 bg-base-200/40 flex flex-col items-center justify-center p-8 border-b border-base-300 md:border-b-0 md:border-r border-dashed relative overflow-hidden group">
          {/* Ambient Grid Accents */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative flex items-center justify-center w-full max-w-[240px] aspect-square">
            {/* Outer Rotating Radar Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-error/20 animate-[spin_40s_linear_infinite]" />

            {/* Middle Pulsing Ring */}
            <div className="absolute inset-4 rounded-full bg-error/[0.03] border border-error/10 animate-[pulse_3s_ease-in-out_infinite]" />

            {/* Inner Core Shield */}
            <div className="relative bg-gradient-to-b from-error/5 to-error/[0.01] border border-error/20 p-8 rounded-3xl shadow-2xs backdrop-blur-xs transition-transform duration-500 group-hover:scale-105">
              <div className="relative">
                <FaLock className="size-16 text-error/90 animate-[bounce_2.5s_ease-in-out_infinite]" />
                {/* Micro Scanning Laser Bar */}
                <div className="absolute -inset-x-2 h-[2px] bg-error/50 top-1/2 rounded-full animate-[ping_2s_linear_infinite] opacity-40" />
              </div>
            </div>
          </div>

          {/* Status Indicator Bead */}
          <div className="mt-6 flex items-center gap-2 bg-error/10 border border-error/20 px-3 py-1 rounded-full shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
            </span>
            <span className="text-[11px] font-mono font-bold text-error uppercase tracking-wider">
              Enforcement Active
            </span>
          </div>
        </div>

        {/* Right Side: System Context Info & Action Interfaces */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between space-y-8 bg-base-100">
          {/* Header Segment */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-error uppercase bg-error/10 border border-error/20 px-3 py-1.5 rounded-md font-mono">
              <FaShieldAlt /> Access Restriction Layer
            </div>

            <div className="space-y-1.5">
              <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight leading-none">
                403: Forbidden
              </h1>
              <h2 className="text-base font-bold text-secondary/60 tracking-tight">
                Restricted Administrative Node
              </h2>
            </div>

            <p className="text-sm text-accent font-medium leading-relaxed">
              Your system account configuration does not possess the clearance
              layers required to interface with this target administration
              directory.
            </p>
          </div>

          {/* Secure Technical Meta Card */}
          <div className="bg-base-50 p-4 rounded-xl border border-base-300 font-mono text-xs text-accent space-y-2.5 shadow-2xs">
            <div className="flex justify-between items-center">
              <span className="text-accent/80">Security Protocol:</span>
              <span className="text-secondary font-semibold">
                RBAC Token Verification
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-base-200 pt-2.5">
              <span className="text-accent/80">Resolve Status:</span>
              <span className="text-error font-bold tracking-wide uppercase text-[10px] bg-error/10 border border-error/20 px-2 py-0.5 rounded">
                Access Denied
              </span>
            </div>
          </div>

          {/* Navigation Action Buttons (Symmetrical Responsive Array) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="btn border border-base-300 text-secondary bg-base-100 hover:bg-base-200/60 font-semibold rounded-xl text-sm transition-all h-12 min-h-12 normal-case active:scale-98 flex items-center justify-center gap-2 shadow-2xs"
            >
              <FaArrowLeft className="size-3" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="btn text-white bg-secondary border-none hover:bg-secondary/90 font-semibold rounded-xl text-sm tracking-wide transition-all h-12 min-h-12 normal-case active:scale-98 flex items-center justify-center gap-2 shadow-xs"
            >
              <FaHome className="size-3.5" />
              Home Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
