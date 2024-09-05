document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let lastChar = '';

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

    const sanitizeInput = (input) => {
        let sanitized = input;

        // Remove duplicate operators and handle specific cases
        sanitized = sanitized.replace(/([+\-*/])\1+/g, '$1');

        // Prevent leading operator or consecutive operators
        sanitized = sanitized.replace(/^([+\-*/])/, '');
        sanitized = sanitized.replace(/([+\-*/])([+\-*/])/, '$1');

        return sanitized;
    };

    const appendToDisplay = (value) => {
        if (isOperator(value)) {
            // Check for consecutive operators
            if (isOperator(lastChar) || display.value.length === 0) {
                return; // Do not add the operator if the last char was an operator
            }
        }
        currentInput += value;
        display.value = sanitizeInput(currentInput);
        lastChar = value;
    };

    const calculateResult = () => {
        let expr = sanitizeInput(currentInput)
            .replace(/×/g, '*') // Handle custom multiplication symbol
            .replace(/÷/g, '/'); // Handle custom division symbol

        try {
            // Evaluate the sanitized expression
            let result = eval(expr);
            display.value = isFinite(result) ? result : 'Error';
        } catch (e) {
            display.value = 'Error';
        }

        currentInput = display.value;
        lastChar = '';
    };

    const buttons = [
        'one', 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'zero', 'btnPoint',
        'plus', 'minus', 'divide', 'multiply', 'clear', 'equals', 'reset'
    ];

    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                if (id === 'clear') {
                    // Clear the last character
                    currentInput = currentInput.slice(0, -1);
                    display.value = sanitizeInput(currentInput);
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

            btn.addEventListener('dblclick', () => {
                if (id === 'multiply') {
                    // Sanitize and prepare the current input
                    let expr = sanitizeInput(currentInput)
                        .replace(/×/g, '*') // Handle custom multiplication symbol
                        .replace(/÷/g, '/'); // Handle custom division symbol

                    // Try to parse the expression and calculate the result
                    try {
                        // Extract the number to be squared
                        let number = parseFloat(expr);
                        if (!isNaN(number)) {
                            let result = number * number; // Square the number
                            display.value = result;
                            currentInput = result.toString(); // Update currentInput
                        } else {
                            display.value = 'Error'; // Invalid number
                        }
                    } catch (e) {
                        display.value = 'Error'; // Handle errors
                    }

                    lastChar = ''; // Reset the last character
                }
            });

        }
    });

    let formCheckInput = document.getElementById('flexSwitchCheckDefault');

    formCheckInput.addEventListener('change', () => {
        if (formCheckInput.checked === false) {
            document.getElementById('calc-container').style.backgroundColor = '#d6d6d6';
            document.querySelector('h3').style.color = 'black';
        } else {
            document.getElementById('calc-container').style.backgroundColor = 'black';
            document.querySelector('body').style.backgroundColor = '#d6d6d6';
            document.querySelector('h3').style.color = 'white';
        }
    });
});
