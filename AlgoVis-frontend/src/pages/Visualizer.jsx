import { useState, useEffect, useRef } from "react";

function Visualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  const pauseRef = useRef(false);
  const stopRef = useRef(false); // 🔥 NEW (CRITICAL)

  const sleep = async (ms) => {
    for (let i = 0; i < ms; i += 10) {
      if (stopRef.current) return; // 🔥 STOP CHECK

      while (pauseRef.current) {
        await new Promise((res) => setTimeout(res, 50));
      }

      await new Promise((res) => setTimeout(res, 10));
    }
  };

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    stopRef.current = true; // 🔥 STOP ANY RUNNING SORT

    const arr = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 300),
    );

    setArray(arr);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentLine(-1);

    pauseRef.current = false;
    setIsPaused(false);
    setIsSorting(false);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    stopRef.current = false; // 🔥 RESET STOP
    pauseRef.current = false;

    let arr = [...array];
    let sorted = [];

    setCurrentLine(0);

    for (let i = 0; i < arr.length; i++) {
      if (stopRef.current) return; // 🔥 STOP

      setCurrentLine(1);

      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return;

        setCurrentLine(2);
        setActiveIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setCurrentLine(3);
          let temp = arr[j];
          await sleep(speed);

          setCurrentLine(4);
          arr[j] = arr[j + 1];
          await sleep(speed);

          setCurrentLine(5);
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(speed);
        }
      }

      sorted.push(arr.length - i - 1);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setCurrentLine(-1);
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    pauseRef.current = false;

    let arr = [...array];
    let sorted = [];

    setCurrentLine(0);

    for (let i = 0; i < arr.length; i++) {
      if (stopRef.current) return;

      setCurrentLine(1);
      let minIndex = i;
      await sleep(speed);

      setCurrentLine(2);

      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) return;

        setCurrentLine(3);
        setActiveIndices([minIndex, j]);
        await sleep(speed);

        if (arr[j] < arr[minIndex]) {
          setCurrentLine(4);
          minIndex = j;
          await sleep(speed);
        }
      }

      setCurrentLine(6);
      let temp = arr[i];
      await sleep(speed);

      setCurrentLine(7);
      arr[i] = arr[minIndex];
      await sleep(speed);

      setCurrentLine(8);
      arr[minIndex] = temp;
      setArray([...arr]);
      await sleep(speed);

      sorted.push(i);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setCurrentLine(-1);
    setIsSorting(false);
  };

  const startSorting = () => {
    stopRef.current = false; // 🔥 IMPORTANT
    pauseRef.current = false;

    setIsPaused(false);

    if (algorithm === "bubble") bubbleSort();
    else if (algorithm === "selection") selectionSort();
  };

  const resetArray = () => {
    stopRef.current = true; // 🔥 HARD STOP
    pauseRef.current = false;

    setIsPaused(false);
    setIsSorting(false);
    setArray([]);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentLine(-1);
  };

  const bubbleSortCode = [
    "for (int i = 0; i < n; i++) {",
    "    for (int j = 0; j < n - i - 1; j++) {",
    "        if (arr[j] > arr[j + 1]) {",
    "            int temp = arr[j];",
    "            arr[j] = arr[j + 1];",
    "            arr[j + 1] = temp;",
    "        }",
    "    }",
    "}",
  ];

  const selectionSortCode = [
    "for (int i = 0; i < n; i++) {",
    "    int minIndex = i;",
    "    for (int j = i + 1; j < n; j++) {",
    "        if (arr[j] < arr[minIndex]) {",
    "            minIndex = j;",
    "        }",
    "    }",
    "    int temp = arr[i];",
    "    arr[i] = arr[minIndex];",
    "    arr[minIndex] = temp;",
    "}",
  ];

  const currentCode =
    algorithm === "bubble" ? bubbleSortCode : selectionSortCode;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {algorithm} Sort Visualizer
      </h2>

      <div className="flex gap-6">
        <div className="w-2/3">
          <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="bg-gray-700 px-3 py-2 rounded"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
            </select>

            <button
              onClick={generateArray}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Generate
            </button>

            <button
              onClick={startSorting}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Start
            </button>

            <button
              onClick={() => {
                pauseRef.current = !pauseRef.current;
                setIsPaused(!isPaused);
              }}
              disabled={!isSorting}
              className="bg-yellow-500 px-4 py-2 rounded"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button
              onClick={resetArray}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Reset
            </button>

            <div className="flex items-center gap-2">
              <span>Speed:</span>
              <input
                type="range"
                min="10"
                max="200"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
              <span>{speed} ms</span>
            </div>
          </div>

          <div className="flex items-end h-96 bg-gray-800 p-4 rounded-lg">
            {array.map((value, index) => {
              let color = "bg-blue-400";
              if (sortedIndices.includes(index)) color = "bg-green-500";
              else if (activeIndices.includes(index)) color = "bg-red-500";

              return (
                <div
                  key={index}
                  style={{ height: `${value}px`, width: "12px" }}
                  className={`${color} mx-px`}
                />
              );
            })}
          </div>
        </div>

        <div className="w-1/3 bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-auto">
          <h3 className="mb-3 font-bold text-lg">Code</h3>

          {currentCode.map((line, index) => (
            <div
              key={index}
              className={`px-2 py-1 rounded whitespace-pre ${
                currentLine === index
                  ? "bg-yellow-500 text-black"
                  : "text-gray-300"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Visualizer;
