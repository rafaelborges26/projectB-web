/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/src/js/app.js":
/*!***************************************!*\
  !*** ./app/src/js/app.js + 1 modules ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./app/src/js/functions.js\nlet transactions = null\nlet transactionsFields = []\n\nconst tbodyTable = document.getElementById('transactionTable')\nconst tdTotalValue = document.getElementById('totalValue')\n\nfunction handleShowMenu() {\n    document.getElementById('menu').style.display = 'block'\n    \n}\n\nfunction handleHideMenu() {\n    document.getElementById('menu').style.display = 'none'    \n}\n\nfunction validationFields() {\n\n    document.querySelector('.errorValue').style = 'display: none'\n    document.getElementById('valueTransaction').style.borderColor = '#979797'\n\n    const nameTransaction = document.getElementById('nameMerchadise').value\n    const valueTransaction = document.getElementById('valueTransaction').value\n    const selectTransaction = document.getElementById('selectTransaction').value\n\n    if ( nameTransaction == '') \n    {\n        document.getElementById('nameMerchadise').style.borderColor = '#ff0000'\n        document.querySelector('.errorName').style = 'display: flex'\n        document.querySelector('.errorNameText').innerHTML = 'O campo é obrigatório'\n        return;\n    } else if(valueTransaction == '') {\n        document.getElementById('valueTransaction').style.borderColor = '#ff0000'\n        document.querySelector('.errorValue').style = 'display: flex'\n        document.querySelector('.errorValueText').innerHTML = 'O campo é obrigatório'\n        return;\n    }\n\n\n    const valueNumber = valueTransaction.replace('.', '')\n    const valueNumberFormatedNumber = Number(valueNumber.replace(',', '.'))\n\n    if(transactions) {\n        updateTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)\n    } else {\n        insertTable(nameTransaction, valueNumberFormatedNumber, selectTransaction)\n    }\n}\n\nfunction validationValueField() {\n    console.log(\"testee\")\n\n    if(document.getElementById('valueTransaction').value.includes(',')){\n        return;\n    }\n    \n    if(isNaN(document.getElementById('valueTransaction').value)) {\n        document.getElementById('valueTransaction').style.borderColor = '#ff0000'\n        document.querySelector('.errorValue').style = 'display: flex'\n        document.querySelector('.errorValueText').innerHTML = 'O campo é numérico'\n        document.getElementById('valueTransaction').value = ''\n    } else {\n        document.querySelector('.errorValue').style = 'display: none'\n        document.getElementById('valueTransaction').style.borderColor = '#979797'\n    }\n}\n\nfunction setMaskValue() {\n\n    const valueInput = String(document.getElementById('valueTransaction').value)\n\n    if(valueInput.includes(',') || !valueInput) {\n        return;\n    }\n\n    const valueInputNumber = Number(valueInput)\n\n    const valueFormatted = valueInputNumber.toLocaleString('pt-br', {minimumFractionDigits: 2})\n\n    document.getElementById('valueTransaction').value = valueFormatted\n}\n\nfunction onSelectName() {\n    document.querySelector('.errorName').style = 'display: none'\n    document.getElementById('nameMerchadise').style.borderColor = '#979797'\n}\n\nfunction onSelectValue() {\n    document.querySelector('.errorValue').style = 'display: none'\n    document.getElementById('valueTransaction').style.borderColor = '#979797'\n}\n\nasync function insertTable(name, value, type) {\n\n    await fetch(\"https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico\",\n    {\n        method: 'POST',\n        headers: {\n            Authorization: \"Bearer key2CwkHb0CKumjuM\",\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(\n            {\n                records: [\n                    {\n                        fields: {\n                            Responsavel: '9817',\n                            Json: JSON.stringify([\n                                { \n                                    type,\n                                    name,\n                                    value\n                                }\n                            ])\n                        }\n                    }\n                ]\n            }\n        )\n    }\n    )\n    .then(response => {\n        return response.json()\n    })\n    .then(json => console.log(json))\n\n    location.reload();\n}\n\nasync function deleteTable() {\n\n    await fetch(\"https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico\",\n    {\n        method: 'PATCH',\n        headers: {\n            Authorization: \"Bearer key2CwkHb0CKumjuM\",\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(\n            {\n                records: [\n                    {\n                        id: transactions.id,\n                        fields: {\n                            Responsavel: '9817',\n                            Json: ''\n                        }\n                    }\n                ]\n            }\n        )\n    }\n    )\n    .then(response => {\n        return response.json()\n    })\n    .then(json => console.log(json))\n\n    location.reload();\n\n}\n\nasync function updateTable(name, value, type) {\n\n    transactionsFields.push({type, name, value})\n\n    await fetch(\"https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico\",\n    {\n        method: 'PATCH',\n        headers: {\n            Authorization: \"Bearer key2CwkHb0CKumjuM\",\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(\n            {\n                records: [\n                    {\n                        id: transactions.id,\n                        fields: {\n                            Responsavel: '9817',\n                            Json: JSON.stringify(transactionsFields)\n                        }\n                    }\n                ]\n            }\n        )\n    }\n    )\n    .then(response => {\n        return response.json()\n    })\n    .then(json => console.log(json))\n\n    location.reload();\n}\n\nasync function getApiListTransaction() {\n    \n    await fetch(\"https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico?filterByFormula=\"+ encodeURI(\"({Responsavel} = '9817')\"),\n {\n     headers: {\n         Authorization: \"Bearer key2CwkHb0CKumjuM\"\n     },     \n }\n)\n.then(response => {\n return response.json()\n}).then(json => transactions =  json.records[0])\n\ntransactionsFields = JSON.parse(transactions.fields.Json)\n\n\nsetTableTransactions(transactionsFields)\n\n\n}\n\nasync function setTableTransactions(allTransactions) {\n\n    let totalTransaction = 0\n\n    await allTransactions.forEach(transaction => {\n\n        if(transaction.type === '-') {\n            totalTransaction -= transaction.value\n        } else if(transaction.type === '+') {\n            totalTransaction += transaction.value\n        }\n\n        const elementTr = document.createElement('tr')\n\n        const elementTdName = document.createElement('td')\n        const elementTdValue = document.createElement('td')\n        \n        elementTr.append(elementTdName)\n        elementTr.append(elementTdValue)\n\n        elementTdName.innerHTML = transaction.name\n        elementTdValue.innerHTML = transaction.type + \" \" + transaction.value.toLocaleString('pt-br', {minimumFractionDigits: 2})\n\n        tbodyTable.prepend(elementTr)\n\n    });\n\n\n    tdTotalValue.prepend(totalTransaction.toLocaleString('pt-br', {minimumFractionDigits: 2}))    \n\n}\n\n;// CONCATENATED MODULE: ./app/src/js/app.js\n\nconst showMenu = document.getElementById('iconMenu')\nconst hideMenu = document.getElementById('closeMenu')\nconst addNewTransactionButton = document.getElementById('btnAddTransaction')\nconst deleteTransactionsButton = document.getElementById('buttonClearMobile')\n\nconst inputName = document.getElementById('nameMerchadise')\nconst inputValue = document.getElementById('valueTransaction')\n\n__webpack_require__(/*! ../styles/style.css */ \"./app/src/styles/style.css\")\n__webpack_require__(/*! ../assets/close.svg */ \"./app/src/assets/close.svg\")\n__webpack_require__(/*! ../assets/menu.svg */ \"./app/src/assets/menu.svg\")\n__webpack_require__(/*! ../assets/logo.svg */ \"./app/src/assets/logo.svg\")\n__webpack_require__(/*! ../assets/error.svg */ \"./app/src/assets/error.svg\")\n\n;\n\n\n\ngetApiListTransaction()\n\n\nshowMenu.addEventListener('click', handleShowMenu );\nhideMenu.addEventListener('click', handleHideMenu );\n\naddNewTransactionButton.addEventListener('click', validationFields);\n\ninputValue.addEventListener('blur', setMaskValue )\ninputValue.addEventListener('click', onSelectValue )\ninputValue.addEventListener('keyup', validationValueField )\n\ninputName.addEventListener('click', onSelectName )\n\ndeleteTransactionsButton.addEventListener('click', deleteTable)\n\n//# sourceURL=webpack://newtab-imc/./app/src/js/app.js_+_1_modules?");

