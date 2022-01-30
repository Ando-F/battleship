import {Gameboard} from "./factories";
import {displayBoard} from "./dom";
import './style.css';

console.log('hello');

const body = document.querySelector('body');
const h1 = document.createElement('h1');
h1.innerHTML = 'Hello';
h1.classList.add('hello');
body.appendChild(h1);

const firstGameBoard = Gameboard();
displayBoard(firstGameBoard.board)