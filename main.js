const calcultatorItems = {
  _screen: "_screen",
  divisor: "divisor",
  _1: "_1",
  _2: "_2",
  _3: "_3",
  eraser: "eraser",
  multiplier: "multiplier",
  _4: "_4",
  _5: "_5",
  _6: "_6",
  cleaner: "cleaner",
  subtracter: "subtracter",
  _7: "_7",
  _8: "_8",
  _9: "_9",
  equaler: "equaler",
  adder: "adder",
  _0: "_0",
  dot: "dot",
};
const zeroElement = document.querySelector(".calculator__0");
let previousNumber = "",
  operator = "",
  currentNumber = zeroElement.textContent,
  previousOperator = null;
const calculatorScreen = document.querySelector(".calculator__screen");

const show = () => {
  calculatorScreen.value =
    `${previousNumber} ${operator} ${currentNumber}`.trim();
};
show();

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", function (event) {
  const element = event.target;
  if (element.matches("button")) {
    addNumber(element);
    addDot(element);
    addOperator(element);
    calculate(element);
    erase(element);
    reset(element);
  }
  show();
});

const addNumber = (buttonElement) => {
  const { _1, _2, _3, _4, _5, _6, _7, _8, _9, _0 } = calcultatorItems;
  const digitsRegex = new RegExp(
    `${_1}|${_2}|${_3}|${_4}|${_5}|${_6}|${_7}|${_8}|${_9}|${_0}`
  );
  const isANumber = buttonElement.className.match(digitsRegex);
  if (!isANumber) return;

  const pressedNumber = buttonElement.textContent;
  const zeroNumber = zeroElement.textContent;
  if (currentNumber === zeroNumber && pressedNumber !== zeroNumber) {
    currentNumber = pressedNumber;
    return;
  }
  if (currentNumber === zeroNumber && pressedNumber === zeroNumber) return;

  currentNumber += pressedNumber;
};

const addDot = (buttonElement) => {
  const { dot } = calcultatorItems;
  const dotRegex = new RegExp(`${dot}`);
  const isADot = buttonElement.className.match(dotRegex);

  if (!isADot) return;

  const pressedDot = buttonElement.textContent;
  if (currentNumber.includes(pressedDot)) return;

  currentNumber += pressedDot;
};

const addOperator = (buttonElement) => {
  const { divisor, multiplier, subtracter, adder } = calcultatorItems;
  const operatorRegex = new RegExp(
    `${divisor}|${multiplier}|${subtracter}|${adder}`
  );
  const isAnOperator = buttonElement.className.match(operatorRegex);
  if (!isAnOperator) return;

  const previousOperator = operator;
  operator = buttonElement.textContent;
  if (previousNumber && currentNumber === "") return;
  if (previousNumber && currentNumber) {
    previousNumber = calculation(previousOperator);
    currentNumber = "";
  }
  if (previousNumber === "") {
    previousNumber = currentNumber;
    currentNumber = "";
  }
};

const calculate = (buttonElement) => {
  const { equaler } = calcultatorItems;
  const calculaterRegex = new RegExp(`${equaler}`);
  const isAnEqualer = buttonElement.className.match(calculaterRegex);
  if (!isAnEqualer) return;

  if (currentNumber === "") {
    currentNumber = previousNumber;
  }

  currentNumber = calculation(operator);
  previousNumber = "";
  operator = "";
};

const calculation = (operator) => {
  let calculation = null;
  let isFloatCalculation = false;

  if (operator === "+")
    calculation = parseFloat(previousNumber) + parseFloat(currentNumber);
  if (operator === "-")
    calculation = parseFloat(previousNumber) - parseFloat(currentNumber);
  if (operator === "x")
    calculation = parseFloat(previousNumber) * parseFloat(currentNumber);
  if (operator === "÷") {
    calculation = parseFloat(previousNumber) / parseFloat(currentNumber);
    isFloatCalculation = calculation.toString().includes(".");
  }

  return previousNumber.includes(".") ||
    currentNumber.includes(".") ||
    isFloatCalculation
    ? calculation.toString()
    : parseInt(calculation).toString();
};

const erase = (buttonElement) => {
  const { eraser } = calcultatorItems;
  const operatorRegex = new RegExp(`${eraser}`);
  const isAnEraser = buttonElement.className.match(operatorRegex);
  if (!isAnEraser) return;

  if (currentNumber.length === 1 && previousNumber === "" && operator === "") {
    currentNumber = zeroElement.textContent;
    return;
  }
  if (currentNumber.length === 1 && previousNumber !== "" && operator !== "") {
    currentNumber = "";
    return;
  }
  if (currentNumber === "" && previousNumber !== "" && operator !== "") {
    currentNumber = previousNumber;
    previousNumber = "";
    operator = "";
    return;
  }
  currentNumber = currentNumber.slice(0, -1);
};

const reset = (buttonElement) => {
  const { cleaner } = calcultatorItems;
  const operatorRegex = new RegExp(`${cleaner}`);
  const isAReseter = buttonElement.className.match(operatorRegex);
  if (!isAReseter) return;

  previousNumber = "";
  operator = "";
  currentNumber = zeroElement.textContent;
};