/***/ }),

/***/ "./app/src/assets/close.svg":
/*!**********************************!*\
  !*** ./app/src/assets/close.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/src/assets/close.svg\");\n\n//# sourceURL=webpack://newtab-imc/./app/src/assets/close.svg?");

/***/ }),

/***/ "./app/src/assets/error.svg":
/*!**********************************!*\
  !*** ./app/src/assets/error.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/src/assets/error.svg\");\n\n//# sourceURL=webpack://newtab-imc/./app/src/assets/error.svg?");

/***/ }),

/***/ "./app/src/assets/logo.svg":
/*!*********************************!*\
  !*** ./app/src/assets/logo.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/src/assets/logo.svg\");\n\n//# sourceURL=webpack://newtab-imc/./app/src/assets/logo.svg?");

/***/ }),

/***/ "./app/src/assets/menu.svg":
/*!*********************************!*\
  !*** ./app/src/assets/menu.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"/src/assets/menu.svg\");\n\n//# sourceURL=webpack://newtab-imc/./app/src/assets/menu.svg?");

/***/ }),

/***/ "./app/src/styles/style.css":
/*!**********************************!*\
  !*** ./app/src/styles/style.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://newtab-imc/./app/src/styles/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/src/js/app.js");
/******/ 	
/******/ })()
;