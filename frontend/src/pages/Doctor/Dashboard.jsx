import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "../../config/AxiosConfig";
import Swal from "sweetalert2";
import { FaUserMd } from "react-icons/fa";

const Dashboard = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [doctor, setDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDoctor();
    }
  }, [isAuthenticated]);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`/doctor/getDoctor/${user?.email}`);

      if (response?.data?.message === "Doctor not found") {
        Swal.fire({
          icon: "warning",
          title: "Doctor Not Found",
          text: "You need to register first!",
        });
        setShowForm(true);
      } else {
        setDoctor(response.data);
        setShowForm(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch doctor details. Please try again.",
      });
    }
  };

  const handleDoctorRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.email = user?.email;

    try {
      const response = await axios.post("/doctor/createDoctor", data);
      setDoctor(response.data);
      setShowForm(false);

      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "Your doctor profile has been created!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "There was an issue registering your profile. Try again!",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700 bg-white px-6 py-3 rounded-lg shadow-lg">
          Please{" "}
          <span
            className="text-[#5F6FFF] cursor-pointer hover:underline"
            onClick={loginWithRedirect}
          >
            login
          </span>{" "}
          first!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Centered Title */}
      <h1 className="text-4xl font-bold text-[#5F6FFF] mb-6 text-center">
        Doctor Dashboard
      </h1>

      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-xl">
        {doctor ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaUserMd className="text-[#5F6FFF] text-6xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#5F6FFF]">
              Welcome, Dr. {doctor.dname}
            </h2>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Email:</span> {doctor.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Speciality:</span>{" "}
              {doctor.speciality}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Institution:</span>{" "}
              {doctor.institutionName}
            </p>
          </div>
        ) : (
          <div className="text-center">
            {showForm ? (
              <form
                onSubmit={handleDoctorRegister}
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Doctor Registration
                </h2>
                <input
                  type="text"
                  required
                  name="dName"
                  placeholder="Doctor Name"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F6FFF]"
                />
                <input
                  type="text"
                  required
                  name="mobNo"
                  placeholder="Mobile Number"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F6FFF]"
                />
                <input
                  type="text"
                  required
                  name="institutionName"
                  placeholder="Institution Name"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F6FFF]"
                />
                <input
                  type="text"
                  required
                  name="speciality"
                  placeholder="Speciality"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F6FFF]"
                />
                <button
                  type="submit"
                  className="bg-[#5F6FFF] text-white p-3 rounded-md transition-all duration-300 hover:bg-blue-700"
                >
                  Register
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-lg mb-4">
                  No profile found. Would you like to create one?
                </p>
                <button
                  onClick={fetchDoctor}
                  className="bg-gray-500 text-white px-6 py-3 rounded-md transition-all duration-300 hover:bg-gray-600"
                >
                  Fetch Doctor
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
