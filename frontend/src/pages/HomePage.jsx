import React from "react";
import { Link } from "react-router-dom";
import DOCTOR_IMG from "../assets/doctor.png";
import COLORED_LOGO from "../assets/colored_logo.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5F6FFF] px-6">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex">
          <img src={COLORED_LOGO} alt="Synapse" className="h-10 my-2" />
          {/* <h1 className="text-white text-3xl font-bold my-2">Synapse</h1> */}
        </div>

        <div className="flex flex-col lg:flex-row items-center bg-white gap-12 shadow-2xl rounded-xl p-8 lg:p-12">
          {/* Left Half - Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white p-6">
              <img
                src={DOCTOR_IMG}
                className="max-w-[90%] lg:max-w-lg w-full h-auto object-contain"
                alt="Doctor"
              />
            </div>
          </div>

          {/* Right Half - Text & Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left bg-white p-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-gray-600 mt-4 text-lg max-w-lg">
              Book appointments effortlessly and get expert consultations at
              your convenience. Join us in making healthcare simpler.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-6">
              <Link
                to="/user/patient/home"
                className="bg-[#5F6FFF] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-100 hover:border-[#5F6FFF] hover:text-black transition-all shadow-md"
              >
                Book Appointment
              </Link>
              <Link
                to="/user/doctor/"
                className="border border-[#5F6FFF] text-[#5F6FFF] px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-100 transition-all shadow-md"
              >
                Doctor Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
