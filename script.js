// light/Dark Theme
const toggleElement = document.querySelector('.themes__toggle');

const toggleDarkTheme = () => toggleElement.classList.toggle('themes__toggle--isActive');

const toggleDarkThemeEnter = () => (event) => event.key === 'Enter' && toggleDarkTheme();

toggleElement.addEventListener('click', toggleDarkTheme);
// For Accessibility
toggleElement.addEventListener('keydown', toggleDarkThemeEnter);

//------
// Logic For Calculator
let storedNumber = '';
let currentNumber = '';
let operation = '';

const keyElements = document.querySelectorAll('[data-type]');
const resultElement = document.querySelector('.calc__result');

const updateScreen = (value) => {
  resultElement.innerText = !value ? '0' : value;
};

const numberButtonHandler = (value) => {
  if (value === '.' && currentNumber.includes('.')) return;
  if (value === '0' && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = '';
  currentNumber = '';
  operation = '';
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === '0') return;

  if (currentNumber.length === 1) {
    currentNumber = '';
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case '+':
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case '-':
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case '*':
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case '/':
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
        // no default
    }
    currentNumber = '';
    updateScreen(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = '';
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener('click', () => {
    const { type } = element.dataset;

    if (type === 'number') {
      numberButtonHandler(element.dataset.value);
    } else if (type === 'operation') {
      switch (element.dataset.value) {
        case 'c':
          resetButtonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};

keyElements.forEach(keyElementsHandler);

// Use keyboard For Accessibility
const availableNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const availableOperation = ['+', '-', '*', '/'];
const availableKeys = [...availableNumbers, ...availableOperation, 'Enter', 'c', 'Backspace'];

// const keyboardWithoutHover = (event.key) => {
//   if (availableNumbers.includes(event.key)) {
//     numberButtonHandler(event.key);
//   } else if (availableOperation.includes(event.key)) {
//     operationButtonHandler(event.key);
//   } else if (event.key === 'Backspace') {
//     deleteButtonHandler();
//   } else if (event.key === 'c') {
//     resetButtonHandler();
//   } else if (event.key === 'Enter') {
//     executeOperation();
//   }
// };

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add('hover');
    elem.click();
    setTimeout(() => elem.classList.remove('hover'), 100);
  }
};

window.addEventListener('keydown', (event) => {
  // keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
  // const key = event.key;
});
