
import React, { useState } from "react";

const MessageInput = ({ socket, user, friend }) => {
  const [message, setMessage] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const sendMessage = () => {
    if (message && friend) {
      const msg = {
        sender: user.username,
        receiver: friend,
        text: message,
      };
      socket.emit("sendMessage", msg);
      setMessage("");
    }
  };

  const scheduleMessage = () => {
    if (message && friend && scheduleTime) {
      const msg = {
        sender: user.username,
        receiver: friend,
        text: message,
        date: scheduleTime,
      };
      socket.emit("scheduleMessage", msg);
      setMessage("");
      setScheduleTime("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
        placeholder="Schedule time"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={sendMessage}
          disabled={!friend}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          Send
        </button>
        <button
          onClick={scheduleMessage}
          disabled={!friend}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
        >
          Schedule Message
        </button>
      </div>
    </div>
  );
};

export default MessageInput;