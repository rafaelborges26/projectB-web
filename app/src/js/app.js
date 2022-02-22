
const showMenu = document.getElementById('iconMenu')
const hideMenu = document.getElementById('closeMenu')
const addNewTransactionButton = document.getElementById('btnAddTransaction')
const deleteTransactionsButton = document.getElementById('buttonClearMobile')

const inputName = document.getElementById('nameMerchadise')
const inputValue = document.getElementById('valueTransaction')

const tbodyTable = document.getElementById('transactionTable')
const tdTotalValue = document.getElementById('totalValue')

import '../styles/style.css'
import '../assets/close.svg'
import '../assets/menu.svg'
import '../assets/logo.svg'
import '../assets/error.svg'

let transactions = null
let transactionsFields = []

function handleShowMenu() {
    document.getElementById('menu').style.display = 'block'
    
}

function handleHideMenu() {
    document.getElementById('menu').style.display = 'none'    
}

function validationFields() {

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


    const valueNumber = valueTransaction.replace('.', '')
    const valueNumberFormatedNumber = Number(valueNumber.replace(',', '.'))

    if(transactions) {
        updateTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)
    } else {
        insertTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)
    }
}

function validationValueField() {
    console.log("testee")

    if(document.getElementById('valueTransaction').value.includes(',')){
        return;
    }
    
    if(isNaN(document.getElementById('valueTransaction').value)) {
        document.getElementById('valueTransaction').style.borderColor = '#ff0000'
        document.querySelector('.errorValue').style = 'display: flex'
        document.querySelector('.errorValueText').innerHTML = 'O campo é numérico'
        document.getElementById('valueTransaction').value = ''
    } else {
        document.querySelector('.errorValue').style = 'display: none'
        document.getElementById('valueTransaction').style.borderColor = '#979797'
    }
}

function setMaskValue() {

    const valueInput = String(document.getElementById('valueTransaction').value)

    if(valueInput.includes(',') || !valueInput) {
        return;
    }

    const valueInputNumber = Number(valueInput)

    const valueFormatted = valueInputNumber.toLocaleString('pt-br', {minimumFractionDigits: 2})

    document.getElementById('valueTransaction').value = valueFormatted
}

function onSelectName() {
    document.querySelector('.errorName').style = 'display: none'
    document.getElementById('nameMerchadise').style.borderColor = '#979797'
}

function onSelectValue() {
    document.querySelector('.errorValue').style = 'display: none'
    document.getElementById('valueTransaction').style.borderColor = '#979797'
}

async function insertTable(name, value, type) {

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

async function deleteTable() {

    await fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico",
    {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                records: [transactions.id]
            }
        )
    }
    )
    .then(response => {
        return response.json()
    })
    .then(json => console.log(json))

    //location.reload();
}

async function updateTable(name, value, type) {

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

async function getApiListTransaction() {
    
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

async function setTableTransactions(allTransactions) {

    let totalTransaction = 0

    await allTransactions.forEach(transaction => {

        if(transaction.type === '-') {
            totalTransaction -= transaction.value
        } else if(transaction.type === '+') {
            totalTransaction += transaction.value
        }

        const elementTr = document.createElement('tr')

        const elementTdName = document.createElement('td')
        const elementTdValue = document.createElement('td')
        
        elementTr.append(elementTdName)
        elementTr.append(elementTdValue)

        elementTdName.innerHTML = transaction.name
        elementTdValue.innerHTML = transaction.type + " " + transaction.value.toLocaleString('pt-br', {minimumFractionDigits: 2})

        tbodyTable.prepend(elementTr)

    });


    tdTotalValue.prepend(totalTransaction.toLocaleString('pt-br', {minimumFractionDigits: 2}))    

}

getApiListTransaction()


showMenu.addEventListener('click', handleShowMenu );
hideMenu.addEventListener('click', handleHideMenu );

addNewTransactionButton.addEventListener('click', validationFields);

inputValue.addEventListener('blur', setMaskValue )
inputValue.addEventListener('click', onSelectValue )
inputValue.addEventListener('keyup', validationValueField )

inputName.addEventListener('click', onSelectName )

deleteTransactionsButton.addEventListener('click', deleteTable)

