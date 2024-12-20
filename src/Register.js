import React, { useState } from "react";
import axios from "axios";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://chat-app-yip9.onrender.com/api/auth/register", {
        username,
        password,
      });

      const response = await axios.post(
        "https://chat-app-yip9.onrender.com/api/auth/login",
        { username, password }
      );
      setUser({ token: response.data.token, username });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
