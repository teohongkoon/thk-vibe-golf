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
    -   Shots to green and putts are colored red if they exceed a certain threshold based on the par for the hole.
    -   Total strokes are colored green if they match the par for the hole.
-   **Zebra Striping:** Alternating row colors in the table for readability.
-   **Web Components:** The application is built using a single `golf-tracker` custom web component. This encapsulates all the functionality, HTML structure, and styling, preventing conflicts with other parts of the page.
-   **Disqus Forum:** Integrated community forum for users to discuss their rounds and share tips.

## Project Structure

-   `index.html`: The main HTML file, which includes the `<golf-tracker>` element and the Disqus forum integration.
-   `style.css`: Contains minimal global styles for the `body` and `h1` elements. All component-specific styles have been moved into the component itself.
-   `main.js`: The JavaScript file containing the `GolfTracker` web component definition, including its internal HTML structure and CSS styles.
-   `blueprint.md`: This file.

## Completed Changes

### Core Component Implementation
-   Created a `GolfTracker` custom element in `main.js`.
-   The component's shadow DOM contains an input form, a data table, and buttons.
-   Implemented logic for adding holes, calculating strokes, and ending the round.
-   Added score coloring for immediate visual feedback on performance.

### Styling and Layout
-   **Component-Level Styling:** All styles for the form, table, buttons, and layout were moved from the global `style.css` into a `<style>` block within the `GolfTracker` component's shadow DOM. This was done to properly encapsulate the component and solve styling issues related to the Shadow DOM boundary.
-   **Equal-Width Table Columns:** The issue with unequal column widths was resolved by:
    1.  Setting `table-layout: fixed;` on the `table` element within the component's style.
    2.  Setting `width: 20%;` on the `th` elements to ensure each of the five columns occupies an equal amount of space.
-   **Table Row Colors:** Implemented alternating row colors (`#add8e6` and `#e6e6fa`) for better readability.

### Disqus Integration
-   Added `<div id="disqus_thread"></div>` to `index.html`.
-   Injected the Disqus universal embed script.
-   Styled the Disqus container in `index.html` to match the application's visual theme.
