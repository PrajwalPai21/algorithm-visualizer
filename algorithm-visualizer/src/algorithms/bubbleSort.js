export function bubbleSortFunc(array) {
  const arr = [...array];
  const steps = [];

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparisons++;

      // Step: comparing
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: null,
        comparisons,
        swaps,
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;

        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Step: after swap
        steps.push({
          array: [...arr],
          comparing: null,
          swapping: [j, j + 1],
          comparisons,
          swaps,
        });
      }
    }
  }

  return steps;
}
