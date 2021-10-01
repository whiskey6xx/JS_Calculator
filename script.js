//this calculator will have very basic functions
//it should have it's display at the top which will display the current number, problem, and result
//it will also have a clear button, del button, add, subtract, divide, multiply, digits 0-9, a decimal, and equal button

//we need to create a calculator class that has the previous and current operand text element
//we will need to devl

//when you create a class, you need to call class, the name, and the write the contents
//you should declare a constructor, if one is not delcared, one is automatically created with a null value
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        //this is a way to create variables so that they can be called upon with the object
        //if we called Calculator.previousOperandTextElement, it would give us the one we fed into the object when we initialized it
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //we need several functions for this to work

    //we need a clear function that clears all the variables
    clear() {
        //this is initialize the current and previousOperand variables, as well as clearing them, if they are already there
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }



    //we need a function to delete a single number
    delete() {
        //toString converts integers to strings, slice removes the 
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }


    //we need a function that says what happens when the user clicks a number to add it to the display
    //appendNumber(number)
    appendNumber(number) {
        console.log(number);
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }


    //we need a function that says what happens when the user hits a operand button
    //chooseOperation(operation)
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }   else {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }


    //we need a function that takes the values in the calculator and displays the results
    //compute()
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        } else {
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //we need a function that updates the values in the output
    //updateDisplay
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}

//we have to declare our variables

//the number buttons
const numberButtons = document.querySelectorAll('[data-num]');
console.log(numberButtons);
//the operators
const operationButtons = document.querySelectorAll('[data-op]');
console.log(operationButtons);
//the equal
const equalsButton = document.querySelector('[data-equals]');
console.log(equalsButton);
//the delete
const deleteButton = document.querySelector('[data-del]');
console.log(deleteButton);
//AC button
const allClearButton = document.querySelector('[data-ac]');
console.log(allClearButton);
//previous operand
const previousOperandTextElement = document.querySelector('[data-prev-num]');
console.log(previousOperandTextElement);
//current operand
const currentOperandTextElement = document.querySelector('[data-curr-num]');
console.log(currentOperandTextElement);
//
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
console.log(calculator);


//This will be where we have our loops listen for input on the buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

