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

public class AlgoVisApplication extends Application {
    @Override
    public void start(Stage stage) {
        Pane root = new Pane();

        int[] values = {20,50,10,30,40}; //Height of the bars
        int x = 20;
        Rectangle[] bars = new Rectangle[values.length];

        for(int i=0;i<values.length;i++){
            Rectangle bar = new Rectangle(x,200- values[i] , 40 , values[i]); //position
            bar.setFill(Color.rgb((int) (Math.random() * 256), (int) (Math.random() * 256), (int) (Math.random() * 256)));
            bars[i] = bar;
            root.getChildren().add(bar);
            x+=50; //Gap between each bar
        }

//        int i = 1;
//        bars[i].setFill(Color.RED);
//        bars[i+1].setFill(Color.RED);

        int[] j = {0}; //inner loop
        int[] pass = {0}; //outer

        Timeline[] timeline = new Timeline[1];
        timeline[0] = new Timeline(
                new KeyFrame(Duration.seconds(0.5), event -> {
                    if(pass[0] >= values.length -1 ){
                        for(Rectangle bar : bars){
                            bar.setFill(Color.GREEN);
                        }
                        timeline[0].stop();
                        return;
                    }
//                    Reset only unsorted part color
                    for(int k = 0 ; k <values.length - pass[0]; k++){
                        bars[k].setFill(Color.CORNFLOWERBLUE);
                    }
//                    highlight the bars that are being compared
                    bars[j[0]].setFill(Color.RED);
                    bars[j[0]+1].setFill(Color.RED);

//                    Stop condition to prevent exception
//                    if (j[0] >= values.length - 1) {
//                        timeline[0].stop();
//                        return;
//                    }

//                    Swap values in the array
                    if(values[j[0]] > values[j[0] + 1]) {
                        int temp = values[j[0]];
                        values[j[0]] = values[j[0] + 1];
                        values[j[0] + 1] = temp;

//                    Swap bar positions
                        double x1 = bars[j[0]].getX();
                        double x2 = bars[j[0] + 1].getX();
                        bars[j[0]].setX(x2);
                        bars[j[0] + 1].setX(x1);

//                    Swap bars visually
                        Rectangle tempBar = bars[j[0]];
                        bars[j[0]] = bars[j[0] + 1];
                        bars[j[0] + 1] = tempBar;
                    }
//                    next comparison
                    j[0]++;
//                    end of one pass
                    if(j[0] >= values.length - pass[0] - 1){

                        bars[values.length - pass[0] - 1].setFill(Color.GREEN);
                        j[0] = 0;
                        pass[0]++;
                    }
                })

        );
        timeline[0].setCycleCount(Timeline.INDEFINITE);
        timeline[0].play();

        Label label = new Label("Sorting Algorithms");
        root.getChildren().add(label);

        Scene scene = new Scene(root, 400, 300);
        stage.setScene(scene);
        stage.setTitle("Algorithm Visualizer");

        stage.show();
    }
}

//        Rectangle rect = new Rectangle(100, 100, 50, 100);
//        rect.setFill(Color.gray(0.5));
//        root.getChildren().add(rect);



//        Swapping Positions
//        double x1 = bars[i].getX();
//        double x2 = bars[i+1].getX(); //Swap Code
//
//        bars[i].setX(x2);
//        bars[i+1].setX(x1);



/*
for (Type variable : collection) {
// use variable }
for (i = 0; i < bars.length; i++) {
Rectangle bar = bars[i];
bar.setFill(Color.CORNFLOWERBLUE);
} the below for loop does the same
*/