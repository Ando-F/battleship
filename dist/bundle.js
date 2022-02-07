/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


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
    ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(length, axis, coordinates));

    if (axis.value === 'y') {
      for (var _i = coordinates.y, _j = 0; _j < length; _i++, _j++) {
        board[coordinates.x][_i] = 1;
      }
    } else if (axis.value === 'x') {
      for (var _i2 = coordinates.x, _j2 = 0; _j2 < length; _i2++, _j2++) {
        board[_i2][coordinates.y] = 1;
      }
    }
  }; //what numbers on the desk stand for:
  //0 is for free cell, 1 is for taken cell, 2 is for cell with hitted ship,
  //3 is for missed shot


  var recieveAttack = function recieveAttack(coordinates) {
    if (board[coordinates.x][coordinates.y] === 1) {
      board[coordinates.x][coordinates.y] = 2;

      for (var _i3 = 0; _i3 < ships.length; _i3++) {
        for (var _j3 = 0; _j3 < Object.keys(ships[_i3].coordinatesOnBoard).length; _j3++) {
          if (ships[_i3].coordinatesOnBoard[_j3].x === coordinates.x && ships[_i3].coordinatesOnBoard[_j3].y === coordinates.y) {
            ships[_i3].hit();

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

    for (var _i4 = 0; _i4 < ships.length; _i4++) {
      if (ships[_i4].sunkStatus.value === false) {
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



/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
var Player = function Player() {
  var xArray;
  var yArray;
  var numbersX = [];
  var numbersY = [];

  var createArray = function createArray(length, axis) {
    if (axis === 'x') {
      xArray = Array.from(Array(10 - length).keys());
      yArray = Array.from(Array(10).keys());
    } else if (axis === 'y') {
      xArray = Array.from(Array(10).keys());
      yArray = Array.from(Array(10 - length).keys());
    }
  };

  var randomCoordinates = function randomCoordinates(length, axis) {
    if (length === 1) {
      xArray = Array.from(Array(10).keys());
      yArray = Array.from(Array(10).keys());
    } else if (length === 2) {
      createArray(2, axis);
    } else if (length === 3) {
      createArray(3, axis);
    } else if (length === 4) {
      createArray(4, axis);
    }

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

  var checkBoard = function checkBoard(board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1) {
          numbersX.push(j);
          numbersY.push(i);
        }
      }
    }
  };

  var randomAxis = function randomAxis() {
    var randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);

    if (randomNumber === 1) {
      return 'x';
    } else {
      return 'y';
    }
  };

  return {
    randomAxis: randomAxis,
    randomCoordinates: randomCoordinates,
    xArray: xArray,
    yArray: yArray,
    checkBoard: checkBoard,
    numbersY: numbersY,
    numbersX: numbersX
  };
};



/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
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



/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "gameBoardContainer": () => (/* binding */ gameBoardContainer),
/* harmony export */   "enemyGameBoardContainer": () => (/* binding */ enemyGameBoardContainer)
/* harmony export */ });
//getting board containers from the DOM
var gameBoardContainer = document.getElementById("game-board");
var enemyGameBoardContainer = document.getElementById("enemy-game-board");

var displayBoard = function displayBoard(board, container, uniqueClass) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var oneCell = document.createElement('div');
      oneCell.classList.add('cell');
      oneCell.classList.add(uniqueClass);
      oneCell.innerHTML = board[i][j];
      oneCell.id = i * 10 + j;
      container.appendChild(oneCell);
      colorCells(oneCell);
    }
  }
};

var colorCells = function colorCells(cell) {
  if (cell.innerHTML === '1') {
    cell.style.background = 'lightblue';
  }
};



/***/ }),

/***/ "./src/help-functions.js":
/*!*******************************!*\
  !*** ./src/help-functions.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearBox": () => (/* binding */ clearBox),
/* harmony export */   "updateBoard": () => (/* binding */ updateBoard)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


var clearBox = function clearBox(element) {
  element.innerHTML = "";
};

