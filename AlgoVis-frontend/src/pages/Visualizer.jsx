import { useState } from "react";

function Visualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // sleep function
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // generate random array
  const generateArray = () => {
    if (isSorting) return;

    const arr = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 300),
    );

    setArray(arr);
    setSortedIndices([]);
    setActiveIndices([]);
  };

  // bubble sort visualization
  const bubbleSort = async () => {
    setIsSorting(true);

    let arr = [...array];
    let sorted = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          // swap
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

  // reset
  const resetArray = () => {
    if (isSorting) return;
    setArray([]);
    setSortedIndices([]);
    setActiveIndices([]);
  };

  return (
    <div className="p-5 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Algorithm Visualizer</h1>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={generateArray}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Generate Array
        </button>

        <button onClick={bubbleSort} className="bg-green-500 px-4 py-2 rounded">
          Start Sorting
        </button>

        <button onClick={resetArray} className="bg-red-500 px-4 py-2 rounded">
          Reset
        </button>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span>Speed:</span>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end h-96 border border-gray-700 p-2">
        {array.map((value, index) => {
          let color = "bg-blue-400";

          if (sortedIndices.includes(index)) {
            color = "bg-green-500"; // sorted
          } else if (activeIndices.includes(index)) {
            color = "bg-red-500"; // comparing
          }

          return (
            <div
              key={index}
              style={{ height: `${value}px` }}
              className={`${color} w-2 mx-[1px] transition-all duration-75`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Visualizer;
