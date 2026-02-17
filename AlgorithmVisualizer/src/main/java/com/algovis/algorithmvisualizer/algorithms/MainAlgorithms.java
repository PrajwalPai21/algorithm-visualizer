package com.algovis.algorithmvisualizer.algorithms;

import javafx.scene.shape.Rectangle;

public class MainAlgorithms {
    public static SortingAlgorithm create(
            String name,
            int[] values,
            Rectangle[] bars
    ){
        return switch (name){
            case "Bubble Sort" -> new BubbleSort(values, bars);
            case "Selection Sort" -> new SelectionSort(values, bars);
            default -> throw new IllegalArgumentException("Unknown algorithm name");
        };
    }
}
