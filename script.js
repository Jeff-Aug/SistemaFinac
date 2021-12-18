const transactionUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')


const dummyTransctions = [
    { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
    { id: 2, name: 'Salario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violao', amount: 150 },
    { id: 5, name: 'Doce de manga', amount: -5 }

]
const addTransitionIntoDOM = transaction => {

    const operator = transaction.amount < 0 ? '-': "+"
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)

    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>

    `
    transactionUL.append(li)

}

const updateBalanceValues = () =>{
    const transationAmounts = dummyTransctions.map(transaction => transaction.amount)
    const total = transationAmounts.reduce((accumulator, transaction)=> accumulator + transaction,0).toFixed(2)
    const income = transationAmounts
        .filter(value => value > 0)
        .reduce((accumulator,value)=> accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transationAmounts
        .filter(value => value < 0 )
        .reduce((accumulator,value) => accumulator + value)
        .toFixed(2) 
        )
    console.log(expense)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () =>{
    dummyTransctions.forEach(addTransitionIntoDOM)

}

init()
updateBalanceValues()






