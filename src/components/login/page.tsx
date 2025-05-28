"use client";
import React, { useState } from "react";

export default function Login() {
  const [selectedBroker, setSelectedBroker] = useState<string>(""); // State for selected broker

  const handleBrokerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBroker(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email);
    console.log(password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md">
        {/* Broker selection dropdown */}
        {selectedBroker === "" && (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">
              Choose Your Broker
            </h1>
            <select
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBroker}
              onChange={handleBrokerChange}
              required
            >
              <option value="first">Select a broker</option>
              <option value="">Deriv</option>
              <option value="otherBroker">Other Broker</option>
              <option value="admin">Local Admin</option>
            </select>
            <button
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                if (selectedBroker === "") {
                  window.location.href =
                    "https://oauth.deriv.com/oauth2/authorize?app_id=65102"; // Redirect to Deriv site
                }
              }}
            >
              Next
            </button>
          </>
        )}

        {/* Conditional rendering for login form */}
        {selectedBroker && selectedBroker !== "deriv" && (
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              required
            />
            <button
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              type="submit"
              id="submit"
              name="submit"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
