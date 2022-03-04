/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AI.js":
/*!*******************!*\
  !*** ./src/AI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomCoordinates": () => (/* binding */ randomCoordinates),
/* harmony export */   "returnRandomCoordinates": () => (/* binding */ returnRandomCoordinates)
/* harmony export */ });
var randomCoordinates = []; // create array with all numbers we need

for (var i = 0; i < 100; i++) {
  randomCoordinates.push(i);
} // shuffle array


for (var j = 100 - 1; j >= 0; j--) {
  var swapIndex = Math.floor(Math.random() * j);
  var tmp = randomCoordinates[swapIndex];
  randomCoordinates[swapIndex] = randomCoordinates[j];
  randomCoordinates[j] = tmp;
}

var returnRandomCoordinates = function returnRandomCoordinates() {
  var x = Math.floor(randomCoordinates[0] / 10);
  var y = randomCoordinates[0] % 10;
  randomCoordinates.shift();
  return {
    x: x,
    y: y
  };
};



/***/ }),

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
    } else if (board[coordinates.x][coordinates.y] === 0) {
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
/* harmony import */ var _help_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help-functions */ "./src/help-functions.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AI */ "./src/AI.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");




var gameBoardContainer = document.getElementById("game-board");
var enemyGameBoardContainer = document.getElementById("enemy-game-board");

var displayBoard = function displayBoard(board, container, uniqueClass) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var oneCell = document.createElement('div');
      oneCell.classList.add('cell');
      oneCell.classList.add(uniqueClass);
      oneCell.id = i * 10 + j; // adding colors to cell background

      if (board[i][j] === 1) {
        oneCell.style.background = 'lightblue';
      } else if (board[i][j] === 2) {
        oneCell.style.background = 'red';
      } else if (board[i][j] === 3) {
        oneCell.style.background = 'lightgreen';
      } else {
        oneCell.style.background = 'white';
      }

      container.appendChild(oneCell);
    }
  }
}; // adding event listeners to all cells using Event Delegation


enemyGameBoardContainer.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName === 'DIV' && (e.target.style.background === 'white' || e.target.style.background === 'lightblue')) {
    var x = Math.floor(e.target.id / 10);
    var y = e.target.id % 10;
    _index__WEBPACK_IMPORTED_MODULE_1__.enemyBoard.recieveAttack({
      x: x,
      y: y
    });
    (0,_help_functions__WEBPACK_IMPORTED_MODULE_0__.updateBoard)(enemyGameBoardContainer, _index__WEBPACK_IMPORTED_MODULE_1__.enemyBoard.board, 'enemy-board');
    _index__WEBPACK_IMPORTED_MODULE_1__.firstGameBoard.recieveAttack((0,_AI__WEBPACK_IMPORTED_MODULE_2__.returnRandomCoordinates)());
    (0,_help_functions__WEBPACK_IMPORTED_MODULE_0__.updateBoard)(gameBoardContainer, _index__WEBPACK_IMPORTED_MODULE_1__.firstGameBoard.board, 'my-board');

    if (checkStatus(_index__WEBPACK_IMPORTED_MODULE_1__.enemyBoard.ships) === true) {
      createPopUp('You Win');
    } else if (checkStatus(_index__WEBPACK_IMPORTED_MODULE_1__.firstGameBoard.ships) === true) {
      createPopUp('You Lose');
    }
  }
}); // amount of all ships we placed

var four = 0;
var three = 0;
var two = 0;
var one = 0; // allowing ship placement by clicking cells

gameBoardContainer.addEventListener('click', function (e) {
  var placeShipOnClick = function placeShipOnClick(length) {
    var x = Math.floor(e.target.id / 10);
    var y = e.target.id % 10; //placing ships on my board

    var axisValue = document.getElementById('axis-value').innerHTML;
    _index__WEBPACK_IMPORTED_MODULE_1__.firstGameBoard.placeShip(length, {
      value: axisValue
    }, {
      x: x,
      y: y
    });
    (0,_help_functions__WEBPACK_IMPORTED_MODULE_0__.updateBoard)(gameBoardContainer, _index__WEBPACK_IMPORTED_MODULE_1__.firstGameBoard.board, 'my-board');
  };

  if (e.target && e.target.nodeName === 'DIV' && four < 1) {
    placeShipOnClick(4);
    four++;
  } else if (e.target && e.target.nodeName === 'DIV' && three < 2) {
    placeShipOnClick(3);
    three++;
  } else if (e.target && e.target.nodeName === 'DIV' && two < 3) {
    placeShipOnClick(2);
    two++;
  } else if (e.target && e.target.nodeName === 'DIV' && one < 4) {
    placeShipOnClick(1);
    one++;
  }
});

