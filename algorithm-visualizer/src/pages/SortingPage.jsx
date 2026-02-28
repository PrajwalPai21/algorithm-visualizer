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
    const sorted = bubbleSortFunc(array);
    setArray(sorted);
  }
  return (
    <div>
      <h2>Sorting Visualizer</h2>
      <button onClick={generateArrayNum}>Generate Array</button>

      <button onClick={handleSort}>Sort</button>

      <VisualizationArea array={array} />
    </div>
  );
};

export default SortingPage;
