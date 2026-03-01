import React, { useState } from "react";
import VisualizationArea from "../components/VisualizationArea";
import { bubbleSortFunc } from "../algorithms/bubbleSort";

const SortingPage = () => {
  const [array, setArray] = useState([]);

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
        return;
      }
      setArray(steps[i].array);
      i++;
    }, 10); //speed animation
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
      <VisualizationArea array={array} />
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
