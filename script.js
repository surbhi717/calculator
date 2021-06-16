const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')


const calculate = (n1, operator, n2) => {
    //perform calculation and return calculated value 

    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)

    if (operator === 'add') {
        return firstNum + secondNum
    }
    if (operator === 'subtract') {
        return firstNum - secondNum
    }
    if (operator === 'multiply') {
        return firstNum * secondNum
    }
    if (operator === 'divide') {
        return firstNum / secondNum
    }
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayNum = display.textContent
        const previouskeyType = calculator.dataset.previouskeyType

        //remove .is-depressed class from all keys

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {

            if (displayNum === '0' || previouskeyType === 'operator' || previouskeyType === 'calculate') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayNum + keyContent
            }
            calculator.dataset.previouskey = 'number'
        }

        if (action === 'decimal') {
            if (!displayNum.includes('.')) {
                display.textContent = displayNum + '.'
            } else if (previouskeyType === 'operator' || previouskeyType === 'calculate') {
                display.textContent = '0.'
            }

            calculator.dataset.previouskey = 'decimal'
        }

        if (action === 'clear') {
            if (key.textContent == 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previouskeyType = ''
            } else {
                key.textContent = 'AC'
            }
            display.textContent = '0'
            calculator.dataset.previouskeyType = 'clear'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum
            if (firstValue) {
                if (previouskeyType === 'calculate') {
                    firstValue = displayNum
                    secondValue = calculator.dataset.modValue
                }
                calculator.dataset.modValue = secondValue
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.previouskeyType = 'calculate'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {

            //key.classList.add('is-depressed')
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum

            if (firstValue && operator && previouskeyType === 'operator') {

                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            }
            else {
                calculator.dataset.firstValue = displayNum
            }

            //Add custom attribute
            key.classList.add('is-depressed')
            calculator.dataset.previouskeyType = 'operator'
            calculator.dataset.operator = action
        }
    }
})