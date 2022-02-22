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
  !*** ./app/src/js/app.js + 5 modules ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./app/src/styles/style.css\n// extracted by mini-css-extract-plugin\n\n;// CONCATENATED MODULE: ./app/src/assets/close.svg\n/* harmony default export */ const assets_close = (\"/src/assets/close.svg\");\n;// CONCATENATED MODULE: ./app/src/assets/menu.svg\n/* harmony default export */ const menu = (\"/src/assets/menu.svg\");\n;// CONCATENATED MODULE: ./app/src/assets/logo.svg\n/* harmony default export */ const logo = (\"/src/assets/logo.svg\");\n;// CONCATENATED MODULE: ./app/src/assets/error.svg\n/* harmony default export */ const error = (\"/src/assets/error.svg\");\n;// CONCATENATED MODULE: ./app/src/js/app.js\n\nconst showMenu = document.getElementById('iconMenu')\nconst hideMenu = document.getElementById('closeMenu')\nconst addNewTransactionButton = document.getElementById('btnAddTransaction')\n\nconst inputName = document.getElementById('nameMerchadise')\nconst inputValue = document.getElementById('valueTransaction')\n\n\n;\n\n\n\n\n\nfunction handleShowMenu() {\n    document.getElementById('menu').style.display = 'block'\n    \n}\n\nfunction handleHideMenu() {\n    document.getElementById('menu').style.display = 'none'    \n}\n\nfunction validationFields() {\n\n    document.querySelector('.errorValue').style = 'display: none'\n    document.getElementById('valueTransaction').style.borderColor = '#979797'\n\n    if ( document.getElementById('nameMerchadise').value == '') \n    {\n        document.getElementById('nameMerchadise').style.borderColor = '#ff0000'\n        document.querySelector('.errorName').style = 'display: flex'\n        document.querySelector('.errorNameText').innerHTML = 'O campo é obrigatório'\n        return;\n    } else if(document.getElementById('valueTransaction').value == '') {\n        document.getElementById('valueTransaction').style.borderColor = '#ff0000'\n        document.querySelector('.errorValue').style = 'display: flex'\n        document.querySelector('.errorValueText').innerHTML = 'O campo é obrigatório'\n        return;\n    }\n\n    addTransaction()\n}\n\nfunction validationValueField() {\n    console.log(\"testee\")\n    console.log(isNaN(document.getElementById('valueTransaction').value))\n    console.log(document.getElementById('valueTransaction').value)\n    if(isNaN(document.getElementById('valueTransaction').value)) {\n        document.getElementById('valueTransaction').style.borderColor = '#ff0000'\n        document.querySelector('.errorValue').style = 'display: flex'\n        document.querySelector('.errorValueText').innerHTML = 'O campo é numérico'\n        document.getElementById('valueTransaction').value = ''\n    }\n}\n\nfunction setMaskValue() {\n\n    const valueInput = String(document.getElementById('valueTransaction').value)\n\n    if(valueInput.includes(',') || !valueInput) {\n        return;\n    }\n\n    const valueInputNumber = Number(valueInput)\n\n    const valueFormatted = valueInputNumber.toLocaleString('pt-br', {minimumFractionDigits: 2})\n\n    document.getElementById('valueTransaction').value = valueFormatted\n}\n\nfunction onSelectName() {\n    document.querySelector('.errorName').style = 'display: none'\n    document.getElementById('nameMerchadise').style.borderColor = '#979797'\n}\n\nfunction onSelectValue() {\n    document.querySelector('.errorValue').style = 'display: none'\n    document.getElementById('valueTransaction').style.borderColor = '#979797'\n}\n\nfunction addTransaction() {\n\n    console.log(\"adicionado\")\n    \n    fetch('https://airtable.com/shrgRkjwA8uitAY3s', {\n        method: \"GET\",\n        mode: \"no-cors\",\n        headers: { key: 'key2CwkHb0CKumjuM'}\n      })\n    .then(response => response.json()) //converter resposta pra json\n    .then(data => console.log(data))\n}\n\n\nshowMenu.addEventListener('click', handleShowMenu );\nhideMenu.addEventListener('click', handleHideMenu );\n\naddNewTransactionButton.addEventListener('click', validationFields);\n\ninputValue.addEventListener('blur', setMaskValue )\ninputValue.addEventListener('click', onSelectValue )\ninputValue.addEventListener('keyup', validationValueField )\n\ninputName.addEventListener('click', onSelectName )\n\n\n\n\n//# sourceURL=webpack://newtab-imc/./app/src/js/app.js_+_5_modules?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/src/js/app.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;