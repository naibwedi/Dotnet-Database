document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('myTextarea');
    let currentInput = '';
    let lastChar = '';

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

    const appendToDisplay = (value) => {
        if (isOperator(value)) {
            // If the last character was an operator or the display is empty, replace the last operator
            if (isOperator(lastChar) || display.value.length === 0) {
                // If the last input was an operator or display is empty, replace the last operator
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                // Append the operator
                currentInput += value;
            }
        } else {
            // Append the number or decimal point
            currentInput += value;
        }
        display.value = currentInput;
        lastChar = value;
    };

    const calculateResult = () => {
        try {
            // Replace special characters with standard operators
            let expr = currentInput
                .replace(/×/g, '*')
                .replace(/÷/g, '/');

            // Evaluate the expression
            display.value = eval(expr) || 'Error';
            currentInput = display.value;
            lastChar = '';
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
        }
    };

    const buttons = [
        'one', 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'zero', 'btnPoint',
        'plus', 'minus', 'divide', 'multiply', 'clear', 'equals','reset'
    ];

    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                if (id === 'clear') {
                    // Clear the last character
                    currentInput = currentInput.slice(0, -1);
                    display.value = currentInput;
                    lastChar = '';
                } else if (id === 'equals') {
                    calculateResult();
                } else if (id === 'reset') {
                    // Reset the display
                    currentInput = '';
                    display.value = '';
                    lastChar = '';
                } else {
                    appendToDisplay(btn.value);
                }
            });
        }
    });
});
