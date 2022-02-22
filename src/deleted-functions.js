//change cell's color on event
const changeColorOnHover = (element, listener, color) => {
	element.addEventListener(listener, () => {
		element.style.background = color;
	});
};

const addColorListenersToEachCell = (elements) => {
	elements.forEach((cell) => {
		changeColorOnHover(cell, 'mouseover', 'yellow');
		changeColorOnHover(cell, 'mouseout', 'white');
	})
}