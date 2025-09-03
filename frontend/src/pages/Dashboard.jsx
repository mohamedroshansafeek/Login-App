import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/"); // back to login
  };

  return (
    // Full-screen wallpaper background
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wallpaper-02.png')" }}
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Welcome to Dashboard 🎉
        </h1>
        <p className="text-gray-200 mb-6">
          You are successfully logged in with a valid token!
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-transform"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
