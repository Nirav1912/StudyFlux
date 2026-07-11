import React from "react";
// We use ../../ to go up from Landing/ then up from pages/ to reach src/
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import Contact from "../../components/landing/Contact";
import Footer from "../../components/landing/Footer";

export default function Landing() {
  return (
    <div className="relative w-full bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}