import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Register = () => {
  return (
    <div className="flex flex-col max-w-screen bg">
      <Navbar />
      <Hero type="register"  />
    </div>
  );
};

export default Register;
