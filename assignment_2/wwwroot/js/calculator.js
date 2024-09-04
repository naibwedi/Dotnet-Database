document.addEventListener('DOMContentLoaded', () => {
    
    
    const display = document.getElementById('display');
    let currentInput = '';
    let lastChar = '';

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

    const sanitizeInput = (input) => {
        // Convert '**' to '*'
        let sanitized = input
            .replace(/\*\*/g, '*') // Replace '**' with '*'
            .replace(/([+\-*\/]){2,}/g, '$1') // Replace multiple operators with a single one
            .replace(/([+\-*\/])(\d)/g, '$1$2') // Ensure there's no operator before a number
            .replace(/(\d)([+\-*\/])$/g, '$1'); // Remove trailing operator

        // Handle cases where operator appears after operator
        sanitized = sanitized.replace(/([+\-*\/])$/, ''); // Remove trailing operator

        // Handle 'x' as 'x*x' if it ends with a single operator
        if (/(\d)\*\*?$/.test(sanitized)) {
            sanitized += '*';
        }

        return sanitized;
    };

    const appendToDisplay = (value) => {
        if (isOperator(value)) {
            // If the last character was an operator or the display is empty, replace the last operator
            if (isOperator(lastChar) || display.value.length === 0) {
                // Replace the last operator
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                // Append the operator
                currentInput += value;
            }
        } else {
            // Append the number or decimal point
            currentInput += value;
        }
        display.value = sanitizeInput(currentInput);
        lastChar = value;
    };

    const calculateResult = () => {
     
            // Sanitize the input before evaluating
            let expr = sanitizeInput(currentInput)
                .replace(/×/g, '*') // Handle custom multiplication symbol
                .replace(/÷/g, '/'); // Handle custom division symbol
            var newInput = expr.split('');
           
            if(newInput[1]== '*' && newInput[2]== '*' ){
                var sum = newInput[0]*newInput[0];
                display.value = sum ;
            }else{
                // Evaluate the sanitized expression
                display.value = eval(expr) || 'Error';
                currentInput = display.value;
                lastChar = '';
            }
            
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
                }else {
                    appendToDisplay(btn.value);
                }
            });
            
            btn.addEventListener('dblclick', () => {
               if (id === 'multiply'){
                       let expr = sanitizeInput(currentInput)
                           .replace(/×/g, '*') // Handle custom multiplication symbol
                           .replace(/÷/g, '/'); // Handle custom division symbol
                       var newInput = expr.split('');
                       var sum = newInput[0]*newInput[0];
                       display.value = sum ;
               } 
            });
        }
    });
    
    
});

let formCheckInput = document.getElementById('flexSwitchCheckDefault');

formCheckInput.addEventListener('change', () => {

    if (formCheckInput.checked === false) {
        document.getElementById('calc-container').style.backgroundColor = '#d6d6d6';
        document.querySelector('h3').style.color = 'black';
    } else if (formCheckInput.checked === true) {
        document.getElementById('calc-container').style.backgroundColor = 'black';
        document.querySelector('h3').style.color = 'white';
    }

})