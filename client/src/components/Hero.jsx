import React, { useState } from "react";
import { axiosRequest } from "../axios";
import { useNavigate } from "react-router-dom";

const Hero = ({ type }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    if (type === "register") {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    } else {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (loginData.email !== "" && loginData.password !== "") {
        const res = await axiosRequest.post("/users/login", loginData);
        localStorage.setItem("email", JSON.stringify(res.data.email));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        // navigate("/");
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerData.email !== "" && registerData.password !== "") {
        const res = await axiosRequest.post("/users/", registerData);
        localStorage.setItem("email", JSON.stringify(res.data.email));
        localStorage.setItem("name", JSON.stringify(res.data.name));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center flex-col lg:flex-row justify-between lg:h-[calc(100vh-5rem)] py-10 px-5 lg:px-10">
      <div className="h-full w-full">
        <div className="container mx-auto flex flex-col my-auto align-middle h-full mt-[-20px]">
          <div className="my-auto text-center lg:text-start lg:text-7xl  mx-auto lg:mx-0 w-10/12 lg:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold lg:font-bold mb-2 z-[99]">
              <span className="text-[#1e1f26] leading-10">
                Empower Your Creative Ideas with Notes
              </span>
            </h1>
            <p className="text-base lg:text-lg font-medium lg:font-semibold mb-8">
              Turning Your Thoughts into Action: Start Noting, Start Thriving
            </p>
          </div>
        </div>
      </div>

      {type === "register" ? (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-black bg-opacity-50 rounded-xl text-black">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              Create an Account
            </h1>
            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla
            </p>
          </div>

          <form
            onSubmit={(e) => handleRegister(e)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <div className="relative">
                <input
                  name="name"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Full Name"
                  value={registerData.name}
                  onChange={(e) => handleChange(e, "register")}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={registerData.email}
                  onChange={(e) => handleChange(e, "register")}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={registerData.password}
                  onChange={(e) => handleChange(e, "register")}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-100">
                Already have an account?&nbsp;
                <a className="underline" href="">
                  Sign In
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-[#ffaa00] px-5 py-2 text-sm font-medium text-black hover:bg-[#ffb700] transition-all duration-100"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-black bg-opacity-50 rounded-xl text-black">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque
            </p>
          </div>

          <form
            onSubmit={(e) => handleLogin(e)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <div className="relative">
                <input
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, "login")}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "login")}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-100">
                No account?&nbsp;
                <a className="underline" href="/register">
                  Sign up
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-[#ffaa00] px-5 py-2 text-sm font-medium text-black hover:bg-[#ffb700] transition-all duration-100"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Hero;
