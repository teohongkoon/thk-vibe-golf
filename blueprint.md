# Golf Tracker Application Blueprint

## Overview

This document outlines the design and implementation of a Golf Tracker application. The purpose of this application is to allow a user to track their golf game by recording the number of shots to reach the green and the number of putts for each hole. The application will also calculate the total strokes for each hole and display the data in a table.

## Features

-   **Input Form:** A form to enter the par for the hole, the number of shots to reach the green, and the number of putts.
-   **Data Table:** A table to display the data for each hole, including the hole number, par, shots to green, number of putts, and total strokes.
-   **Automatic Total Calculation:** The application will automatically calculate the total strokes for each hole.
-   **End of Round Summary:** A button to end the round and display the total strokes for all holes played.
-   **Auto-focus for Next Hole:** After entering data for a hole, the cursor automatically moves to the "Par" input for the next hole.
-   **Score Coloring:** 
    - Shots to green and putts are colored red if they exceed a certain threshold based on the par for the hole.
    - Total strokes are colored green if they match the par for the hole.
-   **Zebra Striping:** Alternating row colors in the table for readability.
-   **Web Components:** The application will be built using a custom web component to encapsulate the functionality.

## Project Structure

-   `index.html`: The main HTML file.
-   `style.css`: The CSS file for styling the application.
-   `main.js`: The JavaScript file containing the application logic and web component definition.
-   `blueprint.md`: This file.

## Current Plan

1.  **`index.html`:** Set up the basic HTML structure, including a title and a container for the application.
2.  **`main.js`:**
    *   Create a `GolfTracker` custom element.
    *   The component's shadow DOM will contain:
        *   An input form for par, shots to green, and putts.
        *   A button to add the hole data.
        *   A table to display the hole data with the updated "Number of Putts" column.
        *   A button to end the round.
        *   A section to display the total strokes.
    *   Implement the logic to:
        *   Read data from the form.
        *   Calculate the total strokes for each hole.
        *   Add a new row to the table with the entered data, applying conditional coloring to the scores.
        *   Calculate and display the total strokes for the round when the "End Round" button is clicked.
        *   Automatically focus the 'Par' input after a hole is added.
3.  **`style.css`:** 
    * Apply modern styling to the form, table, and other elements to ensure a clean and responsive layout.
    * Add more visible zebra striping to the table rows.
    * Make table columns equal width.