const transactionUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransaction = JSON.parse(localStorage
    .getItem('transactions'))

let transaction = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

// let transaction = [
//     { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
//     { id: 2, name: 'Salario', amount: 300 },
//     { id: 3, name: 'Torta de frango', amount: -10 },
//     { id: 4, name: 'Violao', amount: 150 },
//     { id: 5, name: 'Doce de manga', amount: -5 }

// ]
const addTransactionIntoDOM = ({amount, name, id}) => {

    const operator = amount < 0 ? '-' : "+"
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)

    li.innerHTML = `
        ${name} <span>${operator} R$ ${amountWithoutOperator}</span>\
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>

    `
    transactionUL.append(li)

}
const getExpense = transactionAmounts => {
    Math.abs(transactionAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value)
        .toFixed(2))
}

const getIncome = transactionAmounts =>{
    transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

}

const getTotal = transactionAmounts =>{
    transactionAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
}

const updateBalanceValues = () => {
    const transactionAmounts = transactions.map(({amount}) => amount)
    const total = getTotal(transactionAmounts)
    const income = getIncome (transactionAmounts)
    const expense = getExpense(transactionAmounts)

    console.log(expense)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUL.innerHTML = ''
    console.log(transactions)
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
init()
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmout) => {
    transactions.push(
        {
            id: generateID(),
            name: transactionName,
            //amount: +transactionAmout
            amount: Number(transactionAmout)
        }
    )
}

const cleaInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}
const handleFormSubmit = event => {
    event.preventDefault()// impedido que o form seja envia,

    // pega os valores vindo dos form
    const transactionName = inputTransactionName.value.trim()
    const transactionAmout = inputTransactionAmount.value.trim()
    // trim() -> responsavel por remover os espacos em branco
    const isSomeInputEmpty = transactionAmout === '' || transactionName === ''

    if (isSomeInputEmpty) {
        alert("Preencha os dois campos")
        return
    }

    addToTransactionsArray(transactionName, transactionAmout)

    init()
    updateLocalStorage()
    cleaInputs()

}

form.addEventListener('submit', handleFormSubmit);



