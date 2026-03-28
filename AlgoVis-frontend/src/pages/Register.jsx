import { useState } from "react";
import api from "../services/api";

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      alert("Registration successful. Please login.");
      onSwitchToLogin(); // switch back to login
    } catch (err) {
      alert(err.response?.data || "Registration failed");
      console.error(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-700"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-blue-400 underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
