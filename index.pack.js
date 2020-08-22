/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var grid = document.querySelector('.grid');
var startButton = document.getElementById('start');
var scoreDisplay = document.getElementById('score');
var squares = [];
var currentSnake = [2, 1, 0];
var direction = 1;
var width = 10;
var appleIndex = 0;
var score = 0;
var intervalTime = 1000;
var speed = 0.9;

function createGrid() {
  // create 100 of these elements with a for loop
  for (var i = 0; i < width * width; i++) {
    // create element
    var square = document.createElement('div');
    // add styling to these element
    square.classList.add('square');
    // put the element into our grid
    grid.appendChild(square);
    // push it into a new square array
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach(function (index) {
  return squares[index].classList.add('snake');
});

function move() {
  if (currentSnake[0] + width >= width * width && direction === width || //if snake has hit bottom
  currentSnake[0] % width === width - 1 && direction === 1 || // if snake has hit right wall
  currentSnake[0] % width === 0 && direction === -1 || // if snake has hit left wall
  currentSnake[0] - width < 0 && direction === -width || // if snake has hit top
  squares[currentSnake[0] + direction].classList.contains('snake')) return clearInterval(timerId);

  // remove last element from our currentSnake array
  var tail = currentSnake.pop();
  // remove styling from last element
  squares[tail].classList.remove('snake');
  // add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  // deal with snake head getting the apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple');
    // grow our snake by adding class of snake to it
    squares[tail].classList.add('snake');
    console.log(tail);
    // grow our snake array
    currentSnake.push(tail);
    console.log(currentSnake);
    // generate a new apple
    generateApple();
    // add one to the score
    score++;
    // display our score
    scoreDisplay.textContent = score;
    // speed up our snake
    clearInterval(timerId);
    console.log(intervalTime);
    intervalTime = intervalTime * speed;
    console.log(intervalTime);
    timerId = setInterval(move, intervalTime);
  }
  // add styling so we can see it
  squares[currentSnake[0]].classList.add('snake');
}

move();

var timerId = setInterval(move, intervalTime);

function generateApple() {
  do {
    // generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApple();

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
  if (e.keyCode === 39) {
    console.log('right pressed');
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log('up pressed');
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log('left pressed');
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log('down pressed');
    direction = +width;
  }
}
document.addEventListener('keydown', control);

/***/ })
/******/ ]);