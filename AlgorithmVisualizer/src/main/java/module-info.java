module com.algovis.algorithmvisualizer {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.algovis.algorithmvisualizer to javafx.fxml;
    exports com.algovis.algorithmvisualizer;
}