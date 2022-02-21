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
  !*** ./app/src/js/app.js + 4 modules ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./app/src/styles/style.css\n// extracted by mini-css-extract-plugin\n\n;// CONCATENATED MODULE: ./app/src/assets/close.svg\n/* harmony default export */ const assets_close = (\"/src/assets/close.svg\");\n;// CONCATENATED MODULE: ./app/src/assets/menu.svg\n/* harmony default export */ const menu = (\"/src/assets/menu.svg\");\n;// CONCATENATED MODULE: ./app/src/assets/logo.svg\n/* harmony default export */ const logo = (\"/src/assets/logo.svg\");\n;// CONCATENATED MODULE: ./app/src/js/app.js\n\nconst showMenu = document.getElementById('iconMenu')\nconst hideMenu = document.getElementById('closeMenu')\n\n\n;\n\n\n\n\nfunction handleShowMenu() {\n    document.getElementById('menu').style.display = 'block'\n    \n}\n\nfunction handleHideMenu() {\n    document.getElementById('menu').style.display = 'none'    \n}\n\n\nfunction add() {\n    alert(\"clicou\")\n}\n\n\n\nshowMenu.addEventListener('click', handleShowMenu );\nhideMenu.addEventListener('click', handleHideMenu );\n\n\n\n//# sourceURL=webpack://newtab-imc/./app/src/js/app.js_+_4_modules?");

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