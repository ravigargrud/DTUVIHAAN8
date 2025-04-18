import React, { useState } from "react";
import { FaComments, FaCalendarPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const Patients = () => {
  // Dummy patient data
  const [patients] = useState([
    {
      id: 1,
      name: "Ayush Kumar Singh",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      id: 2,
      name: "Chavi Garg",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 3,
      name: "Utkarsh Chauhan",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
    },
    {
      id: 4,
      name: "Alisha Godara",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
    },
    {
      id: 5,
      name: "Daksh Govil",
      image: "https://randomuser.me/api/portraits/men/25.jpg",
    },
    {
      id: 6,
      name: "Pari Dudeja",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
    },
  ]);

  // Handle Chat Click
  const handleChat = (name) => {
    Swal.fire({
      title: `Chat with ${name}`,
      text: "Chat feature coming soon...",
      icon: "info",
      confirmButtonColor: "#5F6FFF",
    });
  };

  // Handle Booking Click
  const handleBook = (name) => {
    Swal.fire({
      title: `Book Appointment`,
      text: `Confirm appointment for ${name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5F6FFF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Booked!",
          text: `Appointment for ${name} has been confirmed.`,
          icon: "success",
          confirmButtonColor: "#5F6FFF",
        });
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-[#5F6FFF] mb-8 text-center">
        Available Patients
      </h1>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center border-2 border-[#5F6FFF]"
          >
            <img
              src={patient.image}
              alt={patient.name}
              className="w-24 h-24 rounded-full border-4 border-[#5F6FFF] mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleChat(patient.name)}
                className="bg-[#5F6FFF] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-blue-700"
              >
                <FaComments /> Chat
              </button>
              <button
                onClick={() => handleBook(patient.name)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-green-600"
              >
                <FaCalendarPlus /> Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
