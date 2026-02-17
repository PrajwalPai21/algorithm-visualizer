package com.algovis.algorithmvisualizer.algorithms;

import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

public class BubbleSort implements SortingAlgorithm{
    private int[] values;
    private Rectangle[] bars;

    private int j = 0;
    private int pass = 0;
    private int comparisons = 0;
    private boolean finished = false;

    public BubbleSort(int [] values, Rectangle[] bars) {
        this.values = values;
        this.bars = bars;
    }
    @Override
    public void step(){
        if(pass >= values.length - 1){
            for(Rectangle bar : bars)
                bar.setFill(Color.GREEN);
            finished = true;
            return;
        }
        resetColors();
        highlight(j, j+1);
        comparisons++;

        if(values[j] > values[j+1])
            swap(j,j+1);
        j++;

        if(j >= values.length - pass - 1){
            bars[values.length - pass - 1].setFill(Color.GREEN);
            j = 0;
            pass++;
        }
    }

    @Override
    public boolean isFinished(){
        return finished;
    }

    @Override
    public String getAlgorithmName() {
        return "Bubble Sort";
    }

    private void resetColors(){
        for(int i = 0; i < values.length - pass; i++){
            bars[i].setFill(Color.CORNFLOWERBLUE);
        }
    }

    private void highlight(int i, int j){
        bars[i].setFill(Color.RED);
        bars[j].setFill(Color.RED);
    }

    @Override
    public int getComparisons() {
        return comparisons;
    }


    private void swap(int i, int j) {
        int temp = values[i];
        values[i] = values[j];
        values[j] = temp;

        double x1 = bars[i].getX();
        double x2 = bars[j].getX();
        bars[i].setX(x2);
        bars[j].setX(x1);

        Rectangle tempBar = bars[i];
        bars[i] = bars[j];
        bars[j] = tempBar;
    }
}
