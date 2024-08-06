import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Banner1 from "../components/Banner1.jsx";
import Hero from "../components/Hero.jsx";


const HomePage = () => {
  return (
    <div>
        <Helmet>
          <title> Cool Commerce</title>
        </Helmet>
        <Header />
      <Banner />
      <Banner1 />
      <Hero/>
    </div> 
  );
};

export default HomePage;
