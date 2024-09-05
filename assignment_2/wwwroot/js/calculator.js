document.addEventListener("DOMContentLoaded", function() {
    // Get the display element
    const display = document.getElementById("display");

    // Initialize state variables
    let currentEntry = "";  // Current number or operand being entered
    let currentResult = 0;  // Current result of the calculation
    let lastOperator = null; // Last operator used (+, -, *, /)

    // Function to update the display with the given value
    function updateDisplay(value) {
        display.innerText = value;
    }

    // Function to handle number button clicks
    function handleNumberClick(num) {
        currentEntry += num; // Append the clicked number to the current entry
        updateDisplay(currentEntry); // Update the display with the new entry
    }

    // Function to handle operator button clicks
    function handleOperatorClick(operator) {
        if (currentEntry !== "") {
            // If there is a current entry, calculate the result using the last operator
            if (lastOperator !== null) {
                try {
                    currentResult = eval(currentResult + lastOperator + currentEntry);
                } catch {
                    updateDisplay("Error");
                    currentEntry = "";
                    lastOperator = null;
                    return;
                }
            } else {
                // If no previous operator, set the current entry as the result
                currentResult = parseFloat(currentEntry);
            }
            updateDisplay(currentResult); // Update the display with the result
            currentEntry = ""; // Clear the current entry
        }
        lastOperator = operator; // Store the new operator
    }

    // Function to handle the equals button click
    function handleEqualsClick() {
        if (lastOperator !== null && currentEntry !== "") {
            try {
                currentResult = eval(currentResult + lastOperator + currentEntry);
                updateDisplay(currentResult); // Update the display with the result
            } catch {
                updateDisplay("Error");
            }
            currentEntry = ""; // Clear the current entry
            lastOperator = null; // Reset the last operator
        }
    }

    // Function to handle the clear entry button click
    function handleClearEntry() {
        currentEntry = ""; // Clear the current entry
        updateDisplay(currentResult || 0); // Reset the display to the current result or 0
    }

    // Function to handle the reset button click
    function handleReset() {
        currentEntry = ""; // Clear the current entry
        currentResult = 0; // Reset the result
        lastOperator = null; // Reset the last operator
        updateDisplay(0); // Reset the display to 0
    }

    // Event Listeners for number buttons
    document.getElementById("one").addEventListener("click", () => handleNumberClick("1"));
    document.getElementById("two").addEventListener("click", () => handleNumberClick("2"));
    document.getElementById("three").addEventListener("click", () => handleNumberClick("3"));
    document.getElementById("four").addEventListener("click", () => handleNumberClick("4"));
    document.getElementById("five").addEventListener("click", () => handleNumberClick("5"));
    document.getElementById("six").addEventListener("click", () => handleNumberClick("6"));
    document.getElementById("seven").addEventListener("click", () => handleNumberClick("7"));
    document.getElementById("eight").addEventListener("click", () => handleNumberClick("8"));
    document.getElementById("nine").addEventListener("click", () => handleNumberClick("9"));
    document.getElementById("zero").addEventListener("click", () => handleNumberClick("0"));

    // Event Listeners for operator buttons
    document.getElementById("plus").addEventListener("click", () => handleOperatorClick("+"));
    document.getElementById("minus").addEventListener("click", () => handleOperatorClick("-"));
    document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("*"));
    document.getElementById("divide").addEventListener("click", () => handleOperatorClick("/"));

    // Event Listener for equals button
    document.getElementById("equals").addEventListener("click", handleEqualsClick);

    // Event Listeners for clear and reset buttons
    document.getElementById("clear").addEventListener("click", handleClearEntry);
    document.getElementById("reset").addEventListener("click", handleReset);

    // Handling double click on multiply button to square the last number
    document.getElementById("multiply").addEventListener("dblclick", () => {
        if (currentEntry !== "") {
            try {
                const number = parseFloat(currentEntry);
                const result = number * number; // Square the number
                updateDisplay(result);
                currentEntry = result.toString(); // Update currentEntry
                lastOperator = null; // Reset the last operator
            } catch {
                updateDisplay("Error");
            }
        }
    });
});
