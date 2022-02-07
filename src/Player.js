const Player = () => {
	let xArray;
	let yArray;

	const randomCoordinates = (length, axis) => {
		if (length === 1) {
			xArray = Array.from(Array(10).keys());
			yArray = Array.from(Array(10).keys());
		} else if (length === 2) {
			if (axis === 'x') {
				xArray = Array.from(Array(8).keys());
				yArray = Array.from(Array(10).keys());
			} else if (axis === 'y') {
				xArray = Array.from(Array(10).keys());
				yArray = Array.from(Array(8).keys());
			}
		} else if (length === 3) {
			if (axis === 'x') {
				xArray = Array.from(Array(7).keys());
				yArray = Array.from(Array(10).keys());
			} else if (axis === 'y') {
				xArray = Array.from(Array(10).keys());
				yArray = Array.from(Array(7).keys());
			}
		} else if (length === 4) {
			if (axis === 'x') {
				xArray = Array.from(Array(6).keys());
				yArray = Array.from(Array(10).keys());
			} else if (axis === 'y') {
				xArray = Array.from(Array(10).keys());
				yArray = Array.from(Array(6).keys());
			}
		}

		let x = xArray[Math.floor(Math.random()*xArray.length)];
		let indexOfX = xArray.indexOf(x);
		xArray.splice(indexOfX, 1);

		let y = yArray[Math.floor(Math.random()*yArray.length)];
		let indexOfY = yArray.indexOf(y);
		yArray.splice(indexOfY, 1);

		return {x: x, y: y};
	};

	const randomAxis = () => {
		let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);

		if (randomNumber === 1) {
			return 'x';
		} else {
			return 'y';
		}
	}

	return {randomAxis, randomCoordinates, xArray, yArray};
}

export {
	Player
}