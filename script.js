const transactionUL = document.querySelector('#transactions')
const dummyTransctions = [
    { id: 1, name: 'Nolo de Brigadeiro', amount: -20 },
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

addTransitionIntoDOM(dummyTransctions[0])