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
  <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-1/4 bg-white border-r flex flex-col">
      <div className="p-4 border-b bg-blue-500 text-white font-semibold text-lg">
        Active Users
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((u) => (
          <div
            key={u}
            onClick={() => handleFriendClick(u)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
              friend === u ? "bg-blue-100" : ""
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                {u[0].toUpperCase()}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  isUserActive(u) ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <span className="font-medium">{u}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Chat Area */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm">
        <h2 className="text-lg font-semibold">
          {friend ? `Chat with ${friend}` : "Select a user"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => {
          const isMe = msg.sender === user.username;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {!isMe && (
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    {msg.sender}
                  </div>
                )}
                <div>{msg.text}</div>
                <div className="text-[10px] text-right opacity-70 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t">
        <MessageInput
          socket={socket}
          user={user}
          friend={friend}
          disabled={!friend}
        />
      </div>
    </div>
  </div>
);
};

export default Chat;
