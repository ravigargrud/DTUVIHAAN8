import React, { useEffect } from "react";
import PatientNavbar from "../../components/PatientNavbar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="h-screen w-10/12 mx-auto">
      <PatientNavbar />

      <Outlet />
    </div>
  );
};

export default PatientLayout;
