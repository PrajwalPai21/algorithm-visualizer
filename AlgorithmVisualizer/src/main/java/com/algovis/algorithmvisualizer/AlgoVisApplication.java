package com.algovis.algorithmvisualizer;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
//import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Duration;


import javafx.application.Application;
import org.w3c.dom.css.Rect;

public class AlgoVisApplication extends Application {

    private int[] values;
    private Rectangle[] bars;
    private Timeline timeline;

//    Inner and outer loop index
    private int j = 0;
    private int pass = 0;

    @Override
    public void start(Stage stage) {
        Pane root = new Pane();

        values = new int[]{50, 40, 30, 20, 10}; //Height of the bars

        createBars(root);
        startBubbleSort();
        Scene scene = new Scene(root, 400, 300);
        stage.setScene(scene);
        stage.setTitle("Algorithm Visualizer");
        stage.show();
    }

    private void createBars(Pane root) {
        bars = new Rectangle[values.length];
        int x = 20;
        for (int i = 0; i < values.length; i++) {
            Rectangle bar = new Rectangle(x, 200 - values[i], 40, values[i]); //position
            bar.setFill(Color.CORNFLOWERBLUE);
            bars[i] = bar;
            root.getChildren().add(bar);
            x += 50; //Gap between each bar
        }
    }

    private void startBubbleSort() {
        j = 0;
        pass = 0;
        timeline = new Timeline(
                new KeyFrame(Duration.seconds(0.5), e -> bubbleSortStep())
        );
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }

    private void bubbleSortStep() {
//        once sorting is finish
        if (pass >= values.length - 1) {
            for (Rectangle bar : bars)
                bar.setFill(Color.GREEN);
            timeline.stop();
            return;
        }
        resetColors(); //method need to be created
        highlight(j, j + 1); // method need to create

        if (values[j] > values[j + 1])
            swap(j, j + 1);
        j++;

//    After the end of one pass
        if (j >= values.length - pass - 1) {
            bars[values.length - pass - 1].setFill(Color.GREEN);
            j = 0;
            pass++;
        }
    }

    //    Other methods to reduce lines
    private void resetColors() {
        for (int i = 0; i < values.length - pass; i++)
            bars[i].setFill(Color.CORNFLOWERBLUE);
    }

    private void highlight(int i, int j) {
        bars[i].setFill(Color.RED);
        bars[j].setFill(Color.RED);
    }

    private void swap(int i, int j) {
        int temp = values[i];
        values[i] = values[j];
        values[j] = temp;

//                    Swap bar positions
        double x1 = bars[i].getX();
        double x2 = bars[j].getX();
        bars[i].setX(x2);
        bars[j].setX(x1);

//                    Swap bars visually
        Rectangle tempBar = bars[i];
        bars[i] = bars[j];
        bars[j] = tempBar;
    }
}