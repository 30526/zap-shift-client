import React from "react";
import HowWorksCard from "../../../components/Cards/HowWorksCard/HowWorksCard";

const HowItWorks = () => {
  const cardInfo = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments, we deliver on time, every time.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "Pay for your shipment when it arrives, with our flexible cash on delivery option.",
    },
    {
      id: 3,
      title: "Delivery Hubs",
      description:
        "Our strategically located hubs ensure your packages are always within reach, ready for swift delivery.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "Specialized solutions for small and medium enterprises, as well as corporate clients.",
    },
  ];
  return (
    <div className="my-20">
      <h2 className="text-secondary font-bold text-3xl">How It Works</h2>
      <div className="my-6 flex flex-col md:flex-row gap-4">
        {cardInfo.map((card) => (
          <HowWorksCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
