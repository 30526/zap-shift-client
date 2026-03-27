import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg01 from "../../../assets/banner/banner1.png";
import bannerImg02 from "../../../assets/banner/banner2.png";
import bannerImg03 from "../../../assets/banner/banner3.png";
import { FiArrowUpRight } from "react-icons/fi";

const Banner = () => {
  const buttons = (
    <div className="lg:absolute inset-0 flex mt-6 lg:top-108 lg:left-22">
      <button className="btn btn-primary">Track Your Parcel</button>
      <button className="btn bg-black rounded-full px-2.5 animate-bounce hover:animate-none">
        <FiArrowUpRight size={20} className="text-primary" />
      </button>
      <button className="btn btn-secondary ml-4">Be A Rider</button>
    </div>
  );
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      <div className="relative">
        <img src={bannerImg01} className="w-full h-full object-cover" />
        {buttons}
      </div>

      <div className="relative">
        <img src={bannerImg02} className="w-full h-full object-cover" />
        {buttons}
      </div>
      <div className="relative">
        <img src={bannerImg03} className="w-full h-full object-cover" />
        {buttons}
      </div>
    </Carousel>
  );
};

export default Banner;
