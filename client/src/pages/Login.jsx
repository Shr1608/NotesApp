import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="flex flex-col max-w-screen bg">
      <Navbar />
      <Hero type="login"  />
    </div>
  );
};

export default Login;
