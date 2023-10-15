class MyCalculator{
    constructor(previousOperationText ,currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.clear()
    }

    clear(){
        this.currentOperation  = ''
        this.previousOperation = ''
        this.operation = undefined
    }

    appendNumber(number){
        if(number === '.' && this.currentOperation.includes('.')) return
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    updateDisplay(){
        this.currentOperationText.innerText = this.getDisplayNumber(this.currentOperation)
        if(this.operation != null){
            this.previousOperationText.innerText = `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        }else{
            this.previousOperationText.innerText = ''
        } 
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]       
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    chooseOperation(operation){
        if(this.currentOperation === '') return
        if(this.previousOperation !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
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
        this.currentOperation = computation
        this.operation = undefined
        this.previousOperation = ''
    }

    delete(){
            this.currentOperation = this.currentOperation.toString().slice(0, -1)     
    }
}

const numberButtons = document.querySelectorAll('[numbers]')
const operationButtons = document.querySelectorAll('[operations]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperationText = document.querySelector('[previous-operation]')
const currentOperationText = document.querySelector('[current-operation]')

const myCalculator = new MyCalculator(previousOperationText, currentOperationText)


numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        myCalculator.appendNumber(button.innerText)
        myCalculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.chooseOperation(button.innerText)
        myCalculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    myCalculator.compute()
    myCalculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    myCalculator.clear()
    myCalculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    myCalculator.delete()
    myCalculator.updateDisplay()
})