package com.algovis.algorithmvisualizer;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Duration;

public class AlgoVisApplication extends Application {

    // ===== STATE =====
    private int[] values;
    private Rectangle[] bars;

    private Timeline timeline;

    private int j = 0;      // inner loop index
    private int pass = 0;   // outer loop index

    // ===== ENTRY POINT =====
    @Override
    public void start(Stage stage) {

        Pane root = new Pane();

        values = new int[]{20, 50, 10, 30, 40};

        createBars(root);
        startBubbleSort();

        Scene scene = new Scene(root, 400, 300);
        stage.setScene(scene);
        stage.setTitle("Algorithm Visualizer");
        stage.show();
    }

    // ===== BAR CREATION =====
    private void createBars(Pane root) {
        bars = new Rectangle[values.length];
        int x = 20;

        for (int i = 0; i < values.length; i++) {
            Rectangle bar = new Rectangle(x, 200 - values[i], 40, values[i]);
            bar.setFill(Color.CORNFLOWERBLUE);

            bars[i] = bar;
            root.getChildren().add(bar);
            x += 50;
        }
    }

    // ===== BUBBLE SORT CONTROLLER =====
    private void startBubbleSort() {
        j = 0;
        pass = 0;

        timeline = new Timeline(
                new KeyFrame(Duration.seconds(0.5), e -> bubbleSortStep())
        );

        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }

    // ===== ONE STEP OF BUBBLE SORT =====
    private void bubbleSortStep() {

        // Sorting finished
        if (pass >= values.length - 1) {
            for (Rectangle bar : bars) {
                bar.setFill(Color.GREEN);
            }
            timeline.stop();
            return;
        }

        resetColors();
        highlight(j, j + 1);

        if (values[j] > values[j + 1])
            swap(j, j + 1);

        j++;

        // End of one pass
        if (j >= values.length - pass - 1) {
            bars[values.length - pass - 1].setFill(Color.GREEN);
            j = 0;
            pass++;
        }
    }

    // ===== HELPERS =====
    private void resetColors() {
        for (int i = 0; i < values.length - pass; i++) {
            bars[i].setFill(Color.CORNFLOWERBLUE);
        }
    }

    private void highlight(int i, int j) {
        bars[i].setFill(Color.RED);
        bars[j].setFill(Color.RED);
    }

    private void swap(int i, int j) {

        // swap values
        int temp = values[i];
        values[i] = values[j];
        values[j] = temp;

        // swap bar positions
        double x1 = bars[i].getX();
        double x2 = bars[j].getX();

        bars[i].setX(x2);
        bars[j].setX(x1);

        // swap bar references
        Rectangle tempBar = bars[i];
        bars[i] = bars[j];
        bars[j] = tempBar;
    }
}
