import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Popup from "../components/Popup.jsx";

export default function Login() {
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    setLoading(true);

    try {
      const res = await fetch("https://login-app-backend-666x.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setPopup({ show: true, message: "✅ Login Successful!", type: "success" });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "success" });
          navigate("/dashboard");
        }, 2000);
      } else {
        setPopup({ show: true, message: data.error || "❌ Login Failed!", type: "error" });
        setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 2000);
      }
    } catch (err) {
      setPopup({ show: true, message: "⚠️ Server Error!", type: "error" });
      setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 2000);
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {popup.show && <Popup message={popup.message} type={popup.type} />}
      </AnimatePresence>
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/images/wallpaper-01.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-extrabold text-white mb-4">Login</h1>
          <p className="text-gray-200 mb-6">Enter your details to sign in</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded-xl focus:outline-none" required />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 rounded-xl focus:outline-none" required />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-transform disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-gray-200">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-300 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
        

