let transactions = null
let transactionsFields = []

const tbodyTable = document.getElementById('transactionTable')
const trTotalTable = document.getElementById('totalTable')
const tdTotalValue = document.getElementById('totalValue')
const textTotalValue = document.getElementById('totalValueText')

export function handleShowMenu() {
    document.getElementById('menu').style.display = 'block'
    
}

export function handleHideMenu() {
    document.getElementById('menu').style.display = 'none'    
}

export function validationFields() {

    document.querySelector('.errorValue').style = 'display: none'
    document.getElementById('valueTransaction').style.borderColor = '#979797'

    const nameTransaction = document.getElementById('nameMerchadise').value
    const valueTransaction = document.getElementById('valueTransaction').value
    const selectTransaction = document.getElementById('selectTransaction').value


    if ( nameTransaction == '') 
    {
        document.getElementById('nameMerchadise').style.borderColor = '#ff0000'
        document.querySelector('.errorName').style = 'display: flex'
        document.querySelector('.errorNameText').innerHTML = 'O campo é obrigatório'
        return;
    } else if(valueTransaction == '') {
        document.getElementById('valueTransaction').style.borderColor = '#ff0000'
        document.querySelector('.errorValue').style = 'display: flex'
        document.querySelector('.errorValueText').innerHTML = 'O campo é obrigatório'
        return;
    }

    document.querySelector('.nameTransaction').querySelector('input').value = ''
    document.querySelector('.valueTransaction').querySelector('input').value = ''

    let valueNumberFormatedNumber = valueTransaction

    valueNumberFormatedNumber = String(valueNumberFormatedNumber.slice(2))
    
    valueNumberFormatedNumber = valueNumberFormatedNumber.replace(/[#.]/g, '')

    console.log(valueNumberFormatedNumber,'sem ponto')

    valueNumberFormatedNumber = valueNumberFormatedNumber.replace(',', '.')

    console.log(valueNumberFormatedNumber)

    if(transactions) {
        updateTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)
    } else {
        insertTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)
    }
}

export function onSelectName() {
    document.querySelector('.errorName').style = 'display: none'
    document.getElementById('nameMerchadise').style.borderColor = '#979797'
}

export function onSelectValue() {
    document.querySelector('.errorValue').style = 'display: none'
    document.getElementById('valueTransaction').style.borderColor = '#979797'
}

export async function insertTable(name, value, type) {

    await fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico",
    {
        method: 'POST',
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                records: [
                    {
                        fields: {
                            Responsavel: '9817',
                            Json: JSON.stringify([
                                { 
                                    type,
                                    name,
                                    value
                                }
                            ])
                        }
                    }
                ]
            }
        )
    }
    )
    .then(response => {
        return response.json()
    })
    .then(json => console.log(json))

    await getApiListTransaction();

    showHideEmptyTable(false)

}

export async function deleteTable() {

    const confirmed = confirm('Deseja realmente excluir todas as transações?');

    if(confirmed) {

    await fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico",
    {
        method: 'PATCH',
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                records: [
                    {
                        id: transactions.id,
                        fields: {
                            Responsavel: '9817',
                            Json: ''
                        }
                    }
                ]
            }
        )
    }
    )
    .then(response => {
        return response.json()
    })
    .then(json => console.log(json))

    transactionsFields = []

    getApiListTransaction();
    }
}

export async function updateTable(name, value, type) {

    transactionsFields.push({type, name, value})

    await fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico",
    {
        method: 'PATCH',
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                records: [
                    {
                        id: transactions.id,
                        fields: {
                            Responsavel: '9817',
                            Json: JSON.stringify(transactionsFields)
                        }
                    }
                ]
            }
        )
    }
    )
    .then(response => {
        return response.json()
    })
    .then(json => console.log(json))

    getApiListTransaction();

    showHideEmptyTable(false)
}

export async function getApiListTransaction() {
    
    await fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico?filterByFormula="+ encodeURI("({Responsavel} = '9817')"),
 {
     headers: {
         Authorization: "Bearer key2CwkHb0CKumjuM"
     },     
 }
)
.then(response => {
 return response.json()
}).then(json => transactions =  json.records[0])

if(transactions.fields.Json){
    transactionsFields = JSON.parse(transactions.fields.Json)
    setTableTransactions(transactionsFields)
} else {
    showHideEmptyTable(true)
}

}

export async function setTableTransactions(allTransactions) {

    const trAux = trTotalTable;

    tbodyTable.innerHTML = ''

    tbodyTable.append(trAux)

    let totalTransaction = 0

    await allTransactions.forEach((transaction, i) => {

        if(transaction.type === '-') {
            totalTransaction -= Number(transaction.value)
        } else if(transaction.type === '+') {
            totalTransaction += Number(transaction.value)
        }

        const elementTr = document.createElement('tr')

        const elementTdName = document.createElement('td')
        const elementTdValue = document.createElement('td')
        
        elementTr.append(elementTdName)
        elementTr.append(elementTdValue)

        if(i === 0){
            elementTr.style.borderBottomStyle='double'
        }

        elementTdName.innerHTML = transaction.type + "&nbsp;&nbsp;&nbsp;" + transaction.name
        elementTdValue.innerHTML = applyMask(transaction.value)

        tbodyTable.prepend(elementTr)
    });


    console.log(totalTransaction)
    if(totalTransaction < 0){
        textTotalValue.innerHTML = '[PREJUÍZO]'
    } else if(totalTransaction > 0) {
        textTotalValue.innerHTML = '[LUCRO]'
    }else {
        textTotalValue.innerHTML = ''
    }

    tdTotalValue.innerHTML = (totalTransaction.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}))
    tdTotalValue.append(textTotalValue)

}

function applyMask(valorMoeda) {
    const onlyDigits = valorMoeda
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    return maskCurrency(digitsFloat)
  }
  
function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)

}

function showHideEmptyTable(hideTable) {
    if(hideTable === true) {
        document.querySelector('.extractTransaction').querySelector('table').style.display = 'none'
        document.querySelector('.extractTransaction').querySelector('h2').style.display = 'flex'
    } else {
        document.querySelector('.extractTransaction').querySelector('table').style.display = 'table'
        document.querySelector('.extractTransaction').querySelector('h2').style.display = 'none'
    }
    
}