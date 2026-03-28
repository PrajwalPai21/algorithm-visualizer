import { useState } from "react";
import Visualizer from "./pages/Visualizer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [authPage, setAuthPage] = useState("login");

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // 🔒 NOT LOGGED IN
  if (!token) {
    return authPage === "login" ? (
      <Login onSwitchToRegister={() => setAuthPage("register")} />
    ) : (
      <Register onSwitchToLogin={() => setAuthPage("login")} />
    );
  }

  // ✅ LOGGED IN
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex justify-between items-center px-6 py-4 bg-black">
        <h1 className="text-xl font-bold">Algo Visualizer</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-300">
            Logged in as <b>{username}</b>
          </span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <Visualizer />
    </div>
  );
}

export default App;
