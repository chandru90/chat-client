// Chat.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("https://chat-app-yip9.onrender.com");

const Chat = ({ user }) => {
  const [friend, setFriend] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("registerUser", user.username);

    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://chat-app-yip9.onrender.com/api/auth/active-users"
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();

    socket.on("updateUsers", setUsers);
    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off("receiveMessage");
      socket.off("updateUsers");
    };
  }, [user.username]);

  const isActive = (u) => users.includes(u);
  const filteredUsers = users.filter((u) => u !== user.username);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col shadow-sm">
        <div className="p-4 font-bold text-xl border-b bg-blue-600 text-white">
          Chats
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((u) => (
            <div
              key={u}
              onClick={() => setFriend(u)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition ${
                friend === u
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {u[0].toUpperCase()}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    isActive(u) ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <span className="font-medium">{u}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
          <h2 className="font-semibold text-lg">
            {friend ? friend : "Select a chat"}
          </h2>
          {friend && (
            <span className="text-sm text-gray-500">
              {isActive(friend) ? "Online" : "Offline"}
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-100 to-gray-200">
          {messages.map((msg, i) => {
            const isMe = msg.sender === user.username;

            return (
              <div
                key={i}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md shadow ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {!isMe && (
                    <div className="text-xs text-gray-500 mb-1">
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
        <div className="p-4 bg-white border-t shadow-inner">
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