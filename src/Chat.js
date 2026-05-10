// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import MessageInput from "./MessageInput";

// // const socket = io("https://chat-app-yip9.onrender.com");
// const socket = io("http://localhost:3001");
// const Chat = ({ user }) => {
// const [friend, setFriend] = useState("");
// const [messages, setMessages] = useState([]);
// const [users, setUsers] = useState([]);
// const bottomRef = useRef(null);

// // Register + fetch users + socket listeners
// useEffect(() => {
//   socket.emit("registerUser", user.username);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3001/api/auth/active-users"
//       );
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchUsers();

//   socket.on("updateUsers", setUsers);

//   socket.on("receiveMessage", (msg) =>
//     setMessages((prev) => [...prev, msg])
//   );

//   return () => {
//     socket.off("receiveMessage");
//     socket.off("updateUsers");
//   };
// }, [user.username]);

// // ✅ DEFAULT USER SELECTION ("blinker" behavior)
// useEffect(() => {
//   if (!friend && users.length > 0) {
//     const filtered = users.filter((u) => u !== user.username);

//     // Option 1: prefer "blinker" if exists
//     const preferredUser = filtered.find((u) => u === "blinker");

//     // Option 2: fallback to first available user
//     const defaultUser = preferredUser || filtered[0];

//     if (defaultUser) {
//       setFriend(defaultUser);
//     }
//   }
// }, [users, friend, user.username]);

// // Auto scroll messages
// useEffect(() => {
//   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// }, [messages]);

// const isActive = (u) => users.includes(u);
// const filteredUsers = users.filter((u) => u !== user.username);

// return (
//   <div className="h-screen flex bg-gradient-to-br from-slate-100 to-slate-200">
//     {/* Sidebar */}
//     <div className="w-[300px] bg-white/70 backdrop-blur-lg border-r shadow-lg flex flex-col">
//       <div className="p-5 text-xl font-bold border-b">
//         💬 Messages
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {filteredUsers.map((u) => (
//           <div
//             key={u}
//             onClick={() => setFriend(u)}
//             className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-xl mx-2 my-1 ${
//               friend === u
//                 ? "bg-blue-500 text-white shadow"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             <div className="relative">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
//                 {u[0].toUpperCase()}
//               </div>

//               <span
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                   isActive(u) ? "bg-green-500" : "bg-gray-400"
//                 }`}
//               />
//             </div>

//             <span className="font-medium">{u}</span>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Chat Area */}
//     <div className="flex-1 flex flex-col">
//       {/* Header */}
//       <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur border-b shadow-sm">
//         <div>
//           <h2 className="font-semibold text-lg">
//             {friend || "Select a conversation"}
//           </h2>

//           {friend && (
//             <p className="text-xs text-gray-500">
//               {isActive(friend) ? "Online" : "Offline"}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
//         {messages.map((msg, i) => {
//           const isMe = msg.sender === user.username;

//           return (
//             <div
//               key={i}
//               className={`flex ${
//                 isMe ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md text-sm shadow-md ${
//                   isMe
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
//                     : "bg-white text-gray-800 rounded-bl-sm"
//                 }`}
//               >
//                 {!isMe && (
//                   <div className="text-xs text-gray-400 mb-1">
//                     {msg.sender}
//                   </div>
//                 )}
//                 <div>{msg.text}</div>
//                 <div className="text-[10px] text-right mt-1 opacity-60">
//                   {msg.timestamp}
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <div className="p-4 bg-white/80 backdrop-blur border-t">
//         <MessageInput
//           socket={socket}
//           user={user}
//           friend={friend}
//           disabled={!friend}
//         />
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Chat;

// ======================
// Chat.jsx
// ======================







// import React, {
//   useEffect,
//   useState,
//   useRef,
// } from "react";

// import axios from "axios";
// import io from "socket.io-client";
// import MessageInput from "./MessageInput";

// // ======================
// // SOCKET
// // ======================

// // const socket = io("https://chat-app-yip9.onrender.com");

// const socket = io("http://localhost:3001");

// // ======================
// // COMPONENT
// // ======================

// const Chat = ({ user }) => {
//   const [friend, setFriend] = useState("");

//   const [messages, setMessages] = useState([]);

//   const [users, setUsers] = useState([]);

//   const [orderPreview, setOrderPreview] =
//     useState(null);

//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef(null);

//   // ======================
//   // REGISTER USER
//   // ======================

//   useEffect(() => {
//     socket.emit("registerUser", user.username);

//     // ======================
//     // FETCH USERS
//     // ======================

//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/auth/active-users"
//         );

//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUsers();

//     // ======================
//     // SOCKET EVENTS
//     // ======================

//     socket.on("updateUsers", setUsers);

//     // ======================
//     // NORMAL MESSAGE
//     // ======================

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);

//       setLoading(false);

//       // Clear preview after success
//       if (
//         msg.text?.includes(
//           "Order placed successfully"
//         )
//       ) {
//         setOrderPreview(null);
//       }
//     });

//     // ======================
//     // ORDER PREVIEW
//     // ======================

//     socket.on("orderPreview", (data) => {
//       setOrderPreview(data.order);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bliinkr",
//           text: "🛒 Please confirm your order",
//           timestamp:
//             new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     return () => {
//       socket.off("receiveMessage");

//       socket.off("updateUsers");

//       socket.off("orderPreview");
//     };
//   }, [user.username]);

//   // ======================
//   // DEFAULT USER
//   // ======================

//   useEffect(() => {
//     if (!friend && users.length > 0) {
//       const filtered = users.filter(
//         (u) => u !== user.username
//       );

//       const preferredUser = filtered.find(
//         (u) => u === "bliinkr"
//       );

//       const defaultUser =
//         preferredUser || filtered[0];

//       if (defaultUser) {
//         setFriend(defaultUser);
//       }
//     }
//   }, [users, friend, user.username]);

//   // ======================
//   // AUTO SCROLL
//   // ======================

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, orderPreview]);

