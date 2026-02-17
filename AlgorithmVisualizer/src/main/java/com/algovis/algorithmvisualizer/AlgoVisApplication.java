package com.algovis.algorithmvisualizer;

import com.algovis.algorithmvisualizer.ui.MenuView;
import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
//import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
//import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Duration;
import javafx.application.Application;
import java.util.Random;

public class AlgoVisApplication extends Application {

    private Stage primaryStage; //swithcing screens

//    sorting variables
    private int[] values;
    private Rectangle[] bars;
    private Timeline timeline;

//    Inner and outer loop index
    private int j = 0;
    private int pass = 0;
    private int comparisons = 0;

//    Selection Sort starting state
    private int selI = 0; // current pos
    private int selJ = 1; // scanning index
    private int minIndex = 0; // smallest

//    for ui
    private Pane root;
    private Label algoLabel;
    private Label infoLabel;
    private Slider speedSlider;
    private Slider sizeSlider;
    private Button resetButton;
    private Button playPauseButton;
    private String currentAlgorithmSelected;

//    private ComboBox<String> algoDropdown;
    private static final int MAX_BAR_HEIGHT = 200;

    @Override
    public void start(Stage stage) {

        this.primaryStage = stage;
        MenuView menuView = new MenuView(this::showVisualizer);
        Scene scene = new Scene(menuView, 600, 360);
        stage.setScene(scene);
        stage.setTitle("Algorithm Visualizer");
        stage.show();
    }

    public void showVisualizer(String algorithmName) {
        this.currentAlgorithmSelected = algorithmName;
        root = new Pane();
//      Method Calls
        createLabels();
        createSpeedSlider();
        createSizeSlider();
        createResetButton();
        createPlayPauseButton();
        generateArray(10); //this wil be the starting size
        createBars();
        startBubbleSort();
        createBackButton();

        algoLabel.setText(algorithmName);
        if(algorithmName.equals(currentAlgorithmSelected))
            startBubbleSort();
        else
            startSelectionSort();


        speedSlider.valueProperty().addListener((
                obs,
                oldVal,
                newVal) -> {
            if(timeline != null)
                timeline.setRate(newVal.doubleValue());
        });
        Scene scene = new Scene(root, 600, 360);
        primaryStage.setScene(scene);
    }

    public void showMenu(){
        MenuView menuView = new MenuView(this::showVisualizer);
        Scene scene = new Scene(menuView, 600, 360);
        primaryStage.setScene(scene);
    }

    private void createBackButton(){
        Button backButton = new Button("Back");
        backButton.setLayoutX(10);
        backButton.setLayoutY(80);

        backButton.setOnAction(event->{
            if(timeline != null)
                timeline.stop();

            showMenu();
        });
        root.getChildren().add(backButton);

    }

    private void createLabels() {
        algoLabel = new Label("Bubble Sort");
        algoLabel.setLayoutX(10);
        algoLabel.setLayoutY(10);
        algoLabel.setStyle("-fx-font-size: 16px; -fx-font-weight: bold");

        infoLabel = new Label("Pass: 0 | Comparisons: 0");
        infoLabel.setLayoutX(10);
        infoLabel.setLayoutY(32);
        infoLabel.setStyle("-fx-font-size: 12px; -fx-text-fill: #555");

        root.getChildren().addAll(algoLabel, infoLabel);
    }

    private void createSpeedSlider() {
        speedSlider = new Slider(0.2,2.0,1.0);
        speedSlider.setLayoutX(120);
        speedSlider.setLayoutY(320);
        speedSlider.setPrefWidth(200);

        Label speedLabel = new Label("Speed");
        speedLabel.setLayoutX(70);
        speedLabel.setLayoutY(318);
//        speedSlider.setStyle("-fx-font-size: 12px;");

        root.getChildren().addAll(speedLabel, speedSlider);
    }

    private void createSizeSlider() {
        sizeSlider = new Slider(5,40,10);
        sizeSlider.setLayoutX(380);
        sizeSlider.setLayoutY(320);
        sizeSlider.setPrefWidth(150);

        sizeSlider.setMajorTickUnit(5);
//        sizeSlider.setMinorTickCount(0);
        sizeSlider.setSnapToTicks(true);

        Label sizeLabel = new Label("Size");
        sizeLabel.setLayoutX(340);
        sizeLabel.setLayoutY(318);

        root.getChildren().addAll(sizeLabel, sizeSlider);
    }

