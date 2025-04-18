import React from "react";
import { useNavigate } from "react-router-dom";
import DOCTORS_IMAGE from "../../assets/doctors.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex bg-[#5F6FFF] text-white my-12 rounded-lg shadow-2xl">
        <div className="w-1/2 p-12 h-[30rem] flex flex-col justify-center items-start gap-4">
          <h1 className="text-3xl font-bold">
            Book Appointment With Trusted Doctors
          </h1>
          <p className="text-sm">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free
          </p>
          <button
            onClick={() => navigate("/user/patient/book")}
            className="text-black bg-white rounded-full py-2 px-6 cursor-pointer hover:text-white hover:bg-[#474c81] transition-all"
          >
            Book Appointment →
          </button>
        </div>

        <div className="w-1/2 flex justify-end items-end h-[30rem]">
          <img
            src={DOCTORS_IMAGE}
            alt="Doctor"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">Find by Speciality</h1>
        <p className="text-center w-1/2 mx-auto my-8 text-gray-500">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>
    </div>
  );
};

export default Home;
