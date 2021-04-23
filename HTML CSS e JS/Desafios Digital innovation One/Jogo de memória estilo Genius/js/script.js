let order = [];
let clickedOrder = [];
let score = 0;

//0 - green
//1 - yellow
//2 - orange
//3 - blue
//4 - purple
//5 - red

const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const orange = document.querySelector('.orange');
const blue = document.querySelector('.blue');
const purple = document.querySelector('.purple');
const red = document.querySelector('.red');

let shuffleOrder = () => {
	let colorOrder = Math.floor(Math.random() * 6);
	order[order.length] = colorOrder;
	clickedOrder = [];

	for (let i in order) {
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i) + 1);
	}
}

let lightColor = (element, number) => {
	number = number * 500;
	setTimeout(() => {
		element.classList.add('selected');
	}, number - 250);
	setTimeout(() => {
		element.classList.remove('selected');
	}, number);
}

let checkOrder = () => {
	for (let i in clickedOrder) {
		if(clickedOrder[i] != order[i]) {
			gameOver();
			break;
		}
	}
	if(clickedOrder.length == order.length) {
		alert(`Score: ${score}!\nSucess! Beginning new level!`);
		nextLevel();
	}
}

let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);
}

let createColorElement = (color) => {
	if(color == 0) {
		return green;
	} else if(color == 1) {
		return yellow;
	} else if (color == 2 ) {
		return orange;
	} else if (color == 3) {
		return blue;
	} else if (color == 4) {
		return purple;
	} else if (color == 5) {
		return red;
	}
}

let nextLevel = () => {
	score++;
	shuffleOrder();
}

let gameOver = () => {
	alert(`Score: ${score}!\nFail!\nClick "OK" to restart`);
	order = [];
	clickedOrder = [];

	playGame();
}

let playGame = () => {
	alert('Welcome to Genesis! Starting new game!');
	score = 0;

	nextLevel();
}

green.onclick = () => click(0);
yellow.onclick = () => click(1);
orange.onclick = () => click(2);
blue.onclick = () => click(3);
purple.onclick = () => click(4);
red.onclick = () => click(5);

//0 - green
//1 - yellow
//2 - orange
//3 - blue
//4 - purple
//5 - red

playGame();