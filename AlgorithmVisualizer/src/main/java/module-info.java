module com.algovis.algorithmvisualizer {
    requires javafx.controls;
    requires javafx.fxml;
    requires jdk.xml.dom;


    opens com.algovis.algorithmvisualizer to javafx.fxml;
    exports com.algovis.algorithmvisualizer;
}