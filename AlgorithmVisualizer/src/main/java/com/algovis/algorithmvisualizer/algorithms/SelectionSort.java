package com.algovis.algorithmvisualizer.algorithms;

import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

public class SelectionSort implements SortingAlgorithm {
    private int[] values;
    private Rectangle[] bars;

    private int i = 0;
    private int j = 1;
    private int minIndex = 0;
    private int comparisons = 0;
    private boolean finished = false;

    public SelectionSort(int[] values, Rectangle[] bars) {
        this.values = values;
        this.bars = bars;
    }

    @Override
    public void step() {

        // Finished condition
        if (i >= values.length - 1) {
            for (Rectangle bar : bars)
                bar.setFill(Color.GREEN);
            finished = true;
            return;
        }

        // If starting new outer loop iteration
        if (j == i + 1) {
            minIndex = i;
        }

        // 🔹 SCANNING PHASE
        if (j < values.length) {

            resetColors();

            // highlight current index and minIndex
            bars[i].setFill(Color.ORANGE);
            bars[minIndex].setFill(Color.RED);
            bars[j].setFill(Color.YELLOW);

            if (values[j] < values[minIndex]) {
                minIndex = j;
            }

            comparisons++;
            j++;
            return;
        }

        // 🔹 SWAP PHASE (after full scan)
        if (minIndex != i) {
            swap(i, minIndex);
        }

        bars[i].setFill(Color.GREEN);

        // Move to next position
        i++;
        j = i + 1;
    }


    @Override
    public boolean isFinished() {
        return finished;
    }

    @Override
    public String getAlgorithmName() {
        return "Selection Sort";
    }

    @Override
    public int getComparisons() {
        return comparisons;
    }

    private void resetColors() {
        for (int k = i; k < values.length; k++)
            bars[k].setFill(Color.CORNFLOWERBLUE);
    }

    private void swap(int a, int b) {
        int temp = values[a];
        values[a] = values[b];
        values[b] = temp;

        double x1 = bars[a].getX();
        double x2 = bars[b].getX();
        bars[a].setX(x2);
        bars[b].setX(x1);

        Rectangle tempBar = bars[a];
        bars[a] = bars[b];
        bars[b] = tempBar;
    }
}
