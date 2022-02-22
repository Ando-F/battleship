const changeAxis = () => {
    let clickCount = 1;

    const axisContainer = document.getElementById('axis');
    const axisValue = document.getElementById('axis-value');

    axisContainer.addEventListener('click', () => {
        if (clickCount % 2 === 0) {
            axisValue.innerHTML = 'x';
        } else if (clickCount % 2 !== 0) {
            axisValue.innerHTML = 'y';
        }
        clickCount += 1;
    });
};

export {changeAxis}