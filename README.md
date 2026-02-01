Algorithm Visualizer (JavaFX)

This is a small JavaFX project I built to better understand how sorting algorithms actually work internally.
Instead of just looking at code or theory, the goal here was to see each comparison and swap happen on screen.
Right now, the project focuses on Bubble Sort, visualized step by step using animated bars.

What it does?
Displays an array as vertical bars
Compares elements one step at a time
Highlights the bars being compared
Animates swaps instead of instantly changing values
Marks elements as sorted once they reach their final position
The visualization runs slowly on purpose so each step is easy to follow.

Tech used
Java
JavaFX
Maven
IntelliJ IDEA

No frameworks or libraries beyond JavaFX, the focus is on understanding, not abstraction.

How the visualization works
Each number in the array is represented by a bar
The height of the bar corresponds to the value
The algorithm runs one comparison per time step using a JavaFX Timeline
When two elements are swapped:
the data array is updated
the bars exchange positions on screen
Sorted elements are marked in green and ignored in future passes
The code keeps the algorithm logic and the UI strictly in sync, which was the main learning goal.

Running the project
Open the project in IntelliJ IDEA
Make sure JavaFX is properly configured (via Maven)
Run the main / launcher class
The visualization starts automatically
