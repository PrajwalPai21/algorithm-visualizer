import Visualizer from "./pages/Visualizer";
import Login from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // 🔒 If not logged in → show login
  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-black shadow">
        <h1 className="text-xl font-bold tracking-wide">Algo Visualizer</h1>

        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-300">
            Logged in as: <span className="font-bold">{username}</span>
          </span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main App */}
      <Visualizer />
    </div>
  );
}

export default App;
