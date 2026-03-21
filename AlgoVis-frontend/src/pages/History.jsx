import { useEffect, useState } from "react";
import api from "../services/api";

function HistoryPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/history");
      setRuns(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Algorithm History</h1>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading history...</p>}

      {/* Empty State */}
      {!loading && runs.length === 0 && (
        <p className="text-gray-400">No runs yet. Try running an algorithm!</p>
      )}

      {/* History List */}
      <div className="grid gap-4">
        {runs.map((run) => (
          <div
            key={run.id}
            className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold capitalize">
                {run.algorithmName}
              </p>
              <p className="text-sm text-gray-400">Speed: {run.speed}</p>
            </div>

            <span className="text-green-400 font-bold text-xl">✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
