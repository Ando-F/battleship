/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "changeColorOnHover": () => (/* binding */ changeColorOnHover),
/* harmony export */   "changeAxis": () => (/* binding */ changeAxis),
/* harmony export */   "colorChanger": () => (/* binding */ colorChanger),
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates)
/* harmony export */ });
var displayBoard = function displayBoard(board, container, uniqueClass) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var oneCell = document.createElement('div');
      oneCell.classList.add('cell');
      oneCell.classList.add(uniqueClass);
      oneCell.innerHTML = board[i][j];
      oneCell.id = i * 10 + j;
      container.appendChild(oneCell);
    }
  }
}; //change cell's color on mouse hover


var changeColorOnHover = function changeColorOnHover(element, listener, color) {
  element.addEventListener(listener, function () {
    element.style.background = color;
  });
};

var gameBoardCells = document.querySelectorAll('.my-board');

var colorChanger = function colorChanger() {
  gameBoardCells.forEach(function (cell) {
    getCoordinates(cell);
    changeColorOnHover(cell, 'mouseover', 'yellow');
    changeColorOnHover(cell, 'mouseout', 'white');
  });
};

var changeAxis = function changeAxis() {
  var clickCount = 1;
  var axisContainer = document.getElementById('axis');
  var axisValue = document.getElementById('axis-value');
  axisContainer.addEventListener('click', function () {
    if (clickCount % 2 === 0) {
      axisValue.innerHTML = 'x';
    } else if (clickCount % 2 !== 0) {
      axisValue.innerHTML = 'y';
    }

    clickCount += 1;
  });
};

var getCoordinates = function getCoordinates(element) {
  element.addEventListener('click', function (e) {
    console.log(e.target.id);
  });
};

var getCoordinatesOnClick = function getCoordinatesOnClick() {
  var x;
  var y;
  gameBoardCells.forEach(function (item) {
    item.addEventListener('click', function (e) {
      console.log(e.target.id);
    });
  });
};



/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
var Ship = function Ship(length, axis, coordinates) {
  var injuredDecks = {
    value: 0
  };
  var coordinatesOnBoard = {};
  coordinatesOnBoard[0] = coordinates;

  if (axis.value === 'x' && length > 1) {
    for (var i = 1; i <= length; i++) {
      coordinatesOnBoard[i] = {
        x: coordinates.x + i,
        y: coordinates.y
      };
    }
  } else if (axis.value === 'y' && length > 1) {
    for (var _i = 1; _i <= length; _i++) {
      coordinatesOnBoard[_i] = {
        x: coordinates.x,
        y: coordinates.y + _i
      };
    }
  }

  var sunkStatus = {
    value: false
  };

  var hit = function hit() {
    injuredDecks.value += 1;
    isSunk();
  };

  var isSunk = function isSunk() {
    if (injuredDecks.value === length) {
      sunkStatus.value = true;
    }
  };

  return {
    length: length,
    injuredDecks: injuredDecks,
    coordinatesOnBoard: coordinatesOnBoard,
    sunkStatus: sunkStatus,
    hit: hit,
    isSunk: isSunk
  };
};

var Gameboard = function Gameboard() {
  //an array to store all the created ships
  var ships = []; //the actual board

  var board = [];

  for (var i = 0; i < 10; i++) {
    board[i] = [];

    for (var j = 0; j < 10; j++) {
      board[i][j] = 0;
    }
  }

  var placeShip = function placeShip(length, axis, coordinates) {
    ships.push(Ship(length, axis, coordinates));

    if (axis.value === 'y') {
      for (var _i2 = coordinates.y, _j = 0; _j < length; _i2++, _j++) {
        board[coordinates.x][_i2] = 1;
      }
    } else if (axis.value === 'x') {
      for (var _i3 = coordinates.x, _j2 = 0; _j2 < length; _i3++, _j2++) {
        board[_i3][coordinates.y] = 1;
      }
    }
  }; //what numbers on the desk stand for:
  //0 is for free cell, 1 is for taken cell, 2 is for cell with hitted ship,
  //3 is for missed shot


  var recieveAttack = function recieveAttack(coordinates) {
    if (board[coordinates.x][coordinates.y] === 1) {
      board[coordinates.x][coordinates.y] = 2;

      for (var _i4 = 0; _i4 < ships.length; _i4++) {
        for (var _j3 = 0; _j3 < Object.keys(ships[_i4].coordinatesOnBoard).length; _j3++) {
          if (ships[_i4].coordinatesOnBoard[_j3].x === coordinates.x && ships[_i4].coordinatesOnBoard[_j3].y === coordinates.y) {
            ships[_i4].hit();

            break;
          }
        }
      }

      checkGameStatus();
    } else {
      board[coordinates.x][coordinates.y] = 3;
    }
  };

  var gameStatus = {
    status: 'on'
  };

  var checkGameStatus = function checkGameStatus() {
    gameStatus.status = 'off';

    for (var _i5 = 0; _i5 < ships.length; _i5++) {
      if (ships[_i5].sunkStatus.value === false) {
        gameStatus.status = 'on';
        break;
      }
    }
  };

  return {
    board: board,
    ships: ships,
    placeShip: placeShip,
    recieveAttack: recieveAttack,
    gameStatus: gameStatus
  };
};

