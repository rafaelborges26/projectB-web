let transactions = null
let transactionsFields = []

const tbodyTable = document.getElementById('transactionTable')
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

    location.reload();
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

    location.reload();
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

    location.reload();
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

transactionsFields = JSON.parse(transactions.fields.Json)


setTableTransactions(transactionsFields)


}

export async function setTableTransactions(allTransactions) {

    let totalTransaction = 0

    

    await allTransactions.forEach((transaction, i) => {

console.log(i)

console.log(allTransactions.length - 1)


        if(transaction.type === '-') {
            totalTransaction -= Number(transaction.value)
        } else if(transaction.type === '+') {
            totalTransaction += Number(transaction.value)
        }

        //tests

        const elementTr = document.createElement('tr')

        const elementTdName = document.createElement('td')
        const elementTdValue = document.createElement('td')
        
        elementTr.append(elementTdName)
        elementTr.append(elementTdValue)

        if( 0 === i){
            elementTr.style.borderBottomStyle='double'
        }

        elementTdName.innerHTML = transaction.type + "&nbsp;&nbsp;&nbsp;" + transaction.name
        elementTdValue.innerHTML = mascaraMoeda(transaction.value)

        tbodyTable.prepend(elementTr)

    });


    if(totalTransaction < 0){
        textTotalValue.innerHTML = '[PREJUÍZO]'
    } else if(totalTransaction > 0) {
        textTotalValue.innerHTML = '[LUCRO]'
    }else {
        textTotalValue.innerHTML = ''
    }

    tdTotalValue.prepend(totalTransaction.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}))    

}

function mascaraMoeda(valorMoeda) {
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