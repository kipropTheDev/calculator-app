//create the calculator class to handle all operations

class Calculator{

    //initialize class with constructor that takes in the two numbers that need to be computer
    constructor(prevOpp, currentOpp){

        this.prevOpp = prevOpp
        this.currentOpp = currentOpp

        //call clear function to clear calculator when initialized
        this.clear()
    }

    clear(){
        //create variables and set them to null
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){

        //if statement checks if the number already contains a period
        //convert numbers to string to prevent math operations and instead add a number at the end of the current number
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        //pushes the current operation to the top after the choice of calculation is made
        //also adds the symbol of the calculation to the end the prev. num
        if(this.currentOperand === '') return//checks if no val provided

        //checks if sec val is provided if so runs the compute function
        //allows you to chain operations i.e instead of '1 + 1 = 2 + 1 = 3 ' > '1 + 1 + 1 = 3 '
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let total
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+': 
                total = prev + current
                break
            case '-': 
                total = prev - current
                break
            case '*': 
                total = prev * current
                break
            case '÷': 
                total = prev / current
                break
            default:
                return
        }
        
        this.currentOperand = total 
        this.previousOperand = ''
        this.operation = undefined        
    }

    updateDisplay(){
        this.currentOpp.innerHTML = this.currentOperand

        if(this.operation != null){
            this.prevOpp.innerHTML = ` ${this.previousOperand} ${this.operation} `
        }else{
            this.prevOpp.innerHTML = ''
        }  
    }
}

//declare dom elements i.e buttons 

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearBtn = document.querySelector('[data-allClear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const prevOpp = document.querySelector('[data-previous]')
const currentOpp = document.querySelector('[data-current]')

const calculator = new Calculator(prevOpp, currentOpp)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', ()=> {
    calculator.compute()
    calculator.updateDisplay()
})


allClearBtn.addEventListener('click', ()=> {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', ()=> {
    calculator.delete()
    calculator.updateDisplay()
})

