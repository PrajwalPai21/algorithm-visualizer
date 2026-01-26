module com.algovis.algorithmvisualizerproject {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.algovis.algorithmvisualizerproject to javafx.fxml;
    exports com.algovis.algorithmvisualizerproject;
}