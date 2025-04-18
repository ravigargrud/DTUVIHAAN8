import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      {/* Header Section */}
      <div className="bg-[#5F6FFF] text-white rounded-lg shadow-2xl p-12 max-w-4xl">
        <h1 className="text-3xl font-bold">About Our Platform</h1>
        <p className="text-lg mt-4">
          We connect patients with top-rated doctors, making healthcare more
          accessible and convenient.
        </p>
      </div>

      {/* Our Mission */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-600 mt-4">
          Our goal is to provide seamless healthcare solutions by enabling
          easy doctor appointments, medical consultations, and real-time
          health monitoring. We strive to bridge the gap between patients
          and doctors through innovative technology.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
        <ul className="text-gray-600 mt-4 list-disc list-inside text-left">
          <li>✔ Easy and hassle-free appointment booking</li>
          <li>✔ Trusted and verified medical professionals</li>
          <li>✔ Secure and private patient data handling</li>
          <li>✔ 24/7 support for all healthcare needs</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
