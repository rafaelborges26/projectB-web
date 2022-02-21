
const showMenu = document.getElementById('iconMenu')
const hideMenu = document.getElementById('closeMenu')
const addNewTransactionButton = document.getElementById('btnAddTransaction')

const inputName = document.getElementById('nameMerchadise')
const inputValue = document.getElementById('valueTransaction')


import '../styles/style.css'
import '../assets/close.svg'
import '../assets/menu.svg'
import '../assets/logo.svg'
import '../assets/error.svg'

function handleShowMenu() {
    document.getElementById('menu').style.display = 'block'
    
}

function handleHideMenu() {
    document.getElementById('menu').style.display = 'none'    
}

function validationFields() {

    document.querySelector('.errorValue').style = 'display: none'
    document.getElementById('valueTransaction').style.borderColor = '#979797'

    if ( document.getElementById('nameMerchadise').value == '') 
    {
        document.getElementById('nameMerchadise').style.borderColor = '#ff0000'
        document.querySelector('.errorName').style = 'display: flex'
        document.querySelector('.errorNameText').innerHTML = 'O campo é obrigatório'
        return;
    } else if(document.getElementById('valueTransaction').value == '') {
        document.getElementById('valueTransaction').style.borderColor = '#ff0000'
        document.querySelector('.errorValue').style = 'display: flex'
        document.querySelector('.errorValueText').innerHTML = 'O campo é obrigatório'
        return;
    }

    addTransaction()
}

function validationValueField() {
    console.log("testee")
    console.log(isNaN(document.getElementById('valueTransaction').value))
    console.log(document.getElementById('valueTransaction').value)
    if(isNaN(document.getElementById('valueTransaction').value)) {
        document.getElementById('valueTransaction').style.borderColor = '#ff0000'
        document.querySelector('.errorValue').style = 'display: flex'
        document.querySelector('.errorValueText').innerHTML = 'O campo é numérico'
        document.getElementById('valueTransaction').value = ''
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

function addTransaction() {

    console.log("adicionado")
    fetch('https://airtable.com/shrgRkjwA8uitAY3s')
    .then(response => response.json()) //converter resposta pra json
    .then(data => console.log(data))
}


showMenu.addEventListener('click', handleShowMenu );
hideMenu.addEventListener('click', handleHideMenu );

addNewTransactionButton.addEventListener('click', validationFields);

inputValue.addEventListener('blur', setMaskValue )
inputValue.addEventListener('click', onSelectValue )
inputValue.addEventListener('keyup', validationValueField )

inputName.addEventListener('click', onSelectName )


