package com.algovis.algorithmvisualizerproject;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
//import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.IOException;

public class AlgoVisApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        Pane root = new Pane();

        int[] values = {10,20,30,40,50}; //Height of the bars
        int x = 20;
        Rectangle[] bars = new Rectangle[values.length];

        for(int i=0;i<values.length;i++){
            Rectangle bar = new Rectangle(x,200- values[i] , 40 , values[i]); //position
            bar.setFill(Color.rgb((int) (Math.random() * 256), (int) (Math.random() * 256), (int) (Math.random() * 256)));
            bars[i] = bar;
            root.getChildren().add(bar);
            x+=50; //Gap between each bar
        }
        int i = 1;
        bars[i].setFill(Color.RED);
        bars[i+1].setFill(Color.RED);

        Timeline timeline = new Timeline(
                new KeyFrame(Duration.seconds(2), event -> {
                    // Swap Bars after 2 seconds ,
                    double x1 = bars[i].getX();
                    double x2 = bars[i+1].getX(); //Swap Code

                    bars[i].setX(x2);
                    bars[i+1].setX(x1);
                })
        );

        timeline.play();

        Label label = new Label("TEST");
        root.getChildren().add(label);

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Algorithm Visualizer");

        stage.show();
    }
}

//Rectangle rect = new Rectangle(100, 100, 50, 100);
//rect.setFill(Color.gray(0.5));
//root.getChildren().add(rect);



//        Swapping Positions
//        double x1 = bars[i].getX();
//        double x2 = bars[i+1].getX(); //Swap Code
//
//        bars[i].setX(x2);
//        bars[i+1].setX(x1);