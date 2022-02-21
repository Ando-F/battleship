import {displayBoard} from "./dom";

const clearBox = (element) => {
	element.innerHTML = "";
}

const updateBoard = (container, board, elementClass) => {
	clearBox(container);
	displayBoard(board, container, elementClass);
}

export {
	clearBox,
	updateBoard
}