var Player = function Player() {
  var xArray = Array.from(Array(10).keys());
  var yArray = Array.from(Array(10).keys());

  var calculateCoordinatesForAI = function calculateCoordinatesForAI() {
    var x = xArray[Math.floor(Math.random() * xArray.length)];
    var indexOfX = xArray.indexOf(x);
    xArray.splice(indexOfX, 1);
    var y = yArray[Math.floor(Math.random() * yArray.length)];
    var indexOfY = yArray.indexOf(y);
    yArray.splice(indexOfY, 1);
    return {
      x: x,
      y: y
    };
  };

  return {
    calculateCoordinatesForAI: calculateCoordinatesForAI
  };
};



/***/ }),

/***/ "./src/help-functions.js":
/*!*******************************!*\
  !*** ./src/help-functions.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearBox": () => (/* binding */ clearBox)
/* harmony export */ });
var clearBox = function clearBox(element) {
  element.innerHTML = "";
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: start;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: start;\n}\n\n#my-board-data {\n    display: flex;\n    align-items: center;\n}\n\n/*Axis block editing*/\n#axis {\n    display: flex;\n    justify-content: center;\n\n    width: 100%;\n\n    cursor: pointer;\n}\n\n#axis-name {\n    margin-right: 15px;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,iBAAiB;;IAEjB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,aAAa;IACb,eAAe;IACf,uBAAuB;AAC3B;;AAEA;IACI,SAAS;IACT,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,cAAc;;IAEd,aAAa;IACb,mBAAmB;IACnB,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA,qBAAqB;AACrB;IACI,aAAa;IACb,uBAAuB;;IAEvB,WAAW;;IAEX,eAAe;AACnB;;AAEA;IACI,kBAAkB;AACtB","sourcesContent":[".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: start;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: start;\n}\n\n#my-board-data {\n    display: flex;\n    align-items: center;\n}\n\n/*Axis block editing*/\n#axis {\n    display: flex;\n    justify-content: center;\n\n    width: 100%;\n\n    cursor: pointer;\n}\n\n#axis-name {\n    margin-right: 15px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories */ "./src/factories.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _help_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./help-functions */ "./src/help-functions.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



 //display player's board

var gameBoardContainer = document.getElementById("game-board");
var firstGameBoard = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(firstGameBoard.board, gameBoardContainer, 'my-board'); //display enemy's board

var enemygameBoardContainer = document.getElementById("enemy-game-board");
var enemyBoard = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(enemyBoard.board, enemygameBoardContainer, 'enemy-board');
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.colorChanger)(); //now we can change axis value by clicking

(0,_dom__WEBPACK_IMPORTED_MODULE_1__.changeAxis)();

var updateMyBoard = function updateMyBoard() {
  (0,_help_functions__WEBPACK_IMPORTED_MODULE_2__.clearBox)(gameBoardContainer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(firstGameBoard.board, gameBoardContainer, 'my-board');
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.colorChanger)();
};

