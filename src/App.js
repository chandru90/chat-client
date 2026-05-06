import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://chat-app-yip9.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      localStorage.setItem("token", response.data.token);

      setUser({
        token: response.data.token,
        username,
      });

    } catch (error) {
      console.error("ERROR:", error);

      // CORS OR NETWORK ERROR
      if (!error.response) {
        setErrorMsg("CORS error or server not reachable");
        return;
      }

      if (error.response.status === 401) {
        setErrorMsg("Invalid username or password");
      } else {
        setErrorMsg("Server error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </form>
  );
};

export default Login;