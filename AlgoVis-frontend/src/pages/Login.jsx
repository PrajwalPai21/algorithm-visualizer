import { useState } from "react";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data);
      localStorage.setItem("username", username);

      window.location.reload();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="px-3 py-2 rounded text-black"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="px-3 py-2 rounded text-black"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
