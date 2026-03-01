function VisualizationArea({ array, comparing, swapping }) {
  return (
    <div style={styles.container}>
      {array.map((value, index) => {
        let backgroundColor = "steelblue";

        if (swapping.includes(index)) {
          backgroundColor = "red";
        } else if (comparing.includes(index)) {
          backgroundColor = "gold";
        }

        return (
          <div
            key={index}
            style={{
              height: `${value}px`,
              width: "30px",
              margin: "0 4px",
              backgroundColor,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    height: "400px",
    border: "2px solid black",
    marginTop: "20px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
};

export default VisualizationArea;
