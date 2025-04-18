import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

const links = [
  { name: "HOME", path: "/user/patient/home" },
  { name: "BOOK", path: "/user/patient/book" },
  { name: "ABOUT", path: "/user/patient/about" },
  { name: "CONTACT", path: "/user/patient/contact" },
];

const PatientNavbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePatientLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-300 py-4 relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl">Synapse</h1>
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex gap-4 h-8 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-2 hover:border-b-2 hover:border-gray-500 ${
                location.pathname === link.path
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Authentication Section */}
      <div className="relative">
        {!isAuthenticated ? (
          <div>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-[#5F6FFF] p-2 rounded-lg text-white cursor-pointer w-32"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-gray-500 mx-2 cursor-pointer"
            >
              Not a patient?
            </button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="bg-[#ddd9d9] rounded-full p-4">
              <CiUser className="text-xl" />
            </div>
            <BiChevronDown className="text-2xl" />
          </div>
        )}

        {/* Dropdown Menu */}
        {isDropdownOpen && isAuthenticated && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
            <p className="text-gray-800 font-semibold px-2">{user?.name}</p>
            <p className="text-gray-600 text-sm px-2 truncate">{user?.email}</p>
            <hr className="my-2" />
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNavbar;
