package com.algovis.algorithmvisualizerproject;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
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
        Rectangle rect = new Rectangle(100, 100, 50, 100);
        Rectangle rect2 = new Rectangle(200, 200, 100, 200);
        rect.setFill(Color.gray(0.5));
        rect2.setFill(Color.rgb(0,0,255));
        root.getChildren().add(rect);
        root.getChildren().add(rect2);

        Scene scene = new Scene(root);
        stage.setScene(scene);

        stage.setTitle("AlgoVis");
        stage.show();
    }
}
