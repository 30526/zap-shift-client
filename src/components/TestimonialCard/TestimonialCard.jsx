import React from 'react';

const TestimonialCard = ({ quote, name, role, isActive }) => {
  return (
   <div className="flex items-center justify-center p-10 font-sans">
      <div 
        className={`relative transition-all duration-700 ease-in-out rounded-[2.5rem] p-10 
        ${isActive 
          ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-100 z-10' 
          : 'bg-[#f0f2f2]/60 opacity-40 scale-90 blur-[1px]'
        } 
        w-full max-w-[420px] min-h-[380px] flex flex-col justify-between`}
      >
        {/* Quote Icon - Refined stroke and color */}
        <div className="mb-6">
          <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6 0C5.64 0 0 5.37 0 12V32H16.8V12H8.4C8.4 9.78 10.27 8 12.6 8V0ZM37.8 0C30.84 0 25.2 5.37 25.2 12V32H42V12H33.6C33.6 9.78 35.47 8 37.8 8V0Z" fill="#C5E2E4"/>
          </svg>
        </div>

        {/* Professional Typography */}
        <p className="text-[#334155] text-[1.05rem] leading-[1.8] font-medium tracking-tight mb-8">
          "{quote}"
        </p>

        {/* Dotted Divider - Precise dash spacing */}
        <div className="w-full border-t border-dashed border-[#cbd5e1] mb-8" style={{ borderDasharray: '4 6' }}></div>

        {/* User Profile Section */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[#084245] flex items-center justify-center overflow-hidden shadow-inner">
               {/* Optional image placeholder */}
               <div className="w-full h-full bg-gradient-to-br from-[#0a5a5e] to-[#084245]" />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[#084245] font-bold text-lg leading-tight tracking-tight">
              {name}
            </h4>
            <span className="text-[#64748b] text-sm font-semibold mt-1">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;