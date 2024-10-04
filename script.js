let displayValue = '0';   // Current value on the display
let firstOperand = null;  // Stores the first number entered
let operator = null;      // Stores the chosen operator
let waitingForSecondOperand = false;  // Tracks if the second number is being entered

let memoryValue = 0;  // Memory storage for M+, M-, MR, MC functions

// Function to update the display with the current value
function updateDisplay() {
    const display = document.querySelector('#display'); // Target the display element
    display.textContent = displayValue; // Update its text content with current display value
}

// Initial call to set the default display
updateDisplay();

// Function to handle number input
function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;  // If waiting for the second operand, reset the display
        waitingForSecondOperand = false;
    } else {
        // If it's the first operand, update the display with the digit
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();  // Refresh the display after the update
}

// Function to handle decimal point input
function inputDecimal() {
    // Ensure there's no duplicate decimal point in the current input
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

// Function to set the chosen operator
function setOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);  // Parse current display value as a number

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;  // If already waiting for a second operand, update operator
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;  // Store the first operand
    } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);  // Perform the calculation
        displayValue = `${parseFloat(result.toFixed(7))}`;  // Round result for accuracy
        firstOperand = result;  // Store result as the new first operand
    }

    waitingForSecondOperand = true;  // Ready for second operand input
    operator = nextOperator;  // Set the new operator
    updateDisplay();
}

// Function to perform the actual calculation
function performCalculation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;  // Handle division by zero
        default:
            return second;
    }
}

// Function to calculate result when "=" is pressed
function calculate() {
    if (operator && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);  // Parse the current display value as a number
        const result = performCalculation(firstOperand, inputValue, operator);  // Calculate the result
        displayValue = `${parseFloat(result.toFixed(7))}`;  // Display the result
        firstOperand = null;  // Reset the first operand
        operator = null;      // Reset the operator
        waitingForSecondOperand = false;  // Reset the flag for second operand
    }
    updateDisplay();
}

// Function to clear the display and reset all values
function clearDisplay() {
    displayValue = '0';   // Reset the display value
    firstOperand = null;  // Reset the first operand
    operator = null;      // Reset the operator
    waitingForSecondOperand = false;  // Reset the flag for second operand
    updateDisplay();
}

// Function to calculate percentage
function calculatePercentage() {
    displayValue = (parseFloat(displayValue) / 100).toString();  // Convert the current value to percentage
    updateDisplay();
}

// Function to calculate square root
function calculateSquareRoot() {
    displayValue = Math.sqrt(parseFloat(displayValue)).toString();  // Calculate the square root
    updateDisplay();
}

// Memory functions: M+, M-, MR, MC
function memoryAdd() {
    memoryValue += parseFloat(displayValue);  // Add the current display value to memory
}

function memorySubtract() {
    memoryValue -= parseFloat(displayValue);  // Subtract the current display value from memory
}

function memoryRecall() {
    displayValue = memoryValue.toString();  // Display the memory value on the screen
    updateDisplay();
}

function memoryClear() {
    memoryValue = 0;  // Clear the memory value
}