var updateBoard = function updateBoard(container, board, elementClass) {
  clearBox(container);
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayBoard)(board, container, elementClass);
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
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _help_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./help-functions */ "./src/help-functions.js");




 //creating boards

var firstGameBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
var enemyBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(); //display both boards

(0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayBoard)(firstGameBoard.board, _dom__WEBPACK_IMPORTED_MODULE_2__.gameBoardContainer, 'my-board');
(0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayBoard)(enemyBoard.board, _dom__WEBPACK_IMPORTED_MODULE_2__.enemyGameBoardContainer, 'enemy-board'); //place ships on board

firstGameBoard.placeShip(4, {
  value: 'x'
}, {
  x: 1,
  y: 2
});
firstGameBoard.placeShip(3, {
  value: 'y'
}, {
  x: 1,
  y: 4
});
firstGameBoard.placeShip(3, {
  value: 'y'
}, {
  x: 7,
  y: 0
});
firstGameBoard.placeShip(2, {
  value: 'x'
}, {
  x: 6,
  y: 4
});
firstGameBoard.placeShip(2, {
  value: 'y'
}, {
  x: 9,
  y: 5
});
firstGameBoard.placeShip(2, {
  value: 'y'
}, {
  x: 5,
  y: 7
});
firstGameBoard.placeShip(1, {
  value: 'y'
}, {
  x: 0,
  y: 0
});
firstGameBoard.placeShip(1, {
  value: 'y'
}, {
  x: 9,
  y: 9
});
firstGameBoard.placeShip(1, {
  value: 'y'
}, {
  x: 0,
  y: 9
});
firstGameBoard.placeShip(1, {
  value: 'y'
}, {
  x: 9,
  y: 0
});
(0,_help_functions__WEBPACK_IMPORTED_MODULE_4__.updateBoard)(_dom__WEBPACK_IMPORTED_MODULE_2__.gameBoardContainer, firstGameBoard.board, 'my-board'); //place enemy ships on enemy board

