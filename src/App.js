import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";
import "./App.css"; 
const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (e) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    setIsLogin(!isLogin);
  };

 return (
  <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
    
    {/* Left Side (Branding / Info) */}
    <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10">
      <h1 className="text-4xl font-bold mb-4">Chat App</h1>
      <p className="text-lg opacity-90 text-center max-w-md">
        Connect with your friends in real-time. Fast, simple, and beautiful chat experience.
      </p>
    </div>

    {/* Right Side (Auth Card) */}
    <div className="flex w-full md:w-1/2 items-center justify-center p-6">
      {!user ? (
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          {/* Forms */}
          {isLogin ? (
            <Login setUser={setUser} />
          ) : (
            <Register setUser={setUser} />
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleForm}
            className="w-full py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
          >
            {isLogin ? "create  new account" : "Already have an account? Login"}
          </button>
        </div>
      ) : (
        <Chat user={user} />
      )}
    </div>
  </div>
);
};

export default App;
