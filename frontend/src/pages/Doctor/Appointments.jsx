import React, { useState, useEffect } from "react";
import axios from "../../config/AxiosConfig";
import { useAuth0 } from "@auth0/auth0-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isAuthenticated || !user?.email) {
        console.error("User is not authenticated or email is unavailable");
        return;
      }

      try {
        const response = await axios.get(`/doctor/getDoctor/${user.email}`);
        setAppointments(response.data.appointments || []); // Ensure appointments is an array
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, user?.email]); // Depend on both isAuthenticated and user.email

  return (
    <div className="flex flex-col items-center text-center py-12 px-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-[#5F6FFF] text-white rounded-xl shadow-xl p-12 max-w-4xl w-full">
        <h1 className="text-3xl font-extrabold">
          Appointments Assigned to You
        </h1>
        <p className="text-lg mt-4 opacity-80">
          Below is the list of appointments assigned to you.
        </p>
      </div>

      {/* Appointments List */}
      <div className="mt-12 max-w-3xl w-full">
        {loading ? (
          <p className="text-gray-600 text-xl">Loading appointments...</p>
        ) : (
          <ul className="text-gray-700 mt-4 list-none space-y-6">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <li
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 transition duration-200"
                >
                  <div className="space-y-3 flex flex-col items-start">
                    <div className="flex justify-between">
                      <p className="font-semibold text-lg text-[#5F6FFF]">
                        Patient mail: {appointment.patientID}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.callDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 my-2">
                      <strong className="text-[#5F6FFF]">Doctor mail:</strong>{" "}
                      {appointment.doctorID}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#5F6FFF]">
                        Appointment Date:
                      </strong>{" "}
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#5F6FFF]">Urgency:</strong>{" "}
                      {appointment.urgency}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#5F6FFF]">Status:</strong>{" "}
                      {appointment.status}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-xl">No appointments assigned.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;
