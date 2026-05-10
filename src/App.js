// import React, { useState } from "react";

// import Login from "./Login";
// import Register from "./Register";
// import Chat from "./Chat";

// import "./App.css";

// const App = () => {
//   const [user, setUser] =
//     useState(null);

//   const [isLogin, setIsLogin] =
//     useState(true);

//   const [friend, setFriend] =
//     useState("");

//   const toggleForm = (e) => {
//     e.preventDefault();

//     setIsLogin(!isLogin);
//   };

//   const isBliinkr =
//     friend === "bliinkr";

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
//       {/* ====================== */}
//       {/* LEFT SIDE */}
//       {/* ====================== */}

//       <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10 transition-all duration-500">
//         {!isBliinkr ? (
//           <>
//             <h1 className="text-5xl font-bold mb-6">
//               💬 Chat App
//             </h1>

//             <p className="text-lg opacity-90 text-center max-w-md leading-relaxed">
//               Connect with your
//               friends in real-time.
//               Fast, simple, and
//               beautiful chat
//               experience.
//             </p>
//           </>
//         ) : (
//           <>
//             <h1 className="text-5xl font-bold mb-6">
//               🛍 Bliinkr Store
//             </h1>

//             <p className="text-lg opacity-90 text-center max-w-md leading-relaxed">
//               Discover amazing
//               products, place
//               orders instantly, and
//               manage everything
//               directly inside chat.
//             </p>

//             <div className="grid grid-cols-2 gap-4 mt-10">
//               <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
//                 📱
//                 <div className="mt-2 font-semibold">
//                   Mobiles
//                 </div>
//               </div>

//               <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
//                 🎧
//                 <div className="mt-2 font-semibold">
//                   Audio
//                 </div>
//               </div>

//               <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
//                 ⌚
//                 <div className="mt-2 font-semibold">
//                   Wearables
//                 </div>
//               </div>

//               <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
//                 💻
//                 <div className="mt-2 font-semibold">
//                   Electronics
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* ====================== */}
//       {/* RIGHT SIDE */}
//       {/* ====================== */}

//       <div className="flex w-full md:w-1/2 items-center justify-center p-6">
//         {!user ? (
//           <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
//             {/* TITLE */}

//             <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//               {isLogin
//                 ? "Welcome Back 👋"
//                 : "Create Account 🚀"}
//             </h2>

//             {/* FORMS */}

//             {isLogin ? (
//               <Login
//                 setUser={setUser}
//               />
//             ) : (
//               <Register
//                 setUser={setUser}
//               />
//             )}

//             {/* DIVIDER */}

//             <div className="flex items-center my-6">
//               <div className="flex-1 h-px bg-gray-300"></div>

//               <span className="px-3 text-gray-400 text-sm">
//                 or
//               </span>

//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             {/* TOGGLE BUTTON */}

//             <button
//               onClick={toggleForm}
//               className="w-full py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
//             >
//               {isLogin
//                 ? "Create New Account"
//                 : "Already have an account? Login"}
//             </button>
//           </div>
//         ) : (
//           <Chat
//             user={user}
//             friend={friend}
//             setFriend={setFriend}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [friend, setFriend] = useState("");

  // Products State
  const [products, setProducts] = useState([]);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Email State
  const [email, setEmail] = useState("");

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const isBliinkr = friend === "bliinkr";

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Fetch Orders
  const handleFetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://ecommercestore-yxcj.onrender.com/api/orders/orders/${email}`
      );

      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 flex-col overflow-y-auto border-r border-white/10">

        {!isBliinkr ? (
          <div className="flex flex-col justify-center items-center h-full px-16">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-14 rounded-[40px] shadow-2xl text-center">

              <div className="text-7xl mb-6">💬</div>

              <h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Chat App
              </h1>

              <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-lg">
                Experience modern real-time chatting with seamless
                communication, product browsing, and order tracking.
              </p>

              <div className="flex justify-center gap-4 mt-10">
                <div className="bg-cyan-500/20 px-5 py-3 rounded-2xl border border-cyan-400/20">
                  Fast Messaging
                </div>

                <div className="bg-purple-500/20 px-5 py-3 rounded-2xl border border-purple-400/20">
                  Smart Orders
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">

            {/* STORE HEADER */}
            <div className="flex items-center justify-between mb-10">

              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  🛍 Bliinkr
                </h1>

                <p className="text-gray-400 mt-2">
                  Premium Shopping Experience
                </p>
              </div>

              <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/10">
                <p className="text-sm text-gray-300">
                  {products.length} Products
                </p>
              </div>
            </div>

            {/* PRODUCTS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  Trending Products
                </h2>

                <button className="text-cyan-300 hover:text-cyan-200">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">

                {products.slice(0, 9).map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 hover:bg-white/10 transition duration-300 shadow-xl"
                  >

                    <div className="bg-white p-6 h-56 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-32 object-contain group-hover:scale-110 transition duration-300"
                      />
                    </div>

                    <div className="p-5">

                      <h3 className="font-semibold text-sm h-12 overflow-hidden">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between mt-5">

                        <p className="text-2xl font-bold text-yellow-300">
                          Rs {Math.round(item.price * 10)}
                        </p>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDERS */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-3xl font-bold">
                    📦 Your Orders
                  </h2>

                  <p className="text-gray-400 mt-1">
                    Track your recent purchases
                  </p>
                </div>

                <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-xl">
                  History
                </div>
              </div>

              {/* EMAIL + BUTTON */}
              <div className="flex flex-col md:flex-row gap-4">

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#1e293b] border border-white/10 px-5 py-4 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <button
                  onClick={handleFetchOrders}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-lg"
                >
                  Fetch Orders
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mt-5 bg-red-500/20 border border-red-400/30 text-red-200 p-4 rounded-2xl">
                  {error}
                </div>
              )}

              {/* ORDERS LIST */}
              {orders.length > 0 ? (
                <div className="mt-8 space-y-6 max-h-[500px] overflow-y-auto pr-2">

                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-[#1e293b] border border-white/10 rounded-3xl p-6"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                        <div>
                          <h3 className="text-xl font-bold">
                            Order #{order._id}
                          </h3>

                          <p className="text-gray-400 mt-2">
                            {new Date(
                              order.orderDate
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="mt-4 md:mt-0">
                          <span className="bg-green-500/20 text-green-300 px-5 py-2 rounded-xl font-bold text-lg">
                            ${order.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* ITEMS */}
                      <div className="grid md:grid-cols-2 gap-4 mt-6">

                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-black/20 border border-white/5 rounded-2xl p-4"
                          >

                            <p className="font-semibold text-cyan-300">
                              {item.title}
                            </p>

                            <div className="mt-3 space-y-1 text-sm text-gray-300">

                              <p>
                                Product ID: {item.productId}
                              </p>

                              <p>
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 mt-8">
                  No orders found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

        {!user ? (
          <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl p-10">

            <div className="text-center mb-8">

              <div className="text-6xl mb-4">
                {isLogin ? "👋" : "🚀"}
              </div>

              <h2 className="text-4xl font-black">
                {isLogin
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>

              <p className="text-gray-400 mt-3">
                Continue your messaging experience
              </p>
            </div>

            {isLogin ? (
              <Login setUser={setUser} />
            ) : (
              <Register setUser={setUser} />
            )}

            <button
              onClick={toggleForm}
              className="w-full mt-6 py-4 rounded-2xl border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold transition duration-300"
            >
              {isLogin
                ? "Create New Account"
                : "Already have an account? Login"}
            </button>
          </div>
        ) : (
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <Chat
              user={user}
              friend={friend}
              setFriend={setFriend}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;