const Ship = (length, axis, coordinates) => {
	let injuredDecks = {value: 0};

	let coordinatesOnBoard = {};
	coordinatesOnBoard[0] = coordinates;
	if (axis.value === 'x' && length > 1) {
		for (let i = 1; i <= length; i++) {
			coordinatesOnBoard[i] = {x: coordinates.x + i, y: coordinates.y};
		}
	} else if (axis.value === 'y' && length > 1) {
		for (let i = 1; i <= length; i++) {
			coordinatesOnBoard[i] = {x: coordinates.x, y: coordinates.y + i};
		}
	}

	let sunkStatus = {value: false};

	const hit = () => {
		injuredDecks.value += 1;
		isSunk();
	}

	const isSunk = () => {
		if (injuredDecks.value === length) {
			sunkStatus.value = true;
		}
	};

	return {length, injuredDecks, coordinatesOnBoard,sunkStatus, hit, isSunk};
};

export {
	Ship
}