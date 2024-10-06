// Simple Calculator Functions

// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        return "Error! Division by zero.";
    }
    return a / b;
}

// Example usage
const num1 = 10;
const num2 = 5;

console.log("Addition:", add(num1, num2));         // Output: 15
console.log("Subtraction:", subtract(num1, num2)); // Output: 5
console.log("Multiplication:", multiply(num1, num2)); // Output: 50
console.log("Division:", divide(num1, num2));      // Output: 2

// Export the functions (for Node.js environment or use in other files)
module.exports = { add, subtract, multiply, divide };
