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

  const [pivotIndex, setPivotIndex] = useState(null);
  const [range, setRange] = useState([-1, -1]);

  const pauseRef = useRef(false);
  const stopRef = useRef(false);

  const sleep = async (ms) => {
    for (let i = 0; i < ms; i += 10) {
      if (stopRef.current) return;
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
    stopRef.current = true;

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

    setPivotIndex(null);
    setRange([-1, -1]);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    setCurrentLine(0);
    await sleep(speed);

    for (let i = 0; i < arr.length; i++) {
      setCurrentLine(1);
      await sleep(speed);

      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentLine(2);
        setActiveIndices([j, j + 1]);
        await sleep(speed);

        setCurrentLine(3);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setCurrentLine(4);
          await sleep(speed);

          let temp = arr[j];

          setCurrentLine(5);
          await sleep(speed);
          arr[j] = arr[j + 1];

          setCurrentLine(6);
          await sleep(speed);
          arr[j + 1] = temp;

          setArray([...arr]);
          await sleep(speed);
        }
      }

      setSortedIndices((prev) => [...prev, arr.length - i - 1]);
    }

    setCurrentLine(-1);
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    stopRef.current = false;

    let arr = [...array];

    setCurrentLine(0);

    for (let i = 0; i < arr.length; i++) {
      setCurrentLine(1);
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        setCurrentLine(2);
        setActiveIndices([minIndex, j]);
        await sleep(speed);

        if (arr[j] < arr[minIndex]) {
          setCurrentLine(3);
          minIndex = j;
        }
      }

      setCurrentLine(4);
      let temp = arr[i];
      setCurrentLine(5);
      arr[i] = arr[minIndex];
      setCurrentLine(6);
      arr[minIndex] = temp;

      setArray([...arr]);
      await sleep(speed);

      setSortedIndices((prev) => [...prev, i]);
    }

    setCurrentLine(-1);
    setIsSorting(false);
  };
  const insertionSort = async () => {
    setIsSorting(true);
    stopRef.current = false;

    let arr = [...array];

    setCurrentLine(0);
    await sleep(speed);

    for (let i = 1; i < arr.length; i++) {
      // key = arr[i]
      setCurrentLine(1);
      await sleep(speed);
      let key = arr[i];

      // j = i - 1
      setCurrentLine(2);
      await sleep(speed);
      let j = i - 1;

      // while loop
      while (j >= 0) {
        // 🔥 CONDITION CHECK
        setCurrentLine(3);
        setActiveIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > key) {
          // 🔥 SHIFT
          setCurrentLine(4);
          await sleep(speed);

          arr[j + 1] = arr[j];
          setArray([...arr]);

          j--;
          await sleep(speed);
        } else {
          break;
        }
      }

      setActiveIndices([]);

      // 🔥 INSERT KEY
      setCurrentLine(5);
      await sleep(speed);

      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);

      // keep green logic
      setSortedIndices((prev) => {
        const newSet = new Set(prev);
        for (let x = 0; x <= i; x++) newSet.add(x);
        return Array.from(newSet);
      });
    }

    setCurrentLine(-1);
    setIsSorting(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    stopRef.current = false;

    let arr = [...array];

    const partition = async (low, high) => {
      setPivotIndex(high);
      setRange([low, high]);

      setCurrentLine(8);
      await sleep(speed);
      let pivot = arr[high];

      setCurrentLine(9);
      await sleep(speed);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setCurrentLine(10);
        setActiveIndices([j, high]);
        await sleep(speed);

        setCurrentLine(11);
        await sleep(speed);

        if (arr[j] < pivot) {
          setCurrentLine(12);
          await sleep(speed);

          i++;

          setCurrentLine(13);
          await sleep(speed);
          let temp = arr[i];

          setCurrentLine(14);
          await sleep(speed);
          arr[i] = arr[j];

          setCurrentLine(15);
          await sleep(speed);
          arr[j] = temp;

          setArray([...arr]);
          await sleep(speed);
        }
      }

      setCurrentLine(16);
      await sleep(speed);
      let temp = arr[i + 1];

      setCurrentLine(17);
      await sleep(speed);
      arr[i + 1] = arr[high];

      setCurrentLine(18);
      await sleep(speed);
      arr[high] = temp;

      setArray([...arr]);
      await sleep(speed);

      setPivotIndex(null);

      setCurrentLine(19);
      await sleep(speed);
      return i + 1;
    };

    const sort = async (low, high) => {
      if (low < high) {
        setRange([low, high]);

        setCurrentLine(1);
        await sleep(speed);

        setCurrentLine(2);
        await sleep(speed);
        let pi = await partition(low, high);

        setCurrentLine(3);
        await sleep(speed);
        await sort(low, pi - 1);

        setCurrentLine(4);
        await sleep(speed);
        await sort(pi + 1, high);
      }
    };

    setCurrentLine(0);
    await sleep(speed);

    await sort(0, arr.length - 1);

    setPivotIndex(null);
    setRange([-1, -1]); // 🔥 also fix your earlier bug
    setCurrentLine(-1);
    setIsSorting(false);
  };

  const startSorting = () => {
    stopRef.current = false;
    pauseRef.current = false;
    setIsPaused(false);

    if (algorithm === "bubble") bubbleSort();
    else if (algorithm === "selection") selectionSort();
    else if (algorithm === "insertion") insertionSort();
    else if (algorithm === "quick") quickSort();
  };

  const resetArray = () => {
    stopRef.current = true;

    setArray([]);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentLine(-1);
    setIsSorting(false);
    setIsPaused(false);
    setPivotIndex(null);
    setRange([-1, -1]);
  };

  // ================= CODE =================

  const codeMap = {
    bubble: [
      "for (int i = 0; i < n; i++) {",
      "    for (int j = 0; j < n - i - 1; j++) {",
      "        if (arr[j] > arr[j + 1]) {",
      "            int temp = arr[j];",
      "            arr[j] = arr[j + 1];",
      "            arr[j + 1] = temp;",
      "        }",
      "    }",
      "}",
    ],
    selection: [
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
    ],
    insertion: [
      "for (int i = 1; i < n; i++) {",
      "    int key = arr[i];",
      "    int j = i - 1;",
      "    while (j >= 0 && arr[j] > key) {",
      "        arr[j + 1] = arr[j];",
      "        j--;",
      "    }",
      "    arr[j + 1] = key;",
      "}",
    ],
    quick: [
      "void quickSort(int arr[], int low, int high) {",
      "    if (low < high) {",
      "        int pi = partition(arr, low, high);",
      "        quickSort(arr, low, pi - 1);",
      "        quickSort(arr, pi + 1, high);",
      "    }",
      "}",
      "",
      "int partition(int arr[], int low, int high) {",
      "    int pivot = arr[high];",
      "    int i = low - 1;",
      "    for (int j = low; j < high; j++) {",
      "        if (arr[j] < pivot) {",
      "            i++;",
      "            int temp = arr[i];",
      "            arr[i] = arr[j];",
      "            arr[j] = temp;",
      "        }",
      "    }",
      "    int temp = arr[i + 1];",
      "    arr[i + 1] = arr[high];",
      "    arr[high] = temp;",
      "    return i + 1;",
      "}",
    ],
  };

  const currentCode = codeMap[algorithm];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {algorithm} Sort Visualizer
      </h2>

      <div className="flex gap-6">
        <div className="w-2/3">
          <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
            <select
              disabled={isSorting}
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="bg-gray-700 px-3 py-2 rounded disabled:opacity-50"
            >
              <option value="bubble">Bubble</option>
              <option value="selection">Selection</option>
              <option value="insertion">Insertion</option>
              <option value="quick">Quick</option>
            </select>

            <button
              disabled={isSorting}
              onClick={generateArray}
              className="bg-blue-500 px-4 py-2 rounded disabled:opacity-50"
            >
              Generate
            </button>

            <button
              disabled={isSorting}
              onClick={startSorting}
              className="bg-green-500 px-4 py-2 rounded disabled:opacity-50"
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
                disabled={isSorting}
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

              // 🔴 ACTIVE (highest priority)
              if (activeIndices.includes(index)) {
                color = "bg-red-500";
              }

              // 🟡 pivot
              else if (index === pivotIndex) {
                color = "bg-yellow-400";
              }

              // 🟣 range
              else if (
                range[0] !== -1 &&
                index >= range[0] &&
                index <= range[1]
              ) {
                color = "bg-purple-400";
              }

              // 🟢 sorted (lowest priority)
              else if (sortedIndices.includes(index)) {
                color = "bg-green-500";
              }

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

        <div className="w-1/3 bg-gray-900 p-4 rounded-lg font-mono text-sm">
          {currentCode.map((line, i) => (
            <div
              key={i}
              className={`px-2 py-1 ${
                currentLine === i ? "bg-yellow-500 text-black" : "text-gray-300"
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
