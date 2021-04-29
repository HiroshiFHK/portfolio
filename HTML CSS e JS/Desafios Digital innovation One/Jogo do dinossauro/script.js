const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isGameOver = false;
let position = 0;
var score = 0;

function handleKeyUp(event) {
	if (event.keyCode === 32) {
		if (!isJumping) {
			jump();
		}
	} 
}

function jump() {
	isJumping = true;

	let upInterval = setInterval(() => {
		if (position >= 150) {
			clearInterval(upInterval);

			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval);
					isJumping = false;
				} else {
					position -= 20;
					dino.style.bottom = position + 'px';
				}
			}, 20);
		} else {

			position += 20;
			dino.style.bottom = position + 'px';
		}
	}, 20);

	score = score + 10;

	document.getElementById('scoreBoard').innerHTML = "Score: " + score;
}

function createCactus() {
	const cactus = document.createElement('div');
	let cactusPosition = 1500;
	let randomTime = Math.random() * 6000 + 700;

	if (isGameOver) return;

	cactus.classList.add('cactus');
	cactus.style.left = cactusPosition + 'px';
	background.appendChild(cactus);

	let leftInterval = setInterval(() => {
		if (cactusPosition < -60) {
			clearInterval(leftInterval);
			background.removeChild(cactus);
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			clearInterval(leftInterval);
			isGameOver = true;
			document.body.innerHTML = '<h1 id="g-over" class="game-over">Fim de jogo</h1>';
			document.getElementById('g-over').innerHTML = '<h1>Fim de jogo</h1>\nScore: ' + score;
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}
	}, 20);

	setTimeout(createCactus, randomTime);
}



createCactus();
document.addEventListener('keyup', handleKeyUp);