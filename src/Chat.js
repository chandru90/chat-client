// Chat.js
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
        const res = await axios.get(
          "https://chat-app-yip9.onrender.com/api/auth/active-users"
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Active users error:", err);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          "https://chat-app-yip9.onrender.com/api/auth/users"
        );
        setAllUsers(res.data);
      } catch (err) {
        console.error("All users error:", err);
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

  const handleFriendClick = (username) => {
    setFriend(username);
    setMessages([]); // optional: clear chat when switching users
  };

  const isUserActive = (username) => {
    return users.includes(username);
  };

  // show ALL users except self
  const filteredUsers = allUsers.filter(
    (u) => u.username !== user.username
  );

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 text-lg font-bold border-b">
          Chats
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => handleFriendClick(u.username)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                friend === u.username ? "bg-gray-200" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  {u.username[0].toUpperCase()}
                </div>

                {/* Online status */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    isUserActive(u.username)
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>

              <div>
                <div className="font-medium">
                  {u.username}
                </div>
                <div className="text-xs text-gray-500">
                  {isUserActive(u.username)
                    ? "Online"
                    : "Offline"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">
            {friend ? friend[0]?.toUpperCase() : "?"}
          </div>

          <div>
            <div className="font-semibold">
              {friend || "Select a user"}
            </div>
            <div className="text-sm text-gray-500">
              {friend &&
                (isUserActive(friend)
                  ? "Online"
                  : "Offline")}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              No messages yet
            </div>
          )}

          {messages.map((msg, index) => {
            const isMe = msg.sender === user.username;

            return (
              <div
                key={index}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                    isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-xs mt-1 opacity-70 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4">
          <MessageInput
            socket={socket}
            user={user}
            friend={friend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;