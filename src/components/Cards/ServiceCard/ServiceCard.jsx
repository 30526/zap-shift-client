import React from "react";
import { PiTruckFill } from "react-icons/pi";
import { FaGlobeAsia } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";

const ServiceCard = () => {
  const services = [
    {
      icon: PiTruckFill,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery is available in Dhaka within 4–6 hours, ensuring fast and reliable service from pick-up to drop-off.",
    },
    {
      icon: FaGlobeAsia,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with reliable home delivery service in every district across Bangladesh. Our efficient logistics network ensures your products reach customers safely within 48–72 hours.",
    },
    {
      icon: MdInventory,
      title: "Fulfillment Solution",
      description:
        "We provide complete fulfillment solutions including inventory management, order processing, packaging, and delivery support. Our service helps businesses streamline operations and focus on growth.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Cash on Home Delivery",
      description:
        "We offer 100% cash on delivery service anywhere in Bangladesh, ensuring safe transactions and customer satisfaction. Your payments are handled securely with guaranteed reliability.",
    },
    {
      icon: FaHandshake,
      title: "Corporate Service / Contract In Logistics",
      description:
        "We offer customized corporate logistics solutions including warehousing, bulk delivery, and inventory management. Designed for businesses, our service ensures efficiency, scalability, and reliability.",
    },
    {
      icon: TbTruckReturn,
      title: "Parcel Return",
      description:
        "Our reverse logistics system allows customers to return or exchange products. We ensure smooth and hassle-free return handling to support both businesses and end customers.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {services.map((service, i) => (
        <div
          key={i}
          className="text-center p-8 bg-[#f5f5f5] rounded-xl hover:bg-primary transition-colors duration-300 cursor-pointer"
        >
          <span className="flex justify-center">
            <service.icon size={50} className="text-secondary" />
          </span>
          <h2 className="text-2xl font-bold text-secondary my-4">
            {service.title}
          </h2>
          <p className="text-accent">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
