import { useState, useEffect } from "react";

function Visualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Auto-generate array on load
  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    if (isSorting) return;

    const arr = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 300),
    );

    setArray(arr);
    setSortedIndices([]);
    setActiveIndices([]);
  };

  const bubbleSort = async () => {
    if (array.length === 0) return;

    setIsSorting(true);
    let arr = [...array];
    let sorted = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await sleep(speed);
      }

      sorted.push(arr.length - i - 1);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const selectionSort = async () => {
    if (array.length === 0) return;

    setIsSorting(true);
    let arr = [...array];
    let sorted = [];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        setActiveIndices([minIndex, j]);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }

        await sleep(speed);
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);

      sorted.push(i);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray([]);
    setSortedIndices([]);
    setActiveIndices([]);
  };

  const startSorting = () => {
    if (algorithm === "bubble") bubbleSort();
    else if (algorithm === "selection") selectionSort();
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {algorithm} Sort Visualizer
      </h2>

      {/* Empty State */}
      {array.length === 0 && (
        <p className="text-gray-400 mb-4">
          Click "Generate" to create an array
        </p>
      )}

      {/* Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-500"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
        </select>

        <button
          onClick={generateArray}
          disabled={isSorting}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Generate
        </button>

        <button
          onClick={startSorting}
          disabled={isSorting}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>

        <button
          onClick={resetArray}
          disabled={isSorting}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Reset
        </button>

        {/* Speed */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Speed:</span>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span className="text-sm text-gray-300">{speed} ms</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end h-96 border border-gray-700 p-4 bg-gray-800 rounded-lg">
        {array.map((value, index) => {
          let color = "bg-blue-400";

          if (sortedIndices.includes(index)) color = "bg-green-500";
          else if (activeIndices.includes(index)) color = "bg-red-500";

          return (
            <div
              key={index}
              style={{ height: `${value}px`, width: "12px" }}
              className={`${color} mx-px transition-all duration-75 hover:opacity-80`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Visualizer;