//   // ======================
//   // HELPERS
//   // ======================

//   const isActive = (u) => users.includes(u);

//   const filteredUsers = users.filter(
//     (u) => u !== user.username
//   );

//   // ======================
//   // CONFIRM ORDER
//   // ======================

//   const confirmOrder = () => {
//     setLoading(true);

//     socket.emit("confirmOrder", {
//       sender: user.username,
//       order: orderPreview,
//     });
//   };

//   // ======================
//   // CANCEL ORDER
//   // ======================

//   const cancelOrder = () => {
//     socket.emit("cancelOrder", {
//       sender: user.username,
//     });

//     setOrderPreview(null);
//   };

//   // ======================
//   // UI
//   // ======================

//   return (
//     <div className="h-screen flex bg-gradient-to-br from-slate-100 to-slate-200">
//       {/* ====================== */}
//       {/* SIDEBAR */}
//       {/* ====================== */}

//       <div className="w-[300px] bg-white/70 backdrop-blur-lg border-r shadow-lg flex flex-col">
//         <div className="p-5 text-xl font-bold border-b">
//           💬 Messages
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.map((u) => (
//             <div
//               key={u}
//               onClick={() => setFriend(u)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-xl mx-2 my-1 ${
//                 friend === u
//                   ? "bg-blue-500 text-white shadow"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
//                   {u[0].toUpperCase()}
//                 </div>

//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                     isActive(u)
//                       ? "bg-green-500"
//                       : "bg-gray-400"
//                   }`}
//                 />
//               </div>

//               <span className="font-medium">
//                 {u}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ====================== */}
//       {/* CHAT AREA */}
//       {/* ====================== */}

//       <div className="flex-1 flex flex-col">
//         {/* HEADER */}

//         <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur border-b shadow-sm">
//           <div>
//             <h2 className="font-semibold text-lg">
//               {friend ||
//                 "Select a conversation"}
//             </h2>

//             {friend && (
//               <p className="text-xs text-gray-500">
//                 {isActive(friend)
//                   ? "Online"
//                   : "Offline"}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* ====================== */}
//         {/* MESSAGES */}
//         {/* ====================== */}

//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
//           {messages.map((msg, i) => {
//             const isMe =
//               msg.sender === user.username;

//             return (
//               <div
//                 key={i}
//                 className={`flex ${
//                   isMe
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md text-sm shadow-md ${
//                     isMe
//                       ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
//                       : "bg-white text-gray-800 rounded-bl-sm"
//                   }`}
//                 >
//                   {!isMe && (
//                     <div className="text-xs text-gray-400 mb-1">
//                       {msg.sender}
//                     </div>
//                   )}

//                   <div>{msg.text}</div>

//                   <div className="text-[10px] text-right mt-1 opacity-60">
//                     {msg.timestamp}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* ====================== */}
//           {/* ORDER PREVIEW */}
//           {/* ====================== */}

//           {orderPreview && (
//             <div className="flex justify-start">
//               <div className="bg-white rounded-2xl shadow-xl p-5 max-w-lg border">
//                 <h2 className="text-lg font-bold mb-4">
//                   🛒 Order Summary
//                 </h2>

//                 {/* ITEMS */}

//                 <div className="space-y-3">
//                   {orderPreview.items.map(
//                     (item) => (
//                       <div
//                         key={item.productId}
//                         className="border rounded-xl p-3 bg-gray-50"
//                       >
//                         <div className="font-semibold">
//                           {item.title}
//                         </div>

//                         <div className="text-sm text-gray-600 mt-1">
//                           Quantity:{" "}
//                           {item.quantity}
//                         </div>

//                         <div className="text-sm text-gray-600">
//                           Price: ₹
//                           {item.price}
//                         </div>

//                         <div className="text-sm font-semibold text-green-600 mt-1">
//                           Total: ₹
//                           {item.total}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>

//                 {/* ADDRESS */}

//                 <div className="mt-4">
//                   <div className="text-sm text-gray-500">
//                     Delivery Address
//                   </div>

//                   <div className="font-medium">
//                     {orderPreview.address}
//                   </div>
//                 </div>

//                 {/* TOTAL */}

//                 <div className="mt-4 flex justify-between items-center">
//                   <span className="font-bold">
//                     Grand Total
//                   </span>

//                   <span className="text-xl font-bold text-blue-600">
//                     ₹
//                     {
//                       orderPreview.totalAmount
//                     }
//                   </span>
//                 </div>

//                 {/* BUTTONS */}

//                 <div className="flex gap-3 mt-5">
//                   <button
//                     onClick={confirmOrder}
//                     disabled={loading}
//                     className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition"
//                   >
//                     {loading
//                       ? "Processing..."
//                       : "✅ Yes, Place Order"}
//                   </button>

//                   <button
//                     onClick={cancelOrder}
//                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
//                   >
//                     ❌ Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* ====================== */}
//         {/* INPUT */}
//         {/* ====================== */}

//         <div className="p-4 bg-white/80 backdrop-blur border-t">
//           <MessageInput
//             socket={socket}
//             user={user}
//             friend={friend}
//             disabled={!friend}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import MessageInput from "./MessageInput";

// // ======================
// // SOCKET (fixed: useRef safe pattern)
// // ======================

// const socket = io("http://localhost:3001");

// // ======================
// // COMPONENT
// // ======================

// const Chat = ({ user, friend, setFriend }) => {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orderPreview, setOrderPreview] = useState(null);
//   const [cancelPreview, setCancelPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef(null);

//   // ======================
//   // REGISTER USER + SOCKET EVENTS
//   // ======================

//   useEffect(() => {
//     socket.emit("registerUser", user.username);

//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/auth/active-users"
//         );
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUsers();

//     socket.on("updateUsers", setUsers);

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       setLoading(false);

//       if (msg.text?.includes("Order placed successfully")) {
//         setOrderPreview(null);
//       }

//       if (msg.text?.includes("cancelled successfully")) {
//         setCancelPreview(null);
//       }
//     });

//     // ✅ ORDER PREVIEW FIX
//     socket.on("orderPreview", (data) => {
//       console.log("ORDER PREVIEW:", data);

//       // IMPORTANT: use data directly OR data.order depending on backend
//       const orderData = data.order ?? data;

//       setOrderPreview(orderData);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bliinkr",
//           text: "🛒 Please confirm your order",
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     socket.on("cancelPreview", (data) => {
//       setCancelPreview(data);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bliinkr",
//           text: data.text,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("updateUsers");
//       socket.off("orderPreview");
//       socket.off("cancelPreview");
//     };
//   }, [user.username]);

//   // ======================
//   // DEFAULT FRIEND
//   // ======================

//   useEffect(() => {
//     if (!friend && users.length > 0) {
//       const filtered = users.filter((u) => u !== user.username);

//       const defaultUser =
//         filtered.find((u) => u === "bliinkr") || filtered[0];

//       if (defaultUser) setFriend(defaultUser);
//     }
//   }, [users, friend, user.username, setFriend]);

//   // ======================
//   // AUTO SCROLL
//   // ======================

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, orderPreview, cancelPreview]);

//   // ======================
//   // HELPERS
//   // ======================

//   const isActive = (u) => users.includes(u);
//   const filteredUsers = users.filter((u) => u !== user.username);
//   const isBliinkr = friend === "bliinkr";

//   // ======================
//   // ORDER ACTIONS
//   // ======================

//   const confirmOrder = () => {
//     setLoading(true);

//     socket.emit("confirmOrder", {
//       sender: user.username,
//       order: orderPreview,
//     });
//   };

//   const cancelOrder = () => {
//     setOrderPreview(null);

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "bliinkr",
//         text: "❌ Order placement cancelled",
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   };

//   const confirmCancelOrder = () => {
//     socket.emit("confirmCancelOrder", {
//       sender: user.username,
//     });

//     setCancelPreview(null);
//   };

//   const rejectCancelOrder = () => {
//     setCancelPreview(null);

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "bliinkr",
//         text: "❌ Cancellation aborted",
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   };

//   // ======================
//   // UI
//   // ======================

//  return (
//   <div className="h-screen flex bg-gradient-to-br from-slate-100 to-slate-200 text-black">

//     {/* SIDEBAR */}
//     <div className="w-[300px] bg-white/70 backdrop-blur-lg border-r shadow-lg flex flex-col">

//       <div className="p-5 text-xl font-bold border-b">
//         💬 Messages
//       </div>

//       <div className="flex-1 overflow-y-auto">

//         {filteredUsers.map((u) => (
//           <div
//             key={u}
//             onClick={() => setFriend(u)}
//             className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl mx-2 my-1 transition ${
//               friend === u ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//             }`}
//           >

//             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
//               friend === u ? "bg-white text-blue-500" : "bg-blue-500 text-white"
//             }`}>
//               {u[0].toUpperCase()}
//             </div>

//             <span>{u}</span>

//             <span
//               className={`ml-auto w-2 h-2 rounded-full ${
//                 isActive(u) ? "bg-green-500" : "bg-gray-400"
//               }`}
//             />
//           </div>
//         ))}

//       </div>
//     </div>

//     {/* CHAT AREA */}
//     <div className="flex-1 flex flex-col">

//       {/* HEADER */}
//       <div className="h-16 px-6 flex items-center bg-white/80 border-b">
//         <h2 className="font-semibold text-lg">
//           {friend || "Select user"}
//         </h2>
//       </div>

//       {/* CHAT CONTENT */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

//         {/* MESSAGES */}
//         {messages.map((msg, i) => {
//           const isMe = msg.sender === user.username;

//           return (
//             <div
//               key={i}
//               className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
//                   isMe
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-black"
//                 }`}
//               >

//                 {!isMe && (
//                   <div className="text-xs text-gray-500 mb-1">
//                     {msg.sender}
//                   </div>
//                 )}

//                 {msg.text}
//               </div>
//             </div>
//           );
//         })}

//         {/* ORDER PREVIEW */}
//         {orderPreview && (
//           <div className="bg-white p-5 rounded-xl shadow border">

//             <h2 className="font-bold mb-3">
//               Order Summary
//             </h2>

//             <pre className="text-xs bg-gray-100 p-3 rounded mb-3 overflow-auto">
//               {JSON.stringify(orderPreview, null, 2)}
//             </pre>

//             <button
//               onClick={confirmOrder}
//               className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Confirm
//             </button>

//             <button
//               onClick={cancelOrder}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* CANCEL PREVIEW */}
//         {cancelPreview && (
//           <div className="bg-white p-5 rounded-xl shadow border">

//             <h2 className="font-bold mb-3">
//               Cancel Order?
//             </h2>

//             <button
//               onClick={confirmCancelOrder}
//               className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Yes
//             </button>

//             <button
//               onClick={rejectCancelOrder}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               No
//             </button>

//           </div>
//         )}

//         <div ref={bottomRef} />
//       </div>

//       {/* INPUT */}
//       <div className="p-4 border-t bg-white">
//         <MessageInput
//           socket={socket}
//           user={user}
//           friend={friend}
//           disabled={!friend}
//         />
//       </div>

//     </div>
//   </div>
// );
// };

// export default Chat;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import MessageInput from "./MessageInput";

// // ======================
// // SOCKET
// // ======================
// const socket = io("http://localhost:3001");

// // ======================
// // COMPONENT
// // ======================
// const Chat = ({ user, friend, setFriend }) => {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orderPreview, setOrderPreview] = useState(null);
//   const [cancelPreview, setCancelPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef(null);

//   // ======================
//   // SOCKET SETUP
//   // ======================
//   useEffect(() => {
//     socket.emit("registerUser", user.username);

//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/auth/active-users"
//         );
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUsers();

//     socket.on("updateUsers", setUsers);

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       setLoading(false);
//     });

//     // ======================
//     // ORDER PREVIEW (FIXED UI DATA)
//     // ======================
//     socket.on("orderPreview", (data) => {
//       console.log("ORDER RECEIVED:", data);

//       setOrderPreview(data.order ?? data);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bliinkr",
//           text: "🛒 Please confirm your order",
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     socket.on("cancelPreview", (data) => {
//       setCancelPreview(data);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bliinkr",
//           text: data.text,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("updateUsers");
//       socket.off("orderPreview");
//       socket.off("cancelPreview");
//     };
//   }, [user.username]);

//   // ======================
//   // DEFAULT FRIEND
//   // ======================
//   useEffect(() => {
//     if (!friend && users.length > 0) {
//       const filtered = users.filter((u) => u !== user.username);
//       const defaultUser = filtered.find((u) => u === "bliinkr") || filtered[0];
//       if (defaultUser) setFriend(defaultUser);
//     }
//   }, [users, friend, user.username, setFriend]);

//   // ======================
//   // AUTO SCROLL
//   // ======================
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, orderPreview, cancelPreview]);

//   const filteredUsers = users.filter((u) => u !== user.username);

//   // ======================
//   // ORDER ACTIONS
//   // ======================
//   const confirmOrder = () => {
//     setLoading(true);

//     socket.emit("confirmOrder", {
//       sender: user.username,
//       order: orderPreview,
//     });
//   };

//   const cancelOrder = () => {
//     setOrderPreview(null);

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "bliinkr",
//         text: "❌ Order cancelled",
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   };

