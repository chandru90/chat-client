// Chat.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import "./App.css";

const socket = io("https://chat-app-yip9.onrender.com");

const Chat = ({ user }) => {
  const [friend, setFriend] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    socket.emit("registerUser", user.username);

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://chat-app-yip9.onrender.com/api/auth/active-users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch active users:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          "https://chat-app-yip9.onrender.com/api/auth/users"
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch all users:", error);
      }
    };

    fetchUsers();
    fetchAllUsers();

    socket.on("updateUsers", (activeUsers) => {
      setUsers(activeUsers);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateUsers");
    };
  }, [user.username]);

  const handleFriendClick = (friendUsername) => {
    setFriend(friendUsername);
  };

  const isUserActive = (username) => {
    return users.some((u) => u === username);
  };

  const filteredUsers = users.filter((u) => u !== user.username);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h2>Chat with {friend || "Select a user"}</h2>
      </header>

      <div className="flex flex-1 overflow-hidden p-4 space-x-4">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2">Active Users</h3>
          <ul>
            {filteredUsers.map((u) => (
              <li
                key={u}
                onClick={() => handleFriendClick(u)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md"
              >
                <span
                  className={`status-dot ${
                    isUserActive(u) ? "active" : "inactive"
                  }`}
                ></span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 p-2 border-b">
            {messages.map((msg, index) => (
              <div key={index} className="message mb-2">
                <strong>{msg.sender}:</strong> {msg.text}{" "}
                <em>{msg.timestamp}</em>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <MessageInput socket={socket} user={user} friend={friend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