var checkStatus = function checkStatus(array) {
  var sunkFinalStatus = false;

  for (var i = 0; i < array.length; i++) {
    sunkFinalStatus = true;

    if (array[i].sunkStatus.value === false) {
      sunkFinalStatus = false;
      break;
    }
  }

  return sunkFinalStatus;
};

var createPopUp = function createPopUp(message) {
  var messageWindow = document.createElement('div');
  messageWindow.classList.add('pop-up');
  messageWindow.innerHTML = message;
  document.querySelector('body').appendChild(messageWindow);
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enemyBoard": () => (/* binding */ enemyBoard),
/* harmony export */   "firstGameBoard": () => (/* binding */ firstGameBoard)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _help_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./help-functions */ "./src/help-functions.js");
/* harmony import */ var _ship_placement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ship-placement */ "./src/ship-placement.js");




 //creating boards

var firstGameBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
var enemyBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(); //display both boards

(0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(firstGameBoard.board, _dom__WEBPACK_IMPORTED_MODULE_1__.gameBoardContainer, 'my-board');
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(enemyBoard.board, _dom__WEBPACK_IMPORTED_MODULE_1__.enemyGameBoardContainer, 'enemy-board');
(0,_ship_placement__WEBPACK_IMPORTED_MODULE_4__.changeAxis)();
enemyBoard.placeShip(4, {
  value: 'x'
}, {
  x: 1,
  y: 2
});
enemyBoard.placeShip(3, {
  value: 'y'
}, {
  x: 1,
  y: 4
});
enemyBoard.placeShip(3, {
  value: 'y'
}, {
  x: 7,
  y: 0
});
enemyBoard.placeShip(2, {
  value: 'x'
}, {
  x: 6,
  y: 4
});
enemyBoard.placeShip(2, {
  value: 'y'
}, {
  x: 9,
  y: 5
});
enemyBoard.placeShip(2, {
  value: 'y'
}, {
  x: 5,
  y: 7
});
enemyBoard.placeShip(1, {
  value: 'y'
}, {
  x: 0,
  y: 0
});
enemyBoard.placeShip(1, {
  value: 'y'
}, {
  x: 9,
  y: 9
});
enemyBoard.placeShip(1, {
  value: 'y'
}, {
  x: 0,
  y: 9
});
enemyBoard.placeShip(1, {
  value: 'y'
}, {
  x: 9,
  y: 0
});
(0,_help_functions__WEBPACK_IMPORTED_MODULE_3__.updateBoard)(_dom__WEBPACK_IMPORTED_MODULE_1__.enemyGameBoardContainer, enemyBoard.board, 'enemy-board');


/***/ }),

/***/ "./src/ship-placement.js":
/*!*******************************!*\
  !*** ./src/ship-placement.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeAxis": () => (/* binding */ changeAxis)
