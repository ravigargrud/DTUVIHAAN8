import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../../config/AxiosConfig";
import { FaUserMd } from "react-icons/fa";
import Swal from "sweetalert2";

const Book = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    duration: "",
    reminder: "On",
  });

  useEffect(() => {
    fetchDoctors();

    if (isAuthenticated) {
      checkPatientRegistration();
    }
  }, [isAuthenticated]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/doctor/getDoctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const checkPatientRegistration = async () => {
    try {
      const response = await axios.get(`/patient/getPatient/${user?.email}`);
      if (response?.data?.message === "Patient not found") {
        setIsRegistered(false);
        setShowForm(true);
      } else {
        setIsRegistered(true);
        fetchAppointments(); // Fetch appointments once the user is registered
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      setIsRegistered(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/patient/getPatient/${user?.email}`);
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const openModal = (doctor) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!isRegistered) {
      setShowForm(true);
      return;
    }

    setSelectedDoctor(doctor);
    setIsOpen(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bookingData = {
      callDate: new Date().toISOString().split("T")[0],
      appointmentDate: formData.get("appointmentDate"),
      patientID: user?.email,
      doctorID: selectedDoctor.email,
      urgency: formData.get("urgency"),
      status: "Pending",
    };

    try {
      await Promise.all([
        axios.post(`/patient/addAppointment/${user?.email}`, bookingData),
        axios.post(
          `/doctor/addAppointmentToDoctor/${user?.email}`,
          bookingData
        ),
      ]);

      setIsOpen(false);
      alert("Appointment booked successfully!");
      fetchAppointments(); // Refresh appointments after booking
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/patient/addMedication/${user?.email}`, medication);
      Swal.fire("Success", "Medication reminder set successfully!", "success");
      setMedication({ name: "", dosage: "", duration: "", reminder: "On" });
    } catch (error) {
      console.error("Error adding medication:", error);
      Swal.fire("Error", "Failed to set medication reminder.", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex bg-[#5F6FFF] text-white my-12 rounded-lg shadow-2xl">
        <div className="p-12 h-[30rem] flex flex-col justify-center items-start gap-4">
          <h1 className="text-3xl font-bold">Find Your Doctor, Anytime.</h1>
          <p className="text-lg">
            Search for specialists, check their availability, and book an
            appointment instantly.
          </p>
        </div>
      </div>

      {/* Doctor List */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold">Meet Our Specialists</h1>
        <p className="text-gray-500 w-2/3 mx-auto">
          Browse through top-rated doctors and schedule an appointment at your
          convenience.
        </p>

        <div className="flex justify-center gap-6 my-6 flex-wrap">
          {doctors.map((doctor) => (
            <div
              key={doctor.email}
              className="bg-white shadow-md p-6 rounded-lg text-center w-64 transition-all hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(doctor)}
            >
              <div className="flex justify-center mb-4">
                <FaUserMd className="text-[#5F6FFF] text-6xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {doctor.dname}
              </h2>
              <p className="text-gray-500">{doctor.speciality}</p>
              <button className="bg-[#5F6FFF] text-white px-4 py-2 rounded-full mt-4 hover:bg-[#474c81]">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Appointments */}
      {appointments.length > 0 && (
        <div className="my-12 py-12">
          <h2 className="text-2xl font-bold text-center">
            Your Previous Appointments
          </h2>
          <div className="max-w-4xl mx-auto mt-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Doctor</th>
                  <th className="border border-gray-300 p-2">Urgency</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {appointment.appointmentDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {appointment.doctorID}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {appointment.urgency}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {appointment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800">
                Book an Appointment
              </h2>
              <p className="text-gray-500">With {selectedDoctor.dname}</p>
              <form
                onSubmit={handleBooking}
                className="flex flex-col gap-4 mt-4"
              >
                <input
                  type="date"
                  required
                  name="appointmentDate"
                  className="border p-2 rounded"
                  min={new Date().toISOString().split("T")[0]}
                />
                <select name="urgency" required className="border p-2 rounded">
                  <option value="" disabled selected>
                    Select Urgency Level
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-400 text-white py-2 px-4 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5F6FFF] text-white py-2 px-4 rounded-md hover:bg-[#474c81]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}

      {/* Medication Reminder Form */}
      <div className="my-12 py-12">
        <h2 className="text-2xl font-bold text-center">
          Set Medication Reminder
        </h2>
        <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
          <form
            onSubmit={handleMedicationSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Medication Name"
              value={medication.name}
              onChange={(e) =>
                setMedication({ ...medication, name: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={medication.dosage}
              onChange={(e) =>
                setMedication({ ...medication, dosage: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration"
              value={medication.duration}
              onChange={(e) =>
                setMedication({ ...medication, duration: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-[#5F6FFF] text-white py-2 px-4 rounded-md hover:bg-[#474c81]"
            >
              Set Reminder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
