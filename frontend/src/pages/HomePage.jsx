import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Hero from "../components/Hero.jsx";


const HomePage = () => {
  return (
    <div>
        <Helmet>
          <title> Cool Commerce</title>
        </Helmet>
        <Header />
      <Banner />
      <Hero/>
    </div> 
  );
};

export default HomePage;