/* harmony export */ });
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
___CSS_LOADER_EXPORT___.push([module.id, ".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: start;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: start;\n}\n\n#my-board-data {\n    display: flex;\n    align-items: center;\n}\n\n/*Axis block editing*/\n#axis {\n    display: flex;\n    justify-content: center;\n\n    width: 100%;\n\n    cursor: pointer;\n}\n\n#axis-name {\n    margin-right: 15px;\n}\n\n/*Styling pop up window*/\n.pop-up {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    bottom: 50%;\n    margin: auto;\n\n    border: 1px solid;\n    width: 90%;\n    height: 80%;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    background-color: white;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,iBAAiB;;IAEjB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,aAAa;IACb,eAAe;IACf,uBAAuB;AAC3B;;AAEA;IACI,SAAS;IACT,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,cAAc;;IAEd,aAAa;IACb,mBAAmB;IACnB,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA,qBAAqB;AACrB;IACI,aAAa;IACb,uBAAuB;;IAEvB,WAAW;;IAEX,eAAe;AACnB;;AAEA;IACI,kBAAkB;AACtB;;AAEA,wBAAwB;AACxB;IACI,kBAAkB;IAClB,QAAQ;IACR,OAAO;IACP,QAAQ;IACR,WAAW;IACX,YAAY;;IAEZ,iBAAiB;IACjB,UAAU;IACV,WAAW;;IAEX,aAAa;IACb,uBAAuB;IACvB,mBAAmB;;IAEnB,uBAAuB;AAC3B","sourcesContent":[".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: start;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: start;\n}\n\n#my-board-data {\n    display: flex;\n    align-items: center;\n}\n\n/*Axis block editing*/\n#axis {\n    display: flex;\n    justify-content: center;\n\n    width: 100%;\n\n    cursor: pointer;\n}\n\n#axis-name {\n    margin-right: 15px;\n}\n\n/*Styling pop up window*/\n.pop-up {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    bottom: 50%;\n    margin: auto;\n\n    border: 1px solid;\n    width: 90%;\n    height: 80%;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    background-color: white;\n}"],"sourceRoot":""}]);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFDQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFDQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFFQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFDQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFDQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFDQXVCLFVBQVUsQ0FBQ2pCLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0I7QUFBQ0ksRUFBQUEsS0FBSyxFQUFFO0FBQVIsQ0FBeEIsRUFBc0M7QUFBQ1gsRUFBQUEsQ0FBQyxFQUFFLENBQUo7QUFBT0MsRUFBQUEsQ0FBQyxFQUFFO0FBQVYsQ0FBdEM7QUFFQXNCLDREQUFXLENBQUNNLHlE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RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL0FJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvaGVscC1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL3NyYy9zaGlwLXBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLTEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAtMS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0xL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcmFuZG9tQ29vcmRpbmF0ZXMgPSBbXTtcblxuLy8gY3JlYXRlIGFycmF5IHdpdGggYWxsIG51bWJlcnMgd2UgbmVlZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIHJhbmRvbUNvb3JkaW5hdGVzLnB1c2goaSk7XG59XG5cbi8vIHNodWZmbGUgYXJyYXlcbmZvciAobGV0IGogPSAxMDAgLSAxOyBqID49IDA7IGotLSkge1xuICAgIGxldCBzd2FwSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBqKTtcbiAgICBsZXQgdG1wID0gcmFuZG9tQ29vcmRpbmF0ZXNbc3dhcEluZGV4XTtcbiAgICByYW5kb21Db29yZGluYXRlc1tzd2FwSW5kZXhdID0gcmFuZG9tQ29vcmRpbmF0ZXNbal07XG4gICAgcmFuZG9tQ29vcmRpbmF0ZXNbal0gPSB0bXA7XG59XG5cblxuY29uc3QgcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKHJhbmRvbUNvb3JkaW5hdGVzWzBdIC8gMTApO1xuICAgIGxldCB5ID0gcmFuZG9tQ29vcmRpbmF0ZXNbMF0gJSAxMDtcbiAgICByYW5kb21Db29yZGluYXRlcy5zaGlmdCgpO1xuICAgIHJldHVybiB7eDogeCwgeTogeX07XG59XG5leHBvcnQge3JhbmRvbUNvb3JkaW5hdGVzLCByZXR1cm5SYW5kb21Db29yZGluYXRlc30iLCJpbXBvcnQge1NoaXB9IGZyb20gXCIuL1NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXHQvL2FuIGFycmF5IHRvIHN0b3JlIGFsbCB0aGUgY3JlYXRlZCBzaGlwc1xuXHRjb25zdCBzaGlwcyA9IFtdO1xuXG5cdC8vdGhlIGFjdHVhbCBib2FyZFxuXHRsZXQgYm9hcmQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0Ym9hcmRbaV0gPSBbXTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcblx0XHRcdGJvYXJkW2ldW2pdID0gMDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBheGlzLCBjb29yZGluYXRlcykgPT4ge1xuXHRcdHNoaXBzLnB1c2goU2hpcChsZW5ndGgsIGF4aXMsIGNvb3JkaW5hdGVzKSk7XG5cdFx0aWYgKGF4aXMudmFsdWUgPT09ICd5Jykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzLnksIGogPSAwOyBqIDwgbGVuZ3RoOyBpKyssIGorKykge1xuXHRcdFx0XHRib2FyZFtjb29yZGluYXRlcy54XVtpXSA9IDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChheGlzLnZhbHVlID09PSAneCcpIHtcblx0XHRcdGZvciAobGV0IGkgPSBjb29yZGluYXRlcy54LCBqID0gMDsgaiA8IGxlbmd0aDsgaSsrLCBqKyspIHtcblx0XHRcdFx0Ym9hcmRbaV1bY29vcmRpbmF0ZXMueV0gPSAxO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvL3doYXQgbnVtYmVycyBvbiB0aGUgZGVzayBzdGFuZCBmb3I6XG5cdC8vMCBpcyBmb3IgZnJlZSBjZWxsLCAxIGlzIGZvciB0YWtlbiBjZWxsLCAyIGlzIGZvciBjZWxsIHdpdGggaGl0dGVkIHNoaXAsXG5cdC8vMyBpcyBmb3IgbWlzc2VkIHNob3Rcblx0Y29uc3QgcmVjaWV2ZUF0dGFjayA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGlmIChib2FyZFtjb29yZGluYXRlcy54XVtjb29yZGluYXRlcy55XSA9PT0gMSkge1xuXHRcdFx0Ym9hcmRbY29vcmRpbmF0ZXMueF1bY29vcmRpbmF0ZXMueV0gPSAyO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IE9iamVjdC5rZXlzKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZCkubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZiAoKHNoaXBzW2ldLmNvb3JkaW5hdGVzT25Cb2FyZFtqXS54ID09PSBjb29yZGluYXRlcy54KSAmJiAoc2hpcHNbaV0uY29vcmRpbmF0ZXNPbkJvYXJkW2pdLnkgPT09IGNvb3JkaW5hdGVzLnkpKSB7XG5cdFx0XHRcdFx0XHRzaGlwc1tpXS5oaXQoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2hlY2tHYW1lU3RhdHVzKCk7XG5cdFx0fSBlbHNlIGlmIChib2FyZFtjb29yZGluYXRlcy54XVtjb29yZGluYXRlcy55XSA9PT0gMCkge1xuXHRcdFx0Ym9hcmRbY29vcmRpbmF0ZXMueF1bY29vcmRpbmF0ZXMueV0gPSAzO1xuXHRcdH1cblx0fTtcblxuXHRsZXQgZ2FtZVN0YXR1cyA9IHtzdGF0dXM6ICdvbid9O1xuXHRjb25zdCBjaGVja0dhbWVTdGF0dXMgPSAoKSA9PiB7XG5cdFx0Z2FtZVN0YXR1cy5zdGF0dXMgPSAnb2ZmJztcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoc2hpcHNbaV0uc3Vua1N0YXR1cy52YWx1ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Z2FtZVN0YXR1cy5zdGF0dXMgPSAnb24nO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHtib2FyZCwgc2hpcHMsIHBsYWNlU2hpcCwgcmVjaWV2ZUF0dGFjaywgZ2FtZVN0YXR1c307XG59O1xuXG5leHBvcnQge1xuXHRHYW1lYm9hcmRcbn0iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgYXhpcywgY29vcmRpbmF0ZXMpID0+IHtcblx0bGV0IGluanVyZWREZWNrcyA9IHt2YWx1ZTogMH07XG5cblx0bGV0IGNvb3JkaW5hdGVzT25Cb2FyZCA9IHt9O1xuXHRjb29yZGluYXRlc09uQm9hcmRbMF0gPSBjb29yZGluYXRlcztcblx0aWYgKGF4aXMudmFsdWUgPT09ICd4JyAmJiBsZW5ndGggPiAxKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvb3JkaW5hdGVzT25Cb2FyZFtpXSA9IHt4OiBjb29yZGluYXRlcy54ICsgaSwgeTogY29vcmRpbmF0ZXMueX07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGF4aXMudmFsdWUgPT09ICd5JyAmJiBsZW5ndGggPiAxKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvb3JkaW5hdGVzT25Cb2FyZFtpXSA9IHt4OiBjb29yZGluYXRlcy54LCB5OiBjb29yZGluYXRlcy55ICsgaX07XG5cdFx0fVxuXHR9XG5cblx0bGV0IHN1bmtTdGF0dXMgPSB7dmFsdWU6IGZhbHNlfTtcblxuXHRjb25zdCBoaXQgPSAoKSA9PiB7XG5cdFx0aW5qdXJlZERlY2tzLnZhbHVlICs9IDE7XG5cdFx0aXNTdW5rKCk7XG5cdH1cblxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG5cdFx0aWYgKGluanVyZWREZWNrcy52YWx1ZSA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRzdW5rU3RhdHVzLnZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHtsZW5ndGgsIGluanVyZWREZWNrcywgY29vcmRpbmF0ZXNPbkJvYXJkLHN1bmtTdGF0dXMsIGhpdCwgaXNTdW5rfTtcbn07XG5cbmV4cG9ydCB7XG5cdFNoaXBcbn0iLCJpbXBvcnQge3VwZGF0ZUJvYXJkfSBmcm9tIFwiLi9oZWxwLWZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtlbmVteUJvYXJkLCBmaXJzdEdhbWVCb2FyZH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7cmV0dXJuUmFuZG9tQ29vcmRpbmF0ZXN9IGZyb20gXCIuL0FJXCI7XG5pbXBvcnQge1NoaXB9IGZyb20gXCIuL1NoaXBcIjtcblxuY29uc3QgZ2FtZUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLWJvYXJkXCIpO1xuY29uc3QgZW5lbXlHYW1lQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZW15LWdhbWUtYm9hcmRcIik7XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChib2FyZCwgY29udGFpbmVyLCB1bmlxdWVDbGFzcykgPT4ge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFtpXS5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgb25lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0b25lQ2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cdFx0XHRvbmVDZWxsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ2xhc3MpO1xuXHRcdFx0b25lQ2VsbC5pZCA9IChpICogMTApICsgajtcblxuXHRcdFx0Ly8gYWRkaW5nIGNvbG9ycyB0byBjZWxsIGJhY2tncm91bmRcblx0XHRcdGlmIChib2FyZFtpXVtqXSA9PT0gMSkge1xuXHRcdFx0XHRvbmVDZWxsLnN0eWxlLmJhY2tncm91bmQgPSAnbGlnaHRibHVlJztcblx0XHRcdH0gZWxzZSBpZiAoYm9hcmRbaV1bal0gPT09IDIpIHtcblx0XHRcdFx0b25lQ2VsbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG5cdFx0XHR9IGVsc2UgaWYgKGJvYXJkW2ldW2pdID09PSAzKSB7XG5cdFx0XHRcdG9uZUNlbGwuc3R5bGUuYmFja2dyb3VuZCA9ICdsaWdodGdyZWVuJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9uZUNlbGwuc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChvbmVDZWxsKTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIGFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gYWxsIGNlbGxzIHVzaW5nIEV2ZW50IERlbGVnYXRpb25cbmVuZW15R2FtZUJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0aWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnRElWJyAmJiAoZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9PT0gJ3doaXRlJyB8fCBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID09PSAnbGlnaHRibHVlJykpIHtcblx0XHRsZXQgeCA9IE1hdGguZmxvb3IoZS50YXJnZXQuaWQgLyAxMCk7XG5cdFx0bGV0IHkgPSBlLnRhcmdldC5pZCAlIDEwO1xuXG5cdFx0ZW5lbXlCb2FyZC5yZWNpZXZlQXR0YWNrKHt4OiB4LCB5OiB5fSk7XG5cdFx0dXBkYXRlQm9hcmQoZW5lbXlHYW1lQm9hcmRDb250YWluZXIsIGVuZW15Qm9hcmQuYm9hcmQsICdlbmVteS1ib2FyZCcpO1xuXG5cdFx0Zmlyc3RHYW1lQm9hcmQucmVjaWV2ZUF0dGFjayhyZXR1cm5SYW5kb21Db29yZGluYXRlcygpKTtcblx0XHR1cGRhdGVCb2FyZChnYW1lQm9hcmRDb250YWluZXIsIGZpcnN0R2FtZUJvYXJkLmJvYXJkLCAnbXktYm9hcmQnKTtcblxuXHRcdGlmIChjaGVja1N0YXR1cyhlbmVteUJvYXJkLnNoaXBzKSA9PT0gdHJ1ZSkge1xuXHRcdFx0Y3JlYXRlUG9wVXAoJ1lvdSBXaW4nKTtcblx0XHR9IGVsc2UgaWYgKGNoZWNrU3RhdHVzKGZpcnN0R2FtZUJvYXJkLnNoaXBzKSA9PT0gdHJ1ZSkge1xuXHRcdFx0Y3JlYXRlUG9wVXAoJ1lvdSBMb3NlJyk7XG5cdFx0fVxuXHR9XG59KVxuXG4vLyBhbW91bnQgb2YgYWxsIHNoaXBzIHdlIHBsYWNlZFxubGV0IGZvdXIgPSAwO1xubGV0IHRocmVlID0gMDtcbmxldCB0d28gPSAwO1xubGV0IG9uZSA9IDA7XG5cbi8vIGFsbG93aW5nIHNoaXAgcGxhY2VtZW50IGJ5IGNsaWNraW5nIGNlbGxzXG5nYW1lQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRjb25zdCBwbGFjZVNoaXBPbkNsaWNrID0gKGxlbmd0aCkgPT4ge1xuXHRcdGxldCB4ID0gTWF0aC5mbG9vcihlLnRhcmdldC5pZCAvIDEwKTtcblx0XHRsZXQgeSA9IGUudGFyZ2V0LmlkICUgMTA7XG5cblx0XHQvL3BsYWNpbmcgc2hpcHMgb24gbXkgYm9hcmRcblx0XHRjb25zdCBheGlzVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXhpcy12YWx1ZScpLmlubmVySFRNTDtcblx0XHRmaXJzdEdhbWVCb2FyZC5wbGFjZVNoaXAobGVuZ3RoLCB7dmFsdWU6IGF4aXNWYWx1ZX0sIHt4OiB4LCB5OiB5fSk7XG5cdFx0dXBkYXRlQm9hcmQoZ2FtZUJvYXJkQ29udGFpbmVyLCBmaXJzdEdhbWVCb2FyZC5ib2FyZCwgJ215LWJvYXJkJyk7XG5cdH1cblxuXHRpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUgPT09ICdESVYnICYmIGZvdXIgPCAxKSB7XG5cdFx0cGxhY2VTaGlwT25DbGljayg0KTtcblx0XHRmb3VyKys7XG5cdH0gZWxzZSBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUgPT09ICdESVYnICYmIHRocmVlIDwgMil7XG5cdFx0cGxhY2VTaGlwT25DbGljaygzKTtcblx0XHR0aHJlZSsrO1xuXHR9IGVsc2UgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnRElWJyAmJiB0d28gPCAzKSB7XG5cdFx0cGxhY2VTaGlwT25DbGljaygyKTtcblx0XHR0d28rKztcblx0fSBlbHNlIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0RJVicgJiYgb25lIDwgNCkge1xuXHRcdHBsYWNlU2hpcE9uQ2xpY2soMSk7XG5cdFx0b25lKys7XG5cdH1cbn0pXG5cbmNvbnN0IGNoZWNrU3RhdHVzID0gKGFycmF5KSA9PiB7XG5cdGxldCBzdW5rRmluYWxTdGF0dXMgPSBmYWxzZTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdHN1bmtGaW5hbFN0YXR1cyA9IHRydWU7XG5cdFx0aWYgKGFycmF5W2ldLnN1bmtTdGF0dXMudmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0XHRzdW5rRmluYWxTdGF0dXMgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3Vua0ZpbmFsU3RhdHVzO1xufVxuXG5jb25zdCBjcmVhdGVQb3BVcCA9IChtZXNzYWdlKSA9PiB7XG5cdGNvbnN0IG1lc3NhZ2VXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bWVzc2FnZVdpbmRvdy5jbGFzc0xpc3QuYWRkKCdwb3AtdXAnKTtcblx0bWVzc2FnZVdpbmRvdy5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQobWVzc2FnZVdpbmRvdyk7XG59XG5cbmV4cG9ydCB7XG5cdGRpc3BsYXlCb2FyZCxcblxuXHRnYW1lQm9hcmRDb250YWluZXIsXG5cdGVuZW15R2FtZUJvYXJkQ29udGFpbmVyXG59IiwiaW1wb3J0IHtkaXNwbGF5Qm9hcmR9IGZyb20gXCIuL2RvbVwiO1xuXG5jb25zdCBjbGVhckJveCA9IChlbGVtZW50KSA9PiB7XG5cdGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuY29uc3QgdXBkYXRlQm9hcmQgPSAoY29udGFpbmVyLCBib2FyZCwgZWxlbWVudENsYXNzKSA9PiB7XG5cdGNsZWFyQm94KGNvbnRhaW5lcik7XG5cdGRpc3BsYXlCb2FyZChib2FyZCwgY29udGFpbmVyLCBlbGVtZW50Q2xhc3MpO1xufVxuXG5leHBvcnQge1xuXHRjbGVhckJveCxcblx0dXBkYXRlQm9hcmRcbn0iLCJpbXBvcnQge0dhbWVib2FyZH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQge1xuXHRkaXNwbGF5Qm9hcmQsXG5cdGdhbWVCb2FyZENvbnRhaW5lcixcblx0ZW5lbXlHYW1lQm9hcmRDb250YWluZXIsXG59IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQge3VwZGF0ZUJvYXJkfSBmcm9tIFwiLi9oZWxwLWZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtjaGFuZ2VBeGlzfSBmcm9tIFwiLi9zaGlwLXBsYWNlbWVudFwiO1xuXG4vL2NyZWF0aW5nIGJvYXJkc1xuY29uc3QgZmlyc3RHYW1lQm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGVuZW15Qm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuLy9kaXNwbGF5IGJvdGggYm9hcmRzXG5kaXNwbGF5Qm9hcmQoZmlyc3RHYW1lQm9hcmQuYm9hcmQsIGdhbWVCb2FyZENvbnRhaW5lciwgJ215LWJvYXJkJyk7XG5kaXNwbGF5Qm9hcmQoZW5lbXlCb2FyZC5ib2FyZCwgZW5lbXlHYW1lQm9hcmRDb250YWluZXIsICdlbmVteS1ib2FyZCcpO1xuXG5jaGFuZ2VBeGlzKCk7XG5cbmVuZW15Qm9hcmQucGxhY2VTaGlwKDQsIHt2YWx1ZTogJ3gnfSwge3g6IDEsIHk6IDJ9KTtcblxuZW5lbXlCb2FyZC5wbGFjZVNoaXAoMywge3ZhbHVlOiAneSd9LCB7eDogMSwgeTogNH0pO1xuZW5lbXlCb2FyZC5wbGFjZVNoaXAoMywge3ZhbHVlOiAneSd9LCB7eDogNywgeTogMH0pO1xuXG5lbmVteUJvYXJkLnBsYWNlU2hpcCgyLCB7dmFsdWU6ICd4J30sIHt4OiA2LCB5OiA0fSk7XG5lbmVteUJvYXJkLnBsYWNlU2hpcCgyLCB7dmFsdWU6ICd5J30sIHt4OiA5LCB5OiA1fSk7XG5lbmVteUJvYXJkLnBsYWNlU2hpcCgyLCB7dmFsdWU6ICd5J30sIHt4OiA1LCB5OiA3fSk7XG5cbmVuZW15Qm9hcmQucGxhY2VTaGlwKDEsIHt2YWx1ZTogJ3knfSwge3g6IDAsIHk6IDB9KTtcbmVuZW15Qm9hcmQucGxhY2VTaGlwKDEsIHt2YWx1ZTogJ3knfSwge3g6IDksIHk6IDl9KTtcbmVuZW15Qm9hcmQucGxhY2VTaGlwKDEsIHt2YWx1ZTogJ3knfSwge3g6IDAsIHk6IDl9KTtcbmVuZW15Qm9hcmQucGxhY2VTaGlwKDEsIHt2YWx1ZTogJ3knfSwge3g6IDksIHk6IDB9KTtcblxudXBkYXRlQm9hcmQoZW5lbXlHYW1lQm9hcmRDb250YWluZXIsIGVuZW15Qm9hcmQuYm9hcmQsICdlbmVteS1ib2FyZCcpO1xuXG5leHBvcnQge2VuZW15Qm9hcmQsIGZpcnN0R2FtZUJvYXJkfSIsImNvbnN0IGNoYW5nZUF4aXMgPSAoKSA9PiB7XG4gICAgbGV0IGNsaWNrQ291bnQgPSAxO1xuXG4gICAgY29uc3QgYXhpc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzJyk7XG4gICAgY29uc3QgYXhpc1ZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXMtdmFsdWUnKTtcblxuICAgIGF4aXNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChjbGlja0NvdW50ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgYXhpc1ZhbHVlLmlubmVySFRNTCA9ICd4JztcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja0NvdW50ICUgMiAhPT0gMCkge1xuICAgICAgICAgICAgYXhpc1ZhbHVlLmlubmVySFRNTCA9ICd5JztcbiAgICAgICAgfVxuICAgICAgICBjbGlja0NvdW50ICs9IDE7XG4gICAgfSk7XG59O1xuXG5leHBvcnQge2NoYW5nZUF4aXN9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuaGVsbG8ge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgaGVpZ2h0OiAyMjBweDtcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5ib2R5LCBodG1sIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNib2FyZHMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLXRvcDogNSU7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBhbGlnbi1pdGVtczogc3RhcnQ7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcbn1cXG5cXG4jbXktYm9hcmQtZGF0YSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi8qQXhpcyBibG9jayBlZGl0aW5nKi9cXG4jYXhpcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcbiAgICB3aWR0aDogMTAwJTtcXG5cXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jYXhpcy1uYW1lIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbn1cXG5cXG4vKlN0eWxpbmcgcG9wIHVwIHdpbmRvdyovXFxuLnBvcC11cCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDUwJTtcXG4gICAgbWFyZ2luOiBhdXRvO1xcblxcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCOztJQUVqQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7SUFDZix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxjQUFjOztJQUVkLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBLHFCQUFxQjtBQUNyQjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7O0lBRXZCLFdBQVc7O0lBRVgsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQSx3QkFBd0I7QUFDeEI7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLE9BQU87SUFDUCxRQUFRO0lBQ1IsV0FBVztJQUNYLFlBQVk7O0lBRVosaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixXQUFXOztJQUVYLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1COztJQUVuQix1QkFBdUI7QUFDM0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmhlbGxvIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYm9keSwgaHRtbCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jYm9hcmRzIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi10b3A6IDUlO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IHN0YXJ0O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbmJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuI215LWJvYXJkLWRhdGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKkF4aXMgYmxvY2sgZWRpdGluZyovXFxuI2F4aXMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gICAgd2lkdGg6IDEwMCU7XFxuXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2F4aXMtbmFtZSB7XFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG59XFxuXFxuLypTdHlsaW5nIHBvcCB1cCB3aW5kb3cqL1xcbi5wb3AtdXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiA1MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG5cXG4gICAgYm9yZGVyOiAxcHggc29saWQ7XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIGhlaWdodDogODAlO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInJhbmRvbUNvb3JkaW5hdGVzIiwiaSIsInB1c2giLCJqIiwic3dhcEluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG1wIiwicmV0dXJuUmFuZG9tQ29vcmRpbmF0ZXMiLCJ4IiwieSIsInNoaWZ0IiwiU2hpcCIsIkdhbWVib2FyZCIsInNoaXBzIiwiYm9hcmQiLCJwbGFjZVNoaXAiLCJsZW5ndGgiLCJheGlzIiwiY29vcmRpbmF0ZXMiLCJ2YWx1ZSIsInJlY2lldmVBdHRhY2siLCJPYmplY3QiLCJrZXlzIiwiY29vcmRpbmF0ZXNPbkJvYXJkIiwiaGl0IiwiY2hlY2tHYW1lU3RhdHVzIiwiZ2FtZVN0YXR1cyIsInN0YXR1cyIsInN1bmtTdGF0dXMiLCJpbmp1cmVkRGVja3MiLCJpc1N1bmsiLCJ1cGRhdGVCb2FyZCIsImVuZW15Qm9hcmQiLCJmaXJzdEdhbWVCb2FyZCIsImdhbWVCb2FyZENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmVteUdhbWVCb2FyZENvbnRhaW5lciIsImRpc3BsYXlCb2FyZCIsImNvbnRhaW5lciIsInVuaXF1ZUNsYXNzIiwib25lQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNoZWNrU3RhdHVzIiwiY3JlYXRlUG9wVXAiLCJmb3VyIiwidGhyZWUiLCJ0d28iLCJvbmUiLCJwbGFjZVNoaXBPbkNsaWNrIiwiYXhpc1ZhbHVlIiwiaW5uZXJIVE1MIiwiYXJyYXkiLCJzdW5rRmluYWxTdGF0dXMiLCJtZXNzYWdlIiwibWVzc2FnZVdpbmRvdyIsInF1ZXJ5U2VsZWN0b3IiLCJjbGVhckJveCIsImVsZW1lbnQiLCJlbGVtZW50Q2xhc3MiLCJjaGFuZ2VBeGlzIiwiY2xpY2tDb3VudCIsImF4aXNDb250YWluZXIiXSwic291cmNlUm9vdCI6IiJ9