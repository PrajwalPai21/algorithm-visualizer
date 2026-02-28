function VisualizationArea({ array }) {
  return (
    <div style={styles.container}>
      {array.map(
        (
          value,
          index, //loops over array
        ) => (
          <div
            key={index}
            style={{
              height: `${value}px`,
              width: "25px",
              margin: "0 2px",
              backgroundColor: "steelblue",
            }}
          />
        ),
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "400px",
    border: "2px solid black",
    marginTop: "20px",
    display: "flex",
    // pushes items to bottem of container
    alignItems: "flex-end",
    justifyContent: "center",
  },
};

export default VisualizationArea;
