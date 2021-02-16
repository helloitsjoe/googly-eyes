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

/***/ "./src/device-orientation.js":
/*!***********************************!*\
  !*** ./src/device-orientation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ requestPermission)\n/* harmony export */ });\nconst dropZone = document.getElementById('drop-zone-contents');\n\nfunction requestPermission() {\n  if (\n    typeof DeviceOrientationEvent === 'undefined' ||\n    typeof DeviceOrientationEvent.requestPermission !== 'function'\n  ) {\n    dropZone.textContent = 'DeviceOrientation will not work on this device';\n    return;\n  }\n\n  dropZone.textContent = `DeviceOrientation: ${Object.keys(\n    DeviceOrientationEvent\n  )}`;\n  DeviceOrientationEvent.requestPermission()\n    .then(permissionState => {\n      if (permissionState !== 'granted') {\n        dropZone.textContent = 'Permission denied';\n        return;\n      }\n\n      const orientation = document.createElement('pre');\n      const motion = document.createElement('pre');\n      dropZone.appendChild(orientation);\n      dropZone.appendChild(motion);\n\n      window.addEventListener('deviceorientation', e => {\n        orientation.textContent = JSON.stringify(\n          {\n            absolute: Math.round(e.absolute),\n            alpha: Math.round(e.alpha),\n            beta: Math.round(e.beta),\n            gamma: Math.round(e.gamma),\n          },\n          null,\n          2\n        );\n      });\n\n      window.addEventListener('devicemotion', e => {\n        motion.textContent = JSON.stringify(\n          {\n            acceleration: {\n              x: Math.round(e.acceleration.x),\n              y: Math.round(e.acceleration.y),\n              z: Math.round(e.acceleration.z),\n            },\n            accelerationIncludingGravity: {\n              x: Math.round(e.accelerationIncludingGravity.x),\n              y: Math.round(e.accelerationIncludingGravity.y),\n              z: Math.round(e.accelerationIncludingGravity.z),\n            },\n            rotationRate: {\n              alpha: Math.round(e.rotationRate.alpha),\n              beta: Math.round(e.rotationRate.beta),\n              gamma: Math.round(e.rotationRate.gamma),\n            },\n            // 0.016\n            // interval: Math.round(e.interval),\n          },\n          null,\n          2\n        );\n      });\n    })\n    .catch(console.error);\n}\n\n\n//# sourceURL=webpack://googly-eyes/./src/device-orientation.js?");

/***/ }),

/***/ "./src/drag-handlers.js":
/*!******************************!*\
  !*** ./src/drag-handlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDragHandlers\": () => (/* binding */ addDragHandlers)\n/* harmony export */ });\nconst ball = document.querySelector('.ball');\n\nconst downHandler = (e, el) => {\n  e.preventDefault();\n  ball.classList.remove('hidden');\n  ball.style.transform = `translate(${e.x - 15}px, ${e.y - 15}px)`;\n  el.addEventListener('mousemove', moveHandler);\n  // const container = document.getElementById('img-container');\n  // container.appendChild(ball);\n};\n\nconst moveHandler = e => {\n  e.preventDefault();\n  console.log(`e.x:`, e.x);\n  ball.style.transform = `translate(${e.x - 15}px, ${e.y - 15}px)`;\n};\n\nconst upHandler = (e, el) => {\n  e.preventDefault();\n  el.removeEventListener('mousemove', moveHandler);\n};\n\nconst addDragHandlers = el => {\n  el.addEventListener('touchstart', downHandler);\n  el.addEventListener('touchend', upHandler);\n  el.addEventListener('mousedown', e => downHandler(e, el));\n  // el.addEventListener('mousemove', moveHandler);\n  el.addEventListener('mouseup', e => upHandler(e, el));\n};\n\n\n//# sourceURL=webpack://googly-eyes/./src/drag-handlers.js?");

/***/ }),

/***/ "./src/drop-handlers.js":
/*!******************************!*\
  !*** ./src/drop-handlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _device_orientation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device-orientation */ \"./src/device-orientation.js\");\n/* harmony import */ var _drag_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drag-handlers */ \"./src/drag-handlers.js\");\n\n\n\nconst noop = e => {\n  e.preventDefault();\n  e.stopPropagation();\n  console.log(`Noop`, e.x);\n};\n\nconst dropHandler = e => {\n  e.preventDefault();\n  (0,_device_orientation__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n  console.log(e.dataTransfer.files[0]);\n  const reader = new FileReader();\n  const [file] = e.dataTransfer.files;\n  reader.readAsDataURL(file);\n  reader.onloadend = () => {\n    const img = document.getElementById('main-img');\n    const dropZone = document.getElementById('drop-zone');\n    img.src = reader.result;\n    img.style.display = 'flex';\n    dropZone.style.display = 'none';\n\n    // Allow dragging after image loads\n    window.removeEventListener('drop', dropHandler);\n    window.removeEventListener('dragstart', noop);\n    window.removeEventListener('dragover', noop);\n    window.removeEventListener('dragend', noop);\n\n    // addDragHandlers(document.getElementById('container'));\n    (0,_drag_handlers__WEBPACK_IMPORTED_MODULE_1__.addDragHandlers)(window);\n  };\n};\n\nwindow.addEventListener('drop', dropHandler);\nwindow.addEventListener('dragstart', noop);\nwindow.addEventListener('dragover', noop);\nwindow.addEventListener('dragend', noop);\n\n\n//# sourceURL=webpack://googly-eyes/./src/drop-handlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _device_orientation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device-orientation */ \"./src/device-orientation.js\");\n/* harmony import */ var _drop_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop-handlers */ \"./src/drop-handlers.js\");\n\n\n\n// TODO: Get photo from phone\n// const media = document.getElementById('media');\n\n// Does this cache permission after the first time?\n(0,_device_orientation__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n// const getUserMedia = navigator;\n// document.getElementById('media').textContent = `getUserMedia: ${getUserMedia}`;\n// if (getUserMedia) {\n//   console.log(`getUserMedia:`, getUserMedia);\n//   getUserMedia({ photo: true }).then(stream => {\n//     console.log(stream);\n//     document.getElementById('media').textContent = stream;\n//   });\n// } else {\n//   console.log('getUserMedia is not defined');\n// }\n\n\n//# sourceURL=webpack://googly-eyes/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;