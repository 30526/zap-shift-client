import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const HowWorksCard = ({ card }) => {
  return (
    <div className="group relative overflow-hidden bg-[#f5f5f5] p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer">
      <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1">
        <CiDeliveryTruck size={40} className="text-secondary" />
      </div>

      <h2 className="text-secondary font-bold text-xl mb-4">{card.title}</h2>
      <p className="text-accent leading-relaxed">{card.description}</p>
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-secondary transform scale-x-0 transition-transform duration-500 ease-in-out origin-left group-hover:scale-x-100" />
    </div>
  );
};

export default HowWorksCard;
