module com.algovis.hellofx {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.algovis.hellofx to javafx.fxml;
    exports com.algovis.hellofx;
}