    private void createPlayPauseButton(){
        playPauseButton = new Button("Pause"); //Initial State of the button
        playPauseButton.setLayoutX(10);
        playPauseButton.setLayoutY(50);
        playPauseButton.setOnAction(event -> playPauseMethod());


        root.getChildren().add(playPauseButton);
    }

    private void playPauseMethod(){
//      If someone clicks before timeline is created (future changes), this can crash.
        if(timeline == null)
            return;

        if(timeline.getStatus() == Animation.Status.RUNNING){
            timeline.pause();
            playPauseButton.setText("Play");
        }
        else{
            timeline.play();
            playPauseButton.setText("Pause");
        }
    }

    private void createResetButton(){
        resetButton = new Button("Reset");
        resetButton.setLayoutX(530);
        resetButton.setLayoutY(316);

        resetButton.setOnAction(event -> reset());
        root.getChildren().add(resetButton);
    }

    private void reset(){
        if(timeline != null)
            timeline.stop();

        algoLabel.setText("Bubble Sort");

        root.getChildren().removeIf(n -> n instanceof Rectangle);

        int newSize = (int) sizeSlider.getValue();
        generateArray(newSize);
        createBars();

        comparisons = 0;
        infoLabel.setText("Pass: 0 | Comparisons: 0");
        startBubbleSort();
    }

    private void generateArray(int size){
        Random random = new Random();
        values = new int[size];
        for(int i = 0; i < size; i++){
            values[i] = random.nextInt(MAX_BAR_HEIGHT - 20) + 20;
        }
    }

    private void createBars() {
        bars = new Rectangle[values.length];

        double width = 560.0/values.length;
        double x = 20;

        for (int i = 0; i < values.length; i++) {
            Rectangle bar = new Rectangle(
                    x,
                    260 - values[i],
                    width - 4,
                    values[i]
            ); //position
            bar.setFill(Color.CORNFLOWERBLUE);
            bars[i] = bar;
            root.getChildren().add(bar);
            x += width; //Gap between each bar
        }
    }

    private void startBubbleSort() {
        j = 0;
        pass = 0;
        comparisons = 0;

        timeline = new Timeline(
                new KeyFrame(Duration.seconds(1), e -> bubbleSortStep())
        );
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }

    private void bubbleSortStep() {
//        once sorting is finish
        if (pass >= values.length - 1) {
            for (Rectangle bar : bars)
                bar.setFill(Color.GREEN);
            infoLabel.setText("Sorted: ✔ | Comparisons: "+ comparisons );
            timeline.stop();
            return;
        }
        resetColors(); //method need to be created
        highlight(j, j + 1); // method need to create

        comparisons++;
        infoLabel.setText("Pass: "+ (pass + 1) + " | Comparisons: "+ comparisons);

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

    private void startSelectionSort(){
        selI = 0;
        selJ = selI + 1;
        minIndex = selI;
        comparisons = 0;
        timeline = new Timeline(
                new KeyFrame(Duration.seconds(1), e -> selectionSortStep())
        );
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }

    private void selectionSortStep() {
//        after finish
        if(selI >= values.length - 1){
            for (Rectangle bar : bars)
                bar.setFill(Color.GREEN);

            infoLabel.setText("Sorted ✔ | Comparisons: "+ comparisons);
            timeline.stop();
            return;
        }
        resetColors();

//        current pos and min
        bars[selI].setFill(Color.ORANGE);
        bars[minIndex].setFill(Color.RED);

        if(values[selJ] < values[minIndex]){
            minIndex = selJ;
        }
        comparisons++;
        infoLabel.setText( "Position: " + (selI + 1) +
                " | Comparisons: " + comparisons
        );

        selJ++;

        if(selJ >= values.length){
            if(minIndex != selI)
                swap(selI, minIndex);
        }
        bars[selI].setFill(Color.GREEN);
        selI++;
        minIndex = selI;
        selJ = selI + 1;
        selJ = selJ + 1;
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