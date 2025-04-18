import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      {/* Header Section */}
      <div className="bg-[#5F6FFF] text-white rounded-lg shadow-2xl p-12 max-w-4xl">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-lg mt-4">
          Have any questions or need assistance? Feel free to reach out to us.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Our Contact Information</h2>
        <p className="text-gray-600 mt-4">
          We're here to help you. You can contact us through the following
          channels:
        </p>
        <ul className="text-gray-600 mt-4 list-disc list-inside text-left">
          <li>✔ Email: support@example.com</li>
          <li>✔ Phone: +1 (123) 456-7890</li>
          <li>✔ Address: 123 Health Street, City, Country</li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Send Us a Message</h2>
        <p className="text-gray-600 mt-4">
          If you have any inquiries, fill out the form below, and we'll get
          back to you as soon as possible.
        </p>
        {/* You can replace this with a real form later */}
        <form className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded-lg mt-4"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded-lg mt-4"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-[#5F6FFF] text-white py-2 px-6 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
