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
    let valueArr = displayValue.split(" ").filter(value => value!=="");
    let isOp = classArr.includes("op");
    let isNum = classArr.includes("num");
    operatorCount += (isOp) ? 1 : 0;    

    if (isOp && Number.isNaN(+valueArr[valueArr.length-1])){
        return;
    }

    if (target.id === "equals" || (operatorCount > 1)) {
        operatorCount -= 1;
        if (valueArr.length >= 3) {
            num1 = +valueArr[0];
            operator = valueArr[1];
            num2 = +valueArr[2];
            let result = operate(num1, num2, operator);
            valueArr.splice(0, 3, result);
            displayValue = valueArr.join(" ");
            num1 = result;
            operator = null;
            num2 = null;
            newExp = (target.id === "equals") ? true : false;

        }
    }

    if (isOp || isNum) {
        if (newExp && +value) {
            displayValue = value;
            newExp = false;
        } else if (newExp && value === "0") {
            displayValue = value;
        } else {
            displayValue += value;
            newExp = false;
        }
    }

    display.textContent = displayValue;
}

let num1 = 0;
let num2 = null;
let operator = null;
let displayValue = "0";
let newExp = true;
let operatorCount = 0; //number of operators currently in display
let keypad = document.querySelector(".keypad");
keypad.addEventListener('click', manageClickEvent);

