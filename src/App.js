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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          {isLogin ? (
            <Login setUser={setUser} />
          ) : (
            <Register setUser={setUser} />
          )}
          <a
            href="#"
            className="text-blue-500 hover:underline mt-4 block text-center"
            onClick={toggleForm}
          >
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </a>
        </div>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
};

export default App;
