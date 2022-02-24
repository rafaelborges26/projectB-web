
const showMenu = document.getElementById('iconMenu')
const hideMenu = document.getElementById('closeMenu')
const addNewTransactionButton = document.getElementById('btnAddTransaction')
const addNewTransactionButtonDesktop = document.getElementById('btnAddTransactionDesktop')
const addNewTransactionButtonMobile = document.getElementById('btnAddTransactionMobile')

const deleteTransactionsButtonMobile = document.getElementById('buttonClearMobile')
const deleteTransactionsButtonDesktop = document.getElementById('buttonClearDesktop')

const inputName = document.getElementById('nameMerchadise')
const inputValue = document.getElementById('valueTransaction')

require('../styles/style.css')
require('../assets/close.svg')
require('../assets/menu.svg')
require('../assets/logo.svg')
require('../assets/error.svg')

import { 
    handleHideMenu, 
    handleShowMenu, 
    getApiListTransaction, 
    validationFields, 
    onSelectValue, 
    onSelectName, 
    deleteTable 
} from './functions.js'

getApiListTransaction()

showMenu.addEventListener('click', handleShowMenu );
hideMenu.addEventListener('click', handleHideMenu );

addNewTransactionButton.addEventListener('click', validationFields);
addNewTransactionButtonDesktop.addEventListener('click', validationFields);

addNewTransactionButtonMobile.addEventListener('click', handleHideMenu);
addNewTransactionButtonMobile.addEventListener('click', validationFields);

inputValue.addEventListener('click', onSelectValue )

inputName.addEventListener('click', onSelectName )

deleteTransactionsButtonMobile.addEventListener('click', deleteTable)
deleteTransactionsButtonDesktop.addEventListener('click', deleteTable)