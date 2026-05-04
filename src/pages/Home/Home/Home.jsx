import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";
import { BrandMarquee } from "../BrandMarquee/BrandMarquee";

const Home = () => {
  return (
    <div>
      <section className="my-4">
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <Services></Services>
        <BrandMarquee></BrandMarquee>
      </section>
    </div>
  );
};

export default Home;
