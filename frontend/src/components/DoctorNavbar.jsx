import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CiUser } from "react-icons/ci";
import { TbReportMedical } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorNavbar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white h-screen absolute w-[15rem] p-6 flex flex-col justify-between shadow-lg">
      {/* Doctor Profile Section */}
      <div className="border-b-2 border-gray-300 pb-6">
        {user ? (
          <p className="font-bold text-2xl text-gray-800">
            Dr. {user?.nickname.split(" ")[0]}
          </p>
        ) : (
          <p className="text-3xl text-[#5F6FFF]">Please login</p>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-8 flex flex-col">
        <NavItem
          label="Dashboard"
          icon={<IoHomeOutline className="text-xl" />}
          path="/user/doctor/"
          isActive={isActive("/user/doctor/")}
          navigate={navigate}
        />
        <NavItem
          label="Patients"
          icon={<CiUser className="text-xl" />}
          path="/user/doctor/patients"
          isActive={isActive("/user/doctor/patients")}
          navigate={navigate}
        />
        <NavItem
          label="Appointments"
          icon={<TbReportMedical className="text-xl" />}
          path="/user/doctor/appointments"
          isActive={isActive("/user/doctor/appointments")}
          navigate={navigate}
        />
      </div>

      {/* Authentication Section */}
      <div className="my-4">
        {isAuthenticated ? (
          <button
            onClick={() => logout()}
            className="text-xl text-[#5F6FFF] cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col items-start">
            <button
              onClick={() => loginWithRedirect()}
              className="text-xl text-[#5F6FFF] cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 cursor-pointer"
            >
              Not a doctor?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ label, icon, path, isActive, navigate }) => (
  <div
    onClick={() => navigate(path)}
    className={`flex items-center gap-2 p-3 rounded-lg my-2 cursor-pointer transition-all duration-300 
      ${
        isActive
          ? "bg-[#5F6FFF] text-white"
          : "hover:bg-[#909bff] hover:text-white text-gray-700"
      }`}
  >
    {icon}
    <p className="text-xl">{label}</p>
  </div>
);

export default DoctorNavbar;
