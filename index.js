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
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);

    }
}

function manageClickEvent(event) {
    let target = event.target;
    let classArr = [...target.classList];
    if (classArr.includes("op") || classArr.includes("num")) {
        let display = document.querySelector(".display");
        display.textContent += target.textContent;
    }
}

let num1 = null;
let num2 = null;
let operator = null;
let displayValue = "0";
let buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', manageClickEvent);
})
