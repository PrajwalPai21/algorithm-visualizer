import React, { useState } from "react";
import VisualizationArea from "../components/VisualizationArea";
import { bubbleSortFunc } from "../algorithms/bubbleSort";

const SortingPage = () => {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  function generateArrayNum() {
    const newArray = [];

    for (let i = 0; i < 30; i++)
      newArray.push(Math.floor(Math.random() * 300) + 20);
    setArray(newArray);
    console.log(newArray);
  }
  function handleSort() {
    const steps = bubbleSortFunc(array);
    animateSteps(steps);
  }

  function animateSteps(steps) {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setComparing([]);
        setSwapping([]);
        return;
      }
      const step = steps[i];

      setArray(step.array);
      setComparing(step.comparing || []);
      setSwapping(step.swapping || []);
      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      i++;
    }, 1000);
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Algorithm Visuallizer</h1>
      <div style={styles.controls}>
        <button onClick={generateArrayNum} style={styles.button}>
          Generate Array
        </button>
        <button onClick={handleSort} style={styles.button}>
          Sort
        </button>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <strong>Comparisons:</strong> {comparisons} |<strong> Swaps:</strong>{" "}
        {swaps}
      </div>
      <VisualizationArea
        array={array}
        comparing={comparing}
        swapping={swapping}
      />
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
  controls: {
    marginBottom: "20px",
  },
  button: {
    padding: "8px 16px",
    margin: "0 10px",
    cursor: "pointer",
  },
};

export default SortingPage;