var enemy = (0,_Player__WEBPACK_IMPORTED_MODULE_1__.Player)();
var axis = enemy.randomAxis();
enemyBoard.placeShip(4, {
  value: axis
}, enemy.randomCoordinates(4, axis));
console.log(enemy.xArray, enemy.yArray);
var axis1 = enemy.randomAxis();
enemyBoard.placeShip(3, {
  value: axis1
}, enemy.randomCoordinates(4, axis1));
(0,_help_functions__WEBPACK_IMPORTED_MODULE_4__.updateBoard)(_dom__WEBPACK_IMPORTED_MODULE_2__.enemyGameBoardContainer, enemyBoard.board, 'enemy-board');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBNUMsQ0FBWixFQUVBOztBQUNBbUIsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUVBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUVBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUVBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUNBc0QsY0FBYyxDQUFDNUQsU0FBZixDQUF5QixDQUF6QixFQUE0QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU7QUFBUixDQUE1QixFQUEwQztBQUFDRSxFQUFBQSxDQUFDLEVBQUUsQ0FBSjtBQUFPRCxFQUFBQSxDQUFDLEVBQUU7QUFBVixDQUExQztBQUVBb0QsNERBQVcsQ0FBQ3BCLG9EQUFELEVBQXFCc0IsY0FBYyxDQUFDL0QsS0FBcEMsRUFBMkMsVUFBM0MsQ0FBWCxFQUVBOztBQUNBLElBQU1pRSxLQUFLLEdBQUc3QywrQ0FBTSxFQUFwQjtBQUNBLElBQU1mLElBQUksR0FBRzRELEtBQUssQ0FBQzVCLFVBQU4sRUFBYjtBQUNBMkIsVUFBVSxDQUFDN0QsU0FBWCxDQUFxQixDQUFyQixFQUF3QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUVIO0FBQVIsQ0FBeEIsRUFBdUM0RCxLQUFLLENBQUNyQyxpQkFBTixDQUF3QixDQUF4QixFQUEyQnZCLElBQTNCLENBQXZDO0FBQ0E2RCxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBSyxDQUFDNUMsTUFBbEIsRUFBMEI0QyxLQUFLLENBQUMzQyxNQUFoQztBQUNBLElBQU04QyxLQUFLLEdBQUdILEtBQUssQ0FBQzVCLFVBQU4sRUFBZDtBQUNBMkIsVUFBVSxDQUFDN0QsU0FBWCxDQUFxQixDQUFyQixFQUF3QjtBQUFDSyxFQUFBQSxLQUFLLEVBQUU0RDtBQUFSLENBQXhCLEVBQXdDSCxLQUFLLENBQUNyQyxpQkFBTixDQUF3QixDQUF4QixFQUEyQndDLEtBQTNCLENBQXhDO0FBQ0FQLDREQUFXLENBQUNqQix5REFBRCxFQUEwQm9CLFVBQVUsQ0FBQ2hFLEtBQXJDLEVBQTRDLGFBQTVDLENBQVgsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9oZWxwLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NoaXB9IGZyb20gXCIuL1NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXHQvL2FuIGFycmF5IHRvIHN0b3JlIGFsbCB0aGUgY3JlYXRlZCBzaGlwc1xuXHRjb25zdCBzaGlwcyA9IFtdO1xuXG5cdC8vdGhlIGFjdHVhbCBib2FyZFxuXHRsZXQgYm9hcmQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0Ym9hcmRbaV0gPSBbXTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcblx0XHRcdGJvYXJkW2ldW2pdID0gMDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBheGlzLCBjb29yZGluYXRlcykgPT4ge1xuXHRcdHNoaXBzLnB1c2goU2hpcChsZW5ndGgsIGF4aXMsIGNvb3JkaW5hdGVzKSk7XG5cdFx0aWYgKGF4aXMudmFsdWUgPT09ICd5Jykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzLnksIGogPSAwOyBqIDwgbGVuZ3RoOyBpKyssIGorKykge1xuXHRcdFx0XHRib2FyZFtjb29yZGluYXRlcy54XVtpXSA9IDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChheGlzLnZhbHVlID09PSAneCcpIHtcblx0XHRcdGZvciAobGV0IGkgPSBjb29yZGluYXRlcy54LCBqID0gMDsgaiA8IGxlbmd0aDsgaSsrLCBqKyspIHtcblx0XHRcdFx0Ym9hcmRbaV1bY29vcmRpbmF0ZXMueV0gPSAxO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvL3doYXQgbnVtYmVycyBvbiB0aGUgZGVzayBzdGFuZCBmb3I6XG5cdC8vMCBpcyBmb3IgZnJlZSBjZWxsLCAxIGlzIGZvciB0YWtlbiBjZWxsLCAyIGlzIGZvciBjZWxsIHdpdGggaGl0dGVkIHNoaXAsXG5cdC8vMyBpcyBmb3IgbWlzc2VkIHNob3Rcblx0Y29uc3QgcmVjaWV2ZUF0dGFjayA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGlmIChib2FyZFtjb29yZGluYXRlcy54XVtjb29yZGluYXRlcy55XSA9PT0gMSkge1xuXHRcdFx0Ym9hcmRbY29vcmRpbmF0ZXMueF1bY29vcmRpbmF0ZXMueV0gPSAyO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IE9iamVjdC5rZXlzKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZCkubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZiAoKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZFtqXS54ID09PSBjb29yZGluYXRlcy54KSAmJiAoc2hpcHNbaV0uY29vcmRpbmF0ZXNPbkJvYXJkW2pdLnkgPT09IGNvb3JkaW5hdGVzLnkpKSB7XG5cdFx0XHRcdFx0XHRzaGlwc1tpXS5oaXQoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2hlY2tHYW1lU3RhdHVzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2Nvb3JkaW5hdGVzLnhdW2Nvb3JkaW5hdGVzLnldID0gMztcblx0XHR9XG5cdH07XG5cblx0bGV0IGdhbWVTdGF0dXMgPSB7c3RhdHVzOiAnb24nfTtcblx0Y29uc3QgY2hlY2tHYW1lU3RhdHVzID0gKCkgPT4ge1xuXHRcdGdhbWVTdGF0dXMuc3RhdHVzID0gJ29mZic7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHNoaXBzW2ldLnN1bmtTdGF0dXMudmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdGdhbWVTdGF0dXMuc3RhdHVzID0gJ29uJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiB7Ym9hcmQsIHNoaXBzLCBwbGFjZVNoaXAsIHJlY2lldmVBdHRhY2ssIGdhbWVTdGF0dXN9O1xufTtcblxuZXhwb3J0IHtcblx0R2FtZWJvYXJkXG59IiwiY29uc3QgUGxheWVyID0gKCkgPT4ge1xuXHRsZXQgeEFycmF5O1xuXHRsZXQgeUFycmF5O1xuXG5cdGxldCBudW1iZXJzWCA9IFtdO1xuXHRsZXQgbnVtYmVyc1kgPSBbXTtcblxuXHRjb25zdCBjcmVhdGVBcnJheSA9IChsZW5ndGgsIGF4aXMpID0+IHtcblx0XHRpZiAoYXhpcyA9PT0gJ3gnKSB7XG5cdFx0XHR4QXJyYXkgPSBBcnJheS5mcm9tKEFycmF5KDEwIC0gbGVuZ3RoKS5rZXlzKCkpO1xuXHRcdFx0eUFycmF5ID0gQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMgPT09ICd5Jykge1xuXHRcdFx0eEFycmF5ID0gQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKTtcblx0XHRcdHlBcnJheSA9IEFycmF5LmZyb20oQXJyYXkoMTAgLSBsZW5ndGgpLmtleXMoKSk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcmFuZG9tQ29vcmRpbmF0ZXMgPSAobGVuZ3RoLCBheGlzKSA9PiB7XG5cdFx0aWYgKGxlbmd0aCA9PT0gMSkge1xuXHRcdFx0eEFycmF5ID0gQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKTtcblx0XHRcdHlBcnJheSA9IEFycmF5LmZyb20oQXJyYXkoMTApLmtleXMoKSk7XG5cdFx0fSBlbHNlIGlmIChsZW5ndGggPT09IDIpIHtcblx0XHRcdGNyZWF0ZUFycmF5KDIsIGF4aXMpO1xuXHRcdH0gZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG5cdFx0XHRjcmVhdGVBcnJheSgzLCBheGlzKTtcblx0XHR9IGVsc2UgaWYgKGxlbmd0aCA9PT0gNCkge1xuXHRcdFx0Y3JlYXRlQXJyYXkoNCwgYXhpcyk7XG5cdFx0fVxuXG5cdFx0bGV0IHggPSB4QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnhBcnJheS5sZW5ndGgpXTtcblx0XHRsZXQgaW5kZXhPZlggPSB4QXJyYXkuaW5kZXhPZih4KTtcblx0XHR4QXJyYXkuc3BsaWNlKGluZGV4T2ZYLCAxKTtcblxuXHRcdGxldCB5ID0geUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp5QXJyYXkubGVuZ3RoKV07XG5cdFx0bGV0IGluZGV4T2ZZID0geUFycmF5LmluZGV4T2YoeSk7XG5cdFx0eUFycmF5LnNwbGljZShpbmRleE9mWSwgMSk7XG5cblx0XHRyZXR1cm4ge3g6IHgsIHk6IHl9O1xuXHR9O1xuXG5cdGNvbnN0IGNoZWNrQm9hcmQgPSAoYm9hcmQpID0+IHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGlmIChib2FyZFtpXVtqXSA9PT0gMSkge1xuXHRcdFx0XHRcdG51bWJlcnNYLnB1c2goaik7XG5cdFx0XHRcdFx0bnVtYmVyc1kucHVzaChpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHJhbmRvbUF4aXMgPSAoKSA9PiB7XG5cdFx0bGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyIC0gMSArIDEpICsgMSk7XG5cblx0XHRpZiAocmFuZG9tTnVtYmVyID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gJ3gnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gJ3knO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7cmFuZG9tQXhpcywgcmFuZG9tQ29vcmRpbmF0ZXMsIHhBcnJheSwgeUFycmF5LCBjaGVja0JvYXJkLCBudW1iZXJzWSwgbnVtYmVyc1h9O1xufVxuXG5leHBvcnQge1xuXHRQbGF5ZXJcbn0iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgYXhpcywgY29vcmRpbmF0ZXMpID0+IHtcblx0bGV0IGluanVyZWREZWNrcyA9IHt2YWx1ZTogMH07XG5cblx0bGV0IGNvb3JkaW5hdGVzT25Cb2FyZCA9IHt9O1xuXHRjb29yZGluYXRlc09uQm9hcmRbMF0gPSBjb29yZGluYXRlcztcblx0aWYgKGF4aXMudmFsdWUgPT09ICd4JyAmJiBsZW5ndGggPiAxKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvb3JkaW5hdGVzT25Cb2FyZFtpXSA9IHt4OiBjb29yZGluYXRlcy54ICsgaSwgeTogY29vcmRpbmF0ZXMueX07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGF4aXMudmFsdWUgPT09ICd5JyAmJiBsZW5ndGggPiAxKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvb3JkaW5hdGVzT25Cb2FyZFtpXSA9IHt4OiBjb29yZGluYXRlcy54LCB5OiBjb29yZGluYXRlcy55ICsgaX07XG5cdFx0fVxuXHR9XG5cblx0bGV0IHN1bmtTdGF0dXMgPSB7dmFsdWU6IGZhbHNlfTtcblxuXHRjb25zdCBoaXQgPSAoKSA9PiB7XG5cdFx0aW5qdXJlZERlY2tzLnZhbHVlICs9IDE7XG5cdFx0aXNTdW5rKCk7XG5cdH1cblxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG5cdFx0aWYgKGluanVyZWREZWNrcy52YWx1ZSA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRzdW5rU3RhdHVzLnZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHtsZW5ndGgsIGluanVyZWREZWNrcywgY29vcmRpbmF0ZXNPbkJvYXJkLHN1bmtTdGF0dXMsIGhpdCwgaXNTdW5rfTtcbn07XG5cbmV4cG9ydCB7XG5cdFNoaXBcbn0iLCIvL2dldHRpbmcgYm9hcmQgY29udGFpbmVycyBmcm9tIHRoZSBET01cbmNvbnN0IGdhbWVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1ib2FyZFwiKTtcbmNvbnN0IGVuZW15R2FtZUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmVteS1nYW1lLWJvYXJkXCIpO1xuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAoYm9hcmQsIGNvbnRhaW5lciwgdW5pcXVlQ2xhc3MpID0+IHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG9uZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdG9uZUNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuXHRcdFx0b25lQ2VsbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNsYXNzKTtcblx0XHRcdG9uZUNlbGwuaW5uZXJIVE1MID0gYm9hcmRbaV1bal07XG5cdFx0XHRvbmVDZWxsLmlkID0gKGkgKiAxMCkgKyBqO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG9uZUNlbGwpO1xuXG5cdFx0XHRjb2xvckNlbGxzKG9uZUNlbGwpO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgY29sb3JDZWxscyA9IChjZWxsKSA9PiB7XG5cdGlmIChjZWxsLmlubmVySFRNTCA9PT0gJzEnKSB7XG5cdFx0Y2VsbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2xpZ2h0Ymx1ZSc7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0ZGlzcGxheUJvYXJkLFxuXG5cdGdhbWVCb2FyZENvbnRhaW5lcixcblx0ZW5lbXlHYW1lQm9hcmRDb250YWluZXJcbn0iLCJpbXBvcnQge2Rpc3BsYXlCb2FyZH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IGNsZWFyQm94ID0gKGVsZW1lbnQpID0+IHtcblx0ZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5jb25zdCB1cGRhdGVCb2FyZCA9IChjb250YWluZXIsIGJvYXJkLCBlbGVtZW50Q2xhc3MpID0+IHtcblx0Y2xlYXJCb3goY29udGFpbmVyKTtcblx0ZGlzcGxheUJvYXJkKGJvYXJkLCBjb250YWluZXIsIGVsZW1lbnRDbGFzcyk7XG59XG5cbmV4cG9ydCB7XG5cdGNsZWFyQm94LFxuXHR1cGRhdGVCb2FyZFxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmhlbGxvIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYm9keSwgaHRtbCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jYm9hcmRzIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi10b3A6IDUlO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IHN0YXJ0O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbmJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuI215LWJvYXJkLWRhdGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKkF4aXMgYmxvY2sgZWRpdGluZyovXFxuI2F4aXMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gICAgd2lkdGg6IDEwMCU7XFxuXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2F4aXMtbmFtZSB7XFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCOztJQUVqQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7SUFDZix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxjQUFjOztJQUVkLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBLHFCQUFxQjtBQUNyQjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7O0lBRXZCLFdBQVc7O0lBRVgsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuaGVsbG8ge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgaGVpZ2h0OiAyMjBweDtcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5ib2R5LCBodG1sIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNib2FyZHMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLXRvcDogNSU7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBhbGlnbi1pdGVtczogc3RhcnQ7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcbn1cXG5cXG4jbXktYm9hcmQtZGF0YSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi8qQXhpcyBibG9jayBlZGl0aW5nKi9cXG4jYXhpcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcbiAgICB3aWR0aDogMTAwJTtcXG5cXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jYXhpcy1uYW1lIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0dhbWVib2FyZH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQge1xuXHRkaXNwbGF5Qm9hcmQsXG5cblx0Z2FtZUJvYXJkQ29udGFpbmVyLFxuXHRlbmVteUdhbWVCb2FyZENvbnRhaW5lcixcbn0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7XG5cdHVwZGF0ZUJvYXJkXG59IGZyb20gXCIuL2hlbHAtZnVuY3Rpb25zXCI7XG5cbi8vY3JlYXRpbmcgYm9hcmRzXG5jb25zdCBmaXJzdEdhbWVCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgZW5lbXlCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG4vL2Rpc3BsYXkgYm90aCBib2FyZHNcbmRpc3BsYXlCb2FyZChmaXJzdEdhbWVCb2FyZC5ib2FyZCwgZ2FtZUJvYXJkQ29udGFpbmVyLCAnbXktYm9hcmQnKTtcbmRpc3BsYXlCb2FyZChlbmVteUJvYXJkLmJvYXJkLCBlbmVteUdhbWVCb2FyZENvbnRhaW5lciwgJ2VuZW15LWJvYXJkJyk7XG5cbi8vcGxhY2Ugc2hpcHMgb24gYm9hcmRcbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCg0LCB7dmFsdWU6ICd4J30sIHt4OiAxLCB5OiAyfSk7XG5cbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCgzLCB7dmFsdWU6ICd5J30sIHt4OiAxLCB5OiA0fSk7XG5maXJzdEdhbWVCb2FyZC5wbGFjZVNoaXAoMywge3ZhbHVlOiAneSd9LCB7eDogNywgeTogMH0pO1xuXG5maXJzdEdhbWVCb2FyZC5wbGFjZVNoaXAoMiwge3ZhbHVlOiAneCd9LCB7eDogNiwgeTogNH0pO1xuZmlyc3RHYW1lQm9hcmQucGxhY2VTaGlwKDIsIHt2YWx1ZTogJ3knfSwge3g6IDksIHk6IDV9KTtcbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCgyLCB7dmFsdWU6ICd5J30sIHt4OiA1LCB5OiA3fSk7XG5cbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCgxLCB7dmFsdWU6ICd5J30sIHt4OiAwLCB5OiAwfSk7XG5maXJzdEdhbWVCb2FyZC5wbGFjZVNoaXAoMSwge3ZhbHVlOiAneSd9LCB7eDogOSwgeTogOX0pO1xuZmlyc3RHYW1lQm9hcmQucGxhY2VTaGlwKDEsIHt2YWx1ZTogJ3knfSwge3g6IDAsIHk6IDl9KTtcbmZpcnN0R2FtZUJvYXJkLnBsYWNlU2hpcCgxLCB7dmFsdWU6ICd5J30sIHt4OiA5LCB5OiAwfSk7XG5cbnVwZGF0ZUJvYXJkKGdhbWVCb2FyZENvbnRhaW5lciwgZmlyc3RHYW1lQm9hcmQuYm9hcmQsICdteS1ib2FyZCcpO1xuXG4vL3BsYWNlIGVuZW15IHNoaXBzIG9uIGVuZW15IGJvYXJkXG5jb25zdCBlbmVteSA9IFBsYXllcigpO1xuY29uc3QgYXhpcyA9IGVuZW15LnJhbmRvbUF4aXMoKTtcbmVuZW15Qm9hcmQucGxhY2VTaGlwKDQsIHt2YWx1ZTogYXhpc30sIGVuZW15LnJhbmRvbUNvb3JkaW5hdGVzKDQsIGF4aXMpKTtcbmNvbnNvbGUubG9nKGVuZW15LnhBcnJheSwgZW5lbXkueUFycmF5KTtcbmNvbnN0IGF4aXMxID0gZW5lbXkucmFuZG9tQXhpcygpO1xuZW5lbXlCb2FyZC5wbGFjZVNoaXAoMywge3ZhbHVlOiBheGlzMX0sIGVuZW15LnJhbmRvbUNvb3JkaW5hdGVzKDQsIGF4aXMxKSk7XG51cGRhdGVCb2FyZChlbmVteUdhbWVCb2FyZENvbnRhaW5lciwgZW5lbXlCb2FyZC5ib2FyZCwgJ2VuZW15LWJvYXJkJyk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJzaGlwcyIsImJvYXJkIiwiaSIsImoiLCJwbGFjZVNoaXAiLCJsZW5ndGgiLCJheGlzIiwiY29vcmRpbmF0ZXMiLCJwdXNoIiwidmFsdWUiLCJ5IiwieCIsInJlY2lldmVBdHRhY2siLCJPYmplY3QiLCJrZXlzIiwiY29vcmRpbmF0ZXNPbkJvYXJkIiwiaGl0IiwiY2hlY2tHYW1lU3RhdHVzIiwiZ2FtZVN0YXR1cyIsInN0YXR1cyIsInN1bmtTdGF0dXMiLCJQbGF5ZXIiLCJ4QXJyYXkiLCJ5QXJyYXkiLCJudW1iZXJzWCIsIm51bWJlcnNZIiwiY3JlYXRlQXJyYXkiLCJBcnJheSIsImZyb20iLCJyYW5kb21Db29yZGluYXRlcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImluZGV4T2ZYIiwiaW5kZXhPZiIsInNwbGljZSIsImluZGV4T2ZZIiwiY2hlY2tCb2FyZCIsInJhbmRvbUF4aXMiLCJyYW5kb21OdW1iZXIiLCJpbmp1cmVkRGVja3MiLCJpc1N1bmsiLCJnYW1lQm9hcmRDb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5lbXlHYW1lQm9hcmRDb250YWluZXIiLCJkaXNwbGF5Qm9hcmQiLCJjb250YWluZXIiLCJ1bmlxdWVDbGFzcyIsIm9uZUNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiaWQiLCJhcHBlbmRDaGlsZCIsImNvbG9yQ2VsbHMiLCJjZWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiY2xlYXJCb3giLCJlbGVtZW50IiwidXBkYXRlQm9hcmQiLCJlbGVtZW50Q2xhc3MiLCJmaXJzdEdhbWVCb2FyZCIsImVuZW15Qm9hcmQiLCJlbmVteSIsImNvbnNvbGUiLCJsb2ciLCJheGlzMSJdLCJzb3VyY2VSb290IjoiIn0=