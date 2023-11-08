function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);

    }
}

function manageClickEvent(event) {
    let target = event.target;
    let classArr = [...target.classList];
    let value = target.textContent;
    let display = document.querySelector(".display");
    if (classArr.includes("op") || classArr.includes("num")) {
        if (newExp && +value) {
            displayValue = value;
            newExp = false;
        } else {
            displayValue += value;
        }
    }

    if (target.id === "equals") {
        let arr = displayValue.split(" ");
        console.log(arr);
        if (arr.length === 3) {
            num1 = +arr[0];
            operator = arr[1];
            num2 = +arr[2];
            displayValue = `${operate(num1, num2, operator)}`;

        }
    }
    display.textContent = displayValue;
}

let num1 = 0;
let num2 = null;
let operator = null;
let displayValue = "0";
let newExp = true;
let keypad = document.querySelector(".keypad");
keypad.addEventListener('click', manageClickEvent);