//   const confirmCancelOrder = () => {
//     socket.emit("confirmCancelOrder", {
//       sender: user.username,
//     });

//     setCancelPreview(null);
//   };

//   const rejectCancelOrder = () => {
//     setCancelPreview(null);

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "bliinkr",
//         text: "❌ Cancellation aborted",
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   };

//   // ======================
//   // UI
//   // ======================
//   return (
//     <div className="h-screen flex bg-gradient-to-br from-slate-100 to-slate-200 text-black">

//       {/* SIDEBAR */}
//       <div className="w-[300px] bg-white/70 backdrop-blur-lg border-r shadow-lg flex flex-col">

//         <div className="p-5 text-xl font-bold border-b">
//           💬 Messages
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.map((u) => (
//             <div
//               key={u}
//               onClick={() => setFriend(u)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl mx-2 my-1 transition ${
//                 friend === u ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
//                 friend === u
//                   ? "bg-white text-blue-500"
//                   : "bg-blue-500 text-white"
//               }`}>
//                 {u[0].toUpperCase()}
//               </div>

//               <span>{u}</span>
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="h-16 px-6 flex items-center bg-white/80 border-b">
//           <h2 className="font-semibold text-lg">
//             {friend || "Select user"}
//           </h2>
//         </div>

//         {/* CHAT BODY */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

//           {/* MESSAGES */}
//           {messages.map((msg, i) => {
//             const isMe = msg.sender === user.username;

//             return (
//               <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                 <div className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
//                   isMe ? "bg-blue-500 text-white" : "bg-white"
//                 }`}>
//                   {!isMe && (
//                     <div className="text-xs text-gray-500 mb-1">
//                       {msg.sender}
//                     </div>
//                   )}
//                   {msg.text}
//                 </div>
//               </div>
//             );
//           })}

//           {/* ======================
//               ORDER UI (FINAL CLEAN)
//           ====================== */}
//           {orderPreview && (
//             <div className="bg-white p-5 rounded-xl shadow border">

//               {/* HEADER */}
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="font-bold text-lg">🧾 Order Summary</h2>

//                 <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
//                   {orderPreview.status || "PENDING"}
//                 </span>
//               </div>

//               {/* ORDER ID */}
//               <div className="text-xs text-gray-500 mb-3">
//                 Order ID: {orderPreview.orderId}
//               </div>

//               {/* ITEMS */}
//               <div className="space-y-3">

//                 {(orderPreview.items || []).map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
//                   >

//                     {/* PRODUCT */}
//                     <div className="flex-1">
//                       <div className="font-medium">
//                         {item.title}
//                       </div>

//                       <div className="text-xs text-gray-500">
//                         ₹{item.price} per item
//                       </div>
//                     </div>

//                     {/* QTY */}
//                     <div className="px-3 py-1 bg-gray-200 rounded text-sm">
//                       Qty: {item.quantity}
//                     </div>

//                     {/* SUBTOTAL */}
//                     <div className="w-24 text-right font-medium">
//                       ₹{item.price * item.quantity}
//                     </div>

//                   </div>
//                 ))}

//               </div>

//               {/* TOTAL */}
//               <div className="flex justify-between mt-4 font-bold text-lg border-t pt-3">
//                 <span>Total Amount</span>
//                 <span>₹{orderPreview.totalAmount}</span>
//               </div>

//               {/* ADDRESS */}
//               <div className="text-sm text-gray-600 mt-2">
//                 📍 {orderPreview.address || "No address provided"}
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-4">
//                 <button
//                   onClick={confirmOrder}
//                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Confirm
//                 </button>

//                 <button
//                   onClick={cancelOrder}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>

//             </div>
//           )}

//           {/* CANCEL UI */}
//           {cancelPreview && (
//             <div className="bg-white p-5 rounded-xl shadow border">
//               <h2 className="font-bold mb-3">Cancel Order?</h2>

//               <button
//                 onClick={confirmCancelOrder}
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Yes
//               </button>

//               <button
//                 onClick={rejectCancelOrder}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 No
//               </button>
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* INPUT */}
//         <div className="p-4 border-t bg-white">
//           <MessageInput
//             socket={socket}
//             user={user}
//             friend={friend}
//             disabled={!friend}
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import MessageInput from "./MessageInput";

// const socket = io("http://localhost:3001");

// const Chat = ({ user, friend, setFriend }) => {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orderPreview, setOrderPreview] = useState(null);
//   const [cancelPreview, setCancelPreview] = useState(null);

//   const bottomRef = useRef(null);

//   // ======================
//   // SOCKET SETUP
//   // ======================
//   useEffect(() => {
//     socket.emit("registerUser", user.username);

//     axios
//       .get("http://localhost:3001/api/auth/active-users")
//       .then((res) => setUsers(res.data))
//       .catch(console.error);

//     socket.on("updateUsers", setUsers);

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket.on("orderPreview", (data) => {
//       setOrderPreview(data.order ?? data);

//       setMessages((prev) => [
//         ...prev,
//         { sender: "bliinkr", text: "🛒 Please confirm your order" },
//       ]);
//     });

//     socket.on("cancelPreview", (data) => {
//       setCancelPreview(data);
//     });

//     return () => {
//       socket.off("updateUsers");
//       socket.off("receiveMessage");
//       socket.off("orderPreview");
//       socket.off("cancelPreview");
//     };
//   }, [user.username]);

//   // ======================
//   // AUTO SCROLL
//   // ======================
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, orderPreview]);

//   // ======================
//   // ORDER LOGIC
//   // ======================
//   const updateQty = (index, delta) => {
//     setOrderPreview((prev) => {
//       const updated = { ...prev };

//       updated.items = updated.items.map((item, i) => {
//         if (i === index) {
//           return {
//             ...item,
//             quantity: Math.max(1, item.quantity + delta),
//           };
//         }
//         return item;
//       });

//       return updated;
//     });
//   };

//   const removeItem = (index) => {
//     setOrderPreview((prev) => {
//       const updated = { ...prev };

//       updated.items = updated.items.filter((_, i) => i !== index);

//       // auto close if empty
//       if (updated.items.length === 0) {
//         return null;
//       }

//       return updated;
//     });
//   };

//   const calculateTotal = () => {
//     if (!orderPreview?.items) return 0;

//     return orderPreview.items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//   };

//   // ======================
//   // ACTIONS
//   // ======================
//   const confirmOrder = () => {
//     socket.emit("confirmOrder", {
//       sender: user.username,
//       order: orderPreview,
//     });
//         setOrderPreview(null);
//   };

//   const cancelOrder = () => {
//     setOrderPreview(null);
//   };

//   const confirmCancelOrder = () => {
//     socket.emit("confirmCancelOrder", {
//       sender: user.username,
//     });

//     setCancelPreview(null);
//   };

//   const rejectCancelOrder = () => {
//     setCancelPreview(null);
//   };

//   const filteredUsers = users.filter((u) => u !== user.username);

//   // ======================
//   // UI
//   // ======================
//   return (
//     <div className="h-screen flex bg-gray-100">

//       {/* ======================
//           SIDEBAR
//       ====================== */}
//       <div className="w-[300px] bg-white border-r flex flex-col">

//         <div className="p-4 font-bold text-lg border-b text-black">
//           💬 Users
//         </div>

//         <div className="flex-1 overflow-y-auto">

//           {filteredUsers.map((u) => (
//             <div
//               key={u}
//               onClick={() => setFriend(u)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-black hover:bg-gray-100 ${
//                 friend === u ? "bg-blue-100" : ""
//               }`}
//             >
//               <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full">
//                 {u[0].toUpperCase()}
//               </div>

//               <span>{u}</span>
//             </div>
//           ))}

//         </div>

//       </div>

//       {/* ======================
//           CHAT AREA
//       ====================== */}
//       <div className="flex-1 flex flex-col">

//         {/* MESSAGES */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">

//           {messages.map((msg, i) => (
//             <div key={i} className="bg-white p-2 rounded shadow w-fit text-black">
//               {msg.text}
//             </div>
//           ))}

//           {/* ======================
//               ORDER UI
//           ====================== */}
//           {orderPreview && (
//             <div className=" p-5 rounded-xl shadow border w-full max-w-lg">

//               <h2 className="font-bold text-lg mb-3">
//                 🧾 Editable Order
//               </h2>

//               {/* ITEMS */}
//               <div className="space-y-3">

//                 {orderPreview.items.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
//                   >

//                     {/* PRODUCT */}
//                     <div className="flex-1">
//                       <div className="font-medium text-black">
//                         {item.title}
//                       </div>
//                       <div className="text-xs text-gray-500 text-black">
//                         ₹{Math.round(item.price * item.quantity * 10)}
//                       </div>
//                     </div>

//                     {/* QTY */}
//                     <div className="flex items-center gap-2 text-black">

//                       <button
//                         onClick={() => updateQty(idx, -1)}
//                         className="w-7 h-7 bg-gray-300 rounded"
//                       >
//                         -
//                       </button>

//                       <span>{item.quantity}</span>

//                       <button
//                         onClick={() => updateQty(idx, 1)}
//                         className="w-7 h-7 bg-gray-300 rounded"
//                       >
//                         +
//                       </button>

//                     </div>

//                     {/* SUBTOTAL */}
//                     <div className="w-20 text-r
//                     </div>ight font-medium text-black">
//                       ₹{Math.round(item.price * item.quantity *10)}

//                     {/* REMOVE BUTTON */}
//                     <button
//                       onClick={() => {
//                         const ok = window.confirm(
//                           `Remove "${item.title}" from order?`
//                         );

//                         if (ok) removeItem(idx);
//                       }}
//                       className="ml-3 text-red-600 text-sm font-semibold"
//                     >
//                       Remove
//                     </button>

//                   </div>
//                 ))}

//               </div>

//               {/* TOTAL */}
//               <div className="flex justify-between mt-4 font-bold text-lg border-t pt-3 text-black">
//                 <span>Total</span>
//                 <span>₹{calculateTotal()}</span>
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={confirmOrder}
//                   className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>

//                 <button
//                   onClick={cancelOrder}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>

//             </div>
//           )}

//           {/* CANCEL UI */}
//           {cancelPreview && (
//             <div className="bg-white p-5 rounded-xl shadow border">
//               <h2 className="font-bold mb-3">Cancel Order?</h2>

//               <button
//                 onClick={confirmCancelOrder}
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Yes
//               </button>

//               <button
//                 onClick={rejectCancelOrder}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 No
//               </button>
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* INPUT */}
//         <div className="p-3 bg-white border-t text-black">
//           <MessageInput socket={socket} user={user} friend={friend} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("https://chat-app-yip9.onrender.com");

