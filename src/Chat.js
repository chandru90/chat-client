import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("https://chat-app-yip9.onrender.com");
// const socket = io("http://localhost:3001");
const Chat = ({ user }) => {
const [friend, setFriend] = useState("");
const [messages, setMessages] = useState([]);
const [users, setUsers] = useState([]);
const bottomRef = useRef(null);

// Register + fetch users + socket listeners
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

// ✅ DEFAULT USER SELECTION ("blinker" behavior)
useEffect(() => {
  if (!friend && users.length > 0) {
    const filtered = users.filter((u) => u !== user.username);

    // Option 1: prefer "blinker" if exists
    const preferredUser = filtered.find((u) => u === "blinker");

    // Option 2: fallback to first available user
    const defaultUser = preferredUser || filtered[0];

    if (defaultUser) {
      setFriend(defaultUser);
    }
  }
}, [users, friend, user.username]);

// Auto scroll messages
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const isActive = (u) => users.includes(u);
const filteredUsers = users.filter((u) => u !== user.username);

return (
  <div className="h-screen flex bg-gradient-to-br from-slate-100 to-slate-200">
    {/* Sidebar */}
    <div className="w-[300px] bg-white/70 backdrop-blur-lg border-r shadow-lg flex flex-col">
      <div className="p-5 text-xl font-bold border-b">
        💬 Messages
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((u) => (
          <div
            key={u}
            onClick={() => setFriend(u)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-xl mx-2 my-1 ${
              friend === u
                ? "bg-blue-500 text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
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

    {/* Chat Area */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur border-b shadow-sm">
        <div>
          <h2 className="font-semibold text-lg">
            {friend || "Select a conversation"}
          </h2>

          {friend && (
            <p className="text-xs text-gray-500">
              {isActive(friend) ? "Online" : "Offline"}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
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
                className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md text-sm shadow-md ${
                  isMe
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm"
                }`}
              >
                {!isMe && (
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.sender}
                  </div>
                )}
                <div>{msg.text}</div>
                <div className="text-[10px] text-right mt-1 opacity-60">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 backdrop-blur border-t">
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

