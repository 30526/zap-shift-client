import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";
import { BrandMarquee } from "../BrandMarquee/BrandMarquee";
import { SupportSection } from "../SupportSection/SupportSection";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <section className="my-4">
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <Services></Services>
        <BrandMarquee></BrandMarquee>
        <SupportSection></SupportSection>
        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
      </section>
    </div>
  );
};

export default Home;
