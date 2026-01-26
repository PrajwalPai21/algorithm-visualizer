package com.algovis.algorithmvisualizerproject;

import javafx.application.Application;
//import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

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

        bars[1].setFill(Color.WHITESMOKE);
        Scene scene = new Scene(root);
        stage.setScene(scene);

        stage.setTitle("AlgoVis");
        stage.show();
    }
}

//Rectangle rect = new Rectangle(100, 100, 50, 100);
//rect.setFill(Color.gray(0.5));
//root.getChildren().add(rect);