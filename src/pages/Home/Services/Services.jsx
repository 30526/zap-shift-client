import React from "react";
import ServiceCard from "../../../components/Cards/ServiceCard/ServiceCard";

const Services = () => {
  return (
    <div className="bg-secondary p-20 rounded-3xl my-20">
      <h3 className="text-3xl font-bold text-white text-center">
        Our Services
      </h3>
      <p className=" text-base-content text-center my-4">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle.<br></br> From personal packages to business shipments, we
        deliver on time, every time.
      </p>
      <ServiceCard></ServiceCard>
    </div>
  );
};

export default Services;
