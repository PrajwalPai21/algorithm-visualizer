package com.algovis.algorithmvisualizer.ui;

import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;

import java.util.function.Consumer;

public class MenuView extends Pane {
    public MenuView(Consumer<String> onAlgorithmSelected) {
        setPrefSize(600,360);

        Label title = new Label("Algorithm Visualizer");
        title.setLayoutX(200);
        title.setLayoutY(60);
        title.setStyle("-fx-font-size: 20px; -fx-font-weight: bold;");

        Button bubbleSortBtn = new Button("Bubble Sort");
        bubbleSortBtn.setLayoutX(250);
        bubbleSortBtn.setLayoutY(140);
        bubbleSortBtn.setPrefWidth(120);

        Button selectionSortBtn = new Button("Selection Sort");
        selectionSortBtn.setLayoutX(250);
        selectionSortBtn.setLayoutY(190);
        selectionSortBtn.setPrefWidth(120);
//        Label loading = new  Label("Loading...");
        bubbleSortBtn.setOnAction(event -> onAlgorithmSelected.accept("Bubble Sort"));
        selectionSortBtn.setOnAction(event -> onAlgorithmSelected.accept("Selection Sort"));
        getChildren().addAll(title,bubbleSortBtn,selectionSortBtn);
    }
}
