import React from "react";
import DoctorNavbar from "../../components/DoctorNavbar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="bg-[#DDD9D9] h-screen">
      <DoctorNavbar />

      <div className="ml-[15rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