const Chat = ({ user, friend, setFriend }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderPreview, setOrderPreview] = useState(null);
  const [cancelPreview, setCancelPreview] = useState(null);

  const bottomRef = useRef(null);

  // ======================
  // SOCKET SETUP
  // ======================
  useEffect(() => {
    socket.emit("registerUser", user.username);

    axios
      .get("https://chat-app-yip9.onrender.com/api/auth/active-users")
      .then((res) => setUsers(res.data))
      .catch(console.error);

    socket.on("updateUsers", setUsers);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("orderPreview", (data) => {
      setOrderPreview(data.order ?? data);

      setMessages((prev) => [
        ...prev,
        { sender: "bliinkr", text: "🛒 Please confirm your order" },
      ]);
    });

    socket.on("cancelPreview", (data) => {
      setCancelPreview(data);
    });

    return () => {
      socket.off("updateUsers");
      socket.off("receiveMessage");
      socket.off("orderPreview");
      socket.off("cancelPreview");
    };
  }, [user.username]);

  // ======================
  // AUTO SCROLL
  // ======================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, orderPreview]);

  // ======================
  // ORDER LOGIC
  // ======================
  const updateQty = (index, delta) => {
    setOrderPreview((prev) => {
      const updated = { ...prev };

      updated.items = updated.items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );

      return updated;
    });
  };

  const removeItem = (index) => {
    setOrderPreview((prev) => {
      const updated = { ...prev };

      updated.items = updated.items.filter((_, i) => i !== index);

      if (updated.items.length === 0) return null;

      return updated;
    });
  };

  const calculateTotal = () => {
    if (!orderPreview?.items) return 0;

    return orderPreview.items.reduce(
      (sum, item) => sum + Math.round(item.price * item.quantity*10),
      0
    );
  };

  // ======================
  // ACTIONS
  // ======================
  const confirmOrder = () => {
    socket.emit("confirmOrder", {
      sender: user.username,
      order: orderPreview,
    });

    setOrderPreview(null);
  };

  const cancelOrder = () => {
    setOrderPreview(null);
  };

  const confirmCancelOrder = () => {
    socket.emit("confirmCancelOrder", {
      sender: user.username,
    });

    setCancelPreview(null);
  };

  const rejectCancelOrder = () => {
    setCancelPreview(null);
  };

  const filteredUsers = users.filter((u) => u !== user.username);

  // ======================
  // UI
  // ======================
  return (
    <div className="h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-[300px] bg-white border-r flex flex-col">

        <div className="p-4 font-bold text-lg border-b text-black">
          💬 Users
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((u) => (
            <div
              key={u}
              onClick={() => setFriend(u)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-black hover:bg-gray-100 ${
                friend === u ? "bg-blue-100" : ""
              }`}
            >
              <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full">
                {u[0].toUpperCase()}
              </div>
              <span>{u}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {messages.map((msg, i) => (
            <div key={i} className="bg-white p-2 rounded shadow w-fit text-black">
              {msg.text}
            </div>
          ))}

          {/* ORDER UI */}
          {orderPreview && (
            <div className="p-5 rounded-xl shadow border w-full max-w-lg bg-white">

              <h2 className="font-bold text-lg mb-3">
                🧾 Editable Order
              </h2>

              {/* ITEMS */}
              <div className="space-y-3">

                {orderPreview.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >

                    {/* PRODUCT */}
                    <div className="flex-1">
                      <div className="font-medium text-black">
                        {item.title}
                      </div>

                      <div className="text-xs text-gray-500">
                        ₹{Math.round(item.price * 10)}
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex items-center gap-2 text-black">
                      <button
                        onClick={() => updateQty(idx, -1)}
                        className="w-7 h-7 bg-gray-300 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQty(idx, 1)}
                        className="w-7 h-7 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <div className="w-24 text-right font-medium text-black">
                      ₹{Math.round(item.price * item.quantity * 10)}
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => {
                        const ok = window.confirm(
                          `Remove "${item.title}" from order?`
                        );
                        if (ok) removeItem(idx);
                      }}
                      className="ml-3 text-red-600 text-sm font-semibold"
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-4 font-bold text-lg border-t pt-3 text-black">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={confirmOrder}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>

                <button
                  onClick={cancelOrder}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

          {/* CANCEL */}
          {cancelPreview && (
            <div className="bg-white p-5 rounded-xl shadow border">
              <h2 className="font-bold mb-3">Cancel Order?</h2>

              <button
                onClick={confirmCancelOrder}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes
              </button>

              <button
                onClick={rejectCancelOrder}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-3 bg-white border-t text-black">
          <MessageInput socket={socket} user={user} friend={friend} />
        </div>

      </div>
    </div>
  );
};

export default Chat;