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
    if (y == 0) return "Can't divide by Zero";
    result = x / y;
    if (!Number.isInteger(result))
        result = result.toFixed(5);
    return result;
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
    const classArr = [...target.classList];
    let targetValue = target.textContent;
    let display = document.querySelector(".display");
    const valueArr = display.textContent.split(" ").filter(element => element !== "");
    let isOp = classArr.includes("op");
    let isNum = classArr.includes("num");
    operatorCount += (isOp) ? 1 : 0;

    if (isOp && Number.isNaN(+valueArr[valueArr.length - 1])) {
        return;
    }
    if (targetValue === "." && valueArr[valueArr.length - 1].includes(".")) {
        return;
    }

    if (target.id === "equals" || (operatorCount > 1)) {
        operatorCount -= 1;
        if (valueArr.length >= 3) {
            let result = operate(+valueArr[0], +valueArr[2], valueArr[1]);
            if (Number.isNaN(+result)) {
                display.textContent = result ? result : "0";
                errorDisplayed = true;
                newExp = true;
            } else {
                valueArr.splice(0, 3, result);
                display.textContent = valueArr.join(" ");
                newExp = (target.id === "equals") ? true : false;
            }
        }
    }

    if (isOp || isNum) {
        if (newExp && +targetValue) {
            display.textContent = targetValue;
            newExp = false;
        } else if (newExp && targetValue === "0") {
            display.textContent = targetValue;
        } else {
            if (errorDisplayed) {
                display.textContent = "0";
                errorDisplayed = false;
            }
            display.textContent += targetValue;
            newExp = false;
        }
    }

    switch (target.id) {
        case "clear":
            display.textContent = "0";
            newExp = true;
            errorDisplayed = false;
            operatorCount = 0;
            break;
        case "backspace":
            if (!errorDisplayed && !newExp) {
                let content = display.textContent;
                if (content.length === 1) {
                    display.textContent = "0";
                    newExp = true;
                    errorDisplayed = false;
                    operatorCount = 0;
                }
                else if (content[content.length - 1] === " ")
                    display.textContent = content.slice(0, -3);
                else
                    display.textContent = content.slice(0, -1);
            }
            break;

        case "percent":
            if (valueArr.length === 1 && !Number.isNaN(+valueArr[0]))
                display.textContent = divide(+valueArr[0], 100);
            break;
    }

}


let newExp = true;
let errorDisplayed = false;
let operatorCount = 0; //number of operators currently in display
let keypad = document.querySelector(".keypad");
keypad.addEventListener('click', manageClickEvent);