var updateEnemyBoard = function updateEnemyBoard() {
  (0,_help_functions__WEBPACK_IMPORTED_MODULE_2__.clearBox)(enemygameBoardContainer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(enemyBoard.board, enemygameBoardContainer, 'enemy-board');
}; //placing ships on my board


var axisValue = document.getElementById('axis-value').innerHTML;
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.getCoordinates)();
firstGameBoard.placeShip(4, {
  value: axisValue
}, {
  x: 1,
  y: 1
});
updateMyBoard();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vYmF0dGxlc2hpcC0xLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9oZWxwLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwbGF5Qm9hcmQgPSAoYm9hcmQsIGNvbnRhaW5lciwgdW5pcXVlQ2xhc3MpID0+IHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG9uZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdG9uZUNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuXHRcdFx0b25lQ2VsbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNsYXNzKTtcblx0XHRcdG9uZUNlbGwuaW5uZXJIVE1MID0gYm9hcmRbaV1bal07XG5cdFx0XHRvbmVDZWxsLmlkID0gKGkgKiAxMCkgKyBqO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG9uZUNlbGwpO1xuXHRcdH1cblx0fVxufTtcblxuLy9jaGFuZ2UgY2VsbCdzIGNvbG9yIG9uIG1vdXNlIGhvdmVyXG5jb25zdCBjaGFuZ2VDb2xvck9uSG92ZXIgPSAoZWxlbWVudCwgbGlzdGVuZXIsIGNvbG9yKSA9PiB7XG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgKCkgPT4ge1xuXHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yO1xuXHR9KTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm15LWJvYXJkJyk7XG5jb25zdCBjb2xvckNoYW5nZXIgPSAoKSA9PiB7XG5cdGdhbWVCb2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRnZXRDb29yZGluYXRlcyhjZWxsKTtcblx0XHRjaGFuZ2VDb2xvck9uSG92ZXIoY2VsbCwgJ21vdXNlb3ZlcicsICd5ZWxsb3cnKTtcblx0XHRjaGFuZ2VDb2xvck9uSG92ZXIoY2VsbCwgJ21vdXNlb3V0JywgJ3doaXRlJyk7XG5cdH0pXG59XG5cbmNvbnN0IGNoYW5nZUF4aXMgPSAoKSA9PiB7XG5cdGxldCBjbGlja0NvdW50ID0gMTtcblxuXHRjb25zdCBheGlzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXMnKTtcblx0Y29uc3QgYXhpc1ZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXMtdmFsdWUnKTtcblx0YXhpc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRpZiAoY2xpY2tDb3VudCAlIDIgPT09IDApIHtcblx0XHRcdGF4aXNWYWx1ZS5pbm5lckhUTUwgPSAneCc7XG5cdFx0fSBlbHNlIGlmIChjbGlja0NvdW50ICUgMiAhPT0gMCkge1xuXHRcdFx0YXhpc1ZhbHVlLmlubmVySFRNTCA9ICd5Jztcblx0XHR9XG5cdFx0Y2xpY2tDb3VudCArPSAxO1xuXHR9KTtcbn07XG5cbmNvbnN0IGdldENvb3JkaW5hdGVzID0gKGVsZW1lbnQpID0+IHtcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coZS50YXJnZXQuaWQpO1xuXHR9KVxufTtcblxuY29uc3QgZ2V0Q29vcmRpbmF0ZXNPbkNsaWNrID0gKCkgPT4ge1xuXHRsZXQgeDtcblx0bGV0IHk7XG5cblx0Z2FtZUJvYXJkQ2VsbHMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG5leHBvcnQge1xuXHRkaXNwbGF5Qm9hcmQsXG5cdGNoYW5nZUNvbG9yT25Ib3Zlcixcblx0Y2hhbmdlQXhpcyxcblx0Y29sb3JDaGFuZ2VyLFxuXHRnZXRDb29yZGluYXRlc1xufSIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBheGlzLCBjb29yZGluYXRlcykgPT4ge1xuXHRsZXQgaW5qdXJlZERlY2tzID0ge3ZhbHVlOiAwfTtcblxuXHRsZXQgY29vcmRpbmF0ZXNPbkJvYXJkID0ge307XG5cdGNvb3JkaW5hdGVzT25Cb2FyZFswXSA9IGNvb3JkaW5hdGVzO1xuXHRpZiAoYXhpcy52YWx1ZSA9PT0gJ3gnICYmIGxlbmd0aCA+IDEpIHtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0Y29vcmRpbmF0ZXNPbkJvYXJkW2ldID0ge3g6IGNvb3JkaW5hdGVzLnggKyBpLCB5OiBjb29yZGluYXRlcy55fTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoYXhpcy52YWx1ZSA9PT0gJ3knICYmIGxlbmd0aCA+IDEpIHtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0Y29vcmRpbmF0ZXNPbkJvYXJkW2ldID0ge3g6IGNvb3JkaW5hdGVzLngsIHk6IGNvb3JkaW5hdGVzLnkgKyBpfTtcblx0XHR9XG5cdH1cblxuXHRsZXQgc3Vua1N0YXR1cyA9IHt2YWx1ZTogZmFsc2V9O1xuXG5cdGNvbnN0IGhpdCA9ICgpID0+IHtcblx0XHRpbmp1cmVkRGVja3MudmFsdWUgKz0gMTtcblx0XHRpc1N1bmsoKTtcblx0fVxuXG5cdGNvbnN0IGlzU3VuayA9ICgpID0+IHtcblx0XHRpZiAoaW5qdXJlZERlY2tzLnZhbHVlID09PSBsZW5ndGgpIHtcblx0XHRcdHN1bmtTdGF0dXMudmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4ge2xlbmd0aCwgaW5qdXJlZERlY2tzLCBjb29yZGluYXRlc09uQm9hcmQsc3Vua1N0YXR1cywgaGl0LCBpc1N1bmt9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXHQvL2FuIGFycmF5IHRvIHN0b3JlIGFsbCB0aGUgY3JlYXRlZCBzaGlwc1xuXHRjb25zdCBzaGlwcyA9IFtdO1xuXG5cdC8vdGhlIGFjdHVhbCBib2FyZFxuXHRsZXQgYm9hcmQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0Ym9hcmRbaV0gPSBbXTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcblx0XHRcdGJvYXJkW2ldW2pdID0gMDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBheGlzLCBjb29yZGluYXRlcykgPT4ge1xuXHRcdHNoaXBzLnB1c2goU2hpcChsZW5ndGgsIGF4aXMsIGNvb3JkaW5hdGVzKSk7XG5cdFx0aWYgKGF4aXMudmFsdWUgPT09ICd5Jykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzLnksIGogPSAwOyBqIDwgbGVuZ3RoOyBpKyssIGorKykge1xuXHRcdFx0XHRib2FyZFtjb29yZGluYXRlcy54XVtpXSA9IDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChheGlzLnZhbHVlID09PSAneCcpIHtcblx0XHRcdGZvciAobGV0IGkgPSBjb29yZGluYXRlcy54LCBqID0gMDsgaiA8IGxlbmd0aDsgaSsrLCBqKyspIHtcblx0XHRcdFx0Ym9hcmRbaV1bY29vcmRpbmF0ZXMueV0gPSAxO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvL3doYXQgbnVtYmVycyBvbiB0aGUgZGVzayBzdGFuZCBmb3I6XG5cdC8vMCBpcyBmb3IgZnJlZSBjZWxsLCAxIGlzIGZvciB0YWtlbiBjZWxsLCAyIGlzIGZvciBjZWxsIHdpdGggaGl0dGVkIHNoaXAsXG5cdC8vMyBpcyBmb3IgbWlzc2VkIHNob3Rcblx0Y29uc3QgcmVjaWV2ZUF0dGFjayA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGlmIChib2FyZFtjb29yZGluYXRlcy54XVtjb29yZGluYXRlcy55XSA9PT0gMSkge1xuXHRcdFx0Ym9hcmRbY29vcmRpbmF0ZXMueF1bY29vcmRpbmF0ZXMueV0gPSAyO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IE9iamVjdC5rZXlzKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZCkubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZiAoKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZFtqXS54ID09PSBjb29yZGluYXRlcy54KSAmJiAoc2hpcHNbaV0uY29vcmRpbmF0ZXNPbkJvYXJkW2pdLnkgPT09IGNvb3JkaW5hdGVzLnkpKSB7XG5cdFx0XHRcdFx0XHRzaGlwc1tpXS5oaXQoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2hlY2tHYW1lU3RhdHVzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2Nvb3JkaW5hdGVzLnhdW2Nvb3JkaW5hdGVzLnldID0gMztcblx0XHR9XG5cdH07XG5cblx0bGV0IGdhbWVTdGF0dXMgPSB7c3RhdHVzOiAnb24nfTtcblx0Y29uc3QgY2hlY2tHYW1lU3RhdHVzID0gKCkgPT4ge1xuXHRcdGdhbWVTdGF0dXMuc3RhdHVzID0gJ29mZic7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHNoaXBzW2ldLnN1bmtTdGF0dXMudmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdGdhbWVTdGF0dXMuc3RhdHVzID0gJ29uJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiB7Ym9hcmQsIHNoaXBzLCBwbGFjZVNoaXAsIHJlY2lldmVBdHRhY2ssIGdhbWVTdGF0dXN9O1xufTtcblxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xuXHRsZXQgeEFycmF5ID0gQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKTtcblx0bGV0IHlBcnJheSA9IEFycmF5LmZyb20oQXJyYXkoMTApLmtleXMoKSk7XG5cblx0Y29uc3QgY2FsY3VsYXRlQ29vcmRpbmF0ZXNGb3JBSSA9ICgpID0+IHtcblx0XHRsZXQgeCA9IHhBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqeEFycmF5Lmxlbmd0aCldO1xuXHRcdGxldCBpbmRleE9mWCA9IHhBcnJheS5pbmRleE9mKHgpO1xuXHRcdHhBcnJheS5zcGxpY2UoaW5kZXhPZlgsIDEpO1xuXG5cdFx0bGV0IHkgPSB5QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnlBcnJheS5sZW5ndGgpXTtcblx0XHRsZXQgaW5kZXhPZlkgPSB5QXJyYXkuaW5kZXhPZih5KTtcblx0XHR5QXJyYXkuc3BsaWNlKGluZGV4T2ZZLCAxKTtcblxuXHRcdHJldHVybiB7eDogeCwgeTogeX07XG5cdH07XG5cblx0cmV0dXJuIHtjYWxjdWxhdGVDb29yZGluYXRlc0ZvckFJfTtcbn1cblxuZXhwb3J0IHtcblx0U2hpcCxcblx0R2FtZWJvYXJkLFxuXHRQbGF5ZXJcbn0iLCJjb25zdCBjbGVhckJveCA9IChlbGVtZW50KSA9PiB7XG5cdGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZXhwb3J0IHtcblx0Y2xlYXJCb3hcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5oZWxsbyB7XFxuICAgIGNvbG9yOiByZWQ7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQ7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBoZWlnaHQ6IDIyMHB4O1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJvZHksIGh0bWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2JvYXJkcyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW4tdG9wOiA1JTtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIGFsaWduLWl0ZW1zOiBzdGFydDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XFxufVxcblxcbiNteS1ib2FyZC1kYXRhIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLypBeGlzIGJsb2NrIGVkaXRpbmcqL1xcbiNheGlzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICAgIHdpZHRoOiAxMDAlO1xcblxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNheGlzLW5hbWUge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGlCQUFpQjs7SUFFakIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksU0FBUztJQUNULFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsY0FBYzs7SUFFZCxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QixrQkFBa0I7SUFDbEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQSxxQkFBcUI7QUFDckI7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCOztJQUV2QixXQUFXOztJQUVYLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmhlbGxvIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYm9keSwgaHRtbCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jYm9hcmRzIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi10b3A6IDUlO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IHN0YXJ0O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbmJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuI215LWJvYXJkLWRhdGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKkF4aXMgYmxvY2sgZWRpdGluZyovXFxuI2F4aXMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gICAgd2lkdGg6IDEwMCU7XFxuXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2F4aXMtbmFtZSB7XFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtHYW1lYm9hcmR9IGZyb20gXCIuL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHtjaGFuZ2VBeGlzLCBkaXNwbGF5Qm9hcmQsIGNvbG9yQ2hhbmdlciwgZ2V0Q29vcmRpbmF0ZXN9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHtjbGVhckJveH0gZnJvbSBcIi4vaGVscC1mdW5jdGlvbnNcIjtcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG4vL2Rpc3BsYXkgcGxheWVyJ3MgYm9hcmRcbmNvbnN0IGdhbWVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1ib2FyZFwiKTtcbmNvbnN0IGZpcnN0R2FtZUJvYXJkID0gR2FtZWJvYXJkKCk7XG5kaXNwbGF5Qm9hcmQoZmlyc3RHYW1lQm9hcmQuYm9hcmQsIGdhbWVCb2FyZENvbnRhaW5lciwgJ215LWJvYXJkJyk7XG5cbi8vZGlzcGxheSBlbmVteSdzIGJvYXJkXG5jb25zdCBlbmVteWdhbWVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5lbXktZ2FtZS1ib2FyZFwiKTtcbmNvbnN0IGVuZW15Qm9hcmQgPSBHYW1lYm9hcmQoKTtcbmRpc3BsYXlCb2FyZChlbmVteUJvYXJkLmJvYXJkLCBlbmVteWdhbWVCb2FyZENvbnRhaW5lciwgJ2VuZW15LWJvYXJkJyk7XG5cbmNvbG9yQ2hhbmdlcigpO1xuXG4vL25vdyB3ZSBjYW4gY2hhbmdlIGF4aXMgdmFsdWUgYnkgY2xpY2tpbmdcbmNoYW5nZUF4aXMoKTtcblxuY29uc3QgdXBkYXRlTXlCb2FyZCA9ICgpID0+IHtcblx0Y2xlYXJCb3goZ2FtZUJvYXJkQ29udGFpbmVyKTtcblx0ZGlzcGxheUJvYXJkKGZpcnN0R2FtZUJvYXJkLmJvYXJkLCBnYW1lQm9hcmRDb250YWluZXIsICdteS1ib2FyZCcpO1xuXHRjb2xvckNoYW5nZXIoKTtcbn1cblxuY29uc3QgdXBkYXRlRW5lbXlCb2FyZCA9ICgpID0+IHtcblx0Y2xlYXJCb3goZW5lbXlnYW1lQm9hcmRDb250YWluZXIpO1xuXHRkaXNwbGF5Qm9hcmQoZW5lbXlCb2FyZC5ib2FyZCwgZW5lbXlnYW1lQm9hcmRDb250YWluZXIsICdlbmVteS1ib2FyZCcpO1xufVxuXG4vL3BsYWNpbmcgc2hpcHMgb24gbXkgYm9hcmRcbmNvbnN0IGF4aXNWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzLXZhbHVlJykuaW5uZXJIVE1MO1xuZ2V0Q29vcmRpbmF0ZXMoKTtcbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCg0LCB7dmFsdWU6IGF4aXNWYWx1ZX0sIHt4OiAxLCB5OiAxfSk7XG51cGRhdGVNeUJvYXJkKCk7Il0sIm5hbWVzIjpbImRpc3BsYXlCb2FyZCIsImJvYXJkIiwiY29udGFpbmVyIiwidW5pcXVlQ2xhc3MiLCJpIiwibGVuZ3RoIiwiaiIsIm9uZUNlbGwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJpZCIsImFwcGVuZENoaWxkIiwiY2hhbmdlQ29sb3JPbkhvdmVyIiwiZWxlbWVudCIsImxpc3RlbmVyIiwiY29sb3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZ2FtZUJvYXJkQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29sb3JDaGFuZ2VyIiwiZm9yRWFjaCIsImNlbGwiLCJnZXRDb29yZGluYXRlcyIsImNoYW5nZUF4aXMiLCJjbGlja0NvdW50IiwiYXhpc0NvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiYXhpc1ZhbHVlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJnZXRDb29yZGluYXRlc09uQ2xpY2siLCJ4IiwieSIsIml0ZW0iLCJTaGlwIiwiYXhpcyIsImNvb3JkaW5hdGVzIiwiaW5qdXJlZERlY2tzIiwidmFsdWUiLCJjb29yZGluYXRlc09uQm9hcmQiLCJzdW5rU3RhdHVzIiwiaGl0IiwiaXNTdW5rIiwiR2FtZWJvYXJkIiwic2hpcHMiLCJwbGFjZVNoaXAiLCJwdXNoIiwicmVjaWV2ZUF0dGFjayIsIk9iamVjdCIsImtleXMiLCJjaGVja0dhbWVTdGF0dXMiLCJnYW1lU3RhdHVzIiwic3RhdHVzIiwiUGxheWVyIiwieEFycmF5IiwiQXJyYXkiLCJmcm9tIiwieUFycmF5IiwiY2FsY3VsYXRlQ29vcmRpbmF0ZXNGb3JBSSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImluZGV4T2ZYIiwiaW5kZXhPZiIsInNwbGljZSIsImluZGV4T2ZZIiwiY2xlYXJCb3giLCJnYW1lQm9hcmRDb250YWluZXIiLCJmaXJzdEdhbWVCb2FyZCIsImVuZW15Z2FtZUJvYXJkQ29udGFpbmVyIiwiZW5lbXlCb2FyZCIsInVwZGF0ZU15Qm9hcmQiLCJ1cGRhdGVFbmVteUJvYXJkIl0sInNvdXJjZVJvb3QiOiIifQ==