import {displayBoard} from "./dom";

const clearBox = (element) => {
	element.innerHTML = "";
}

const updateBoard = (container, board, elementClass) => {
	clearBox(container);
	displayBoard(board, container, elementClass);
}

const clearCells = (cells, board) => {
	cells.forEach((cell) => {
		cell.innerHTML = "";
	})
}

export {
	clearBox,
	updateBoard,
	clearCells
}