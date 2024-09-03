let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let seven = document.getElementById('seven');
let eight = document.getElementById('eight');
let nine = document.getElementById('nine');
let zero = document.getElementById('zero');
let btnPoint = document.getElementById('btnPoint');
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let divide = document.getElementById('divide');
let multiply = document.getElementById('multiply');
let clear = document.getElementById('clear');
let equals = document.getElementById('equals');
let txtArea = document.getElementById('myTextarea');

var btnArray = [one, two, three, four, five, six , seven, eight, nine, zero, btnPoint, plus, minus, divide, multiply, clear];

for (let i = 0; i < btnArray.length; i++) {
    if (btnArray[i]) {
        btnArray[i].addEventListener('click', () => {
            txtArea.value += btnArray[i].value;
        });
    }
}

clear.addEventListener('click', () => {
    txtArea.value = txtArea.value.substring(0, txtArea.value.length - 1);
})

reset.addEventListener('click', () => {
    txtArea.value = '';
})

equals.addEventListener('click', () => {
    try {

        var checkString = txtArea.value.split(' ');
        for (let i = 0; i <checkString.length ; i++) {
            if (checkString[i]=='×'){
                checkString[i] = '*';
                alert(checkString[i])
            }
            if(checkString[i]=='÷'){
                checkString[i]= '/';
                alert(checkString[i])
            }
        }

        alert(typeof checkString);
        // Use eval to evaluate the expression
        // txtArea.value = eval(txtArea.value);
        txtArea.value = eval(checkString.join(' '));
    } catch (error) {
        // If there is an error (e.g., invalid expression), show "Error"
        txtArea.value = 'Error';
    }
})




