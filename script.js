class Calculator {
    constructor(previousOperandTextElemetnt, currentOperandTextElemetnt) {
        this.previousOperandTextElemetnt = previousOperandTextElemetnt
        this.currentOperandTextElemetnt = currentOperandTextElemetnt
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // console.log("Appending: ", number);
        // console.log("appendNumber: Current Operand: ", this.currentOperand);
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        // console.log("updateDisplay: Current Operand: ", this.currentOperand);
        // console.log("updateDisplay: BEFORE innerText: ", this.currentOperandTextElemetnt.innerText);
        this.currentOperandTextElemetnt.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElemetnt.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElemetnt.innerText = ''
        }
        // console.log("updateDisplay: AFTERinnerText: ", this.currentOperandTextElemetnt.innerText);
    }


}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equlasButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElemetnt = document.querySelector('[data-previous-operand]')
const currentOperandTextElemetnt = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElemetnt, currentOperandTextElemetnt)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log("You clicked: ", button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log("You clicked: ", button.innerText)
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equlasButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})