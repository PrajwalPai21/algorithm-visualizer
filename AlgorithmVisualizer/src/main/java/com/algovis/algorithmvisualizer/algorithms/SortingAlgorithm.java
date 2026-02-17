package com.algovis.algorithmvisualizer.algorithms;

public interface SortingAlgorithm {
    void step();
    boolean isFinished();
    String getAlgorithmName();
    int getComparisons();
}
