 
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var spaceship = {
	x: 100,
	y: 300,
	width: 50,
	height: 50,
	counter: 0
};
var lasers = [];

var invaders = [];
var invaderMissiles = [];

var keyboard = {};

var game = {
	state: "start"
};
var textOverlay = {
	title: '',
	subtitle: '',
	x: 200,
	y: 200,
	alpha: 0,
}

/**********************************************************************************/
/*
 * Background #1
 */
function updateBackground() {
	if(game.state == 'over') {
		textOverlay.title = 'Game Over!',
		textOverlay.subtitle = 'Press Spacebar to replay',
		context.fillStyle = '#fff';
		context.font = '30px Arial';
		textOverlay.alpha += .05;
		context.globalAlpha = textOverlay.alpha;
		context.fillText(textOverlay.title, textOverlay.x, textOverlay.y);
		context.fillText(textOverlay.subtitle, textOverlay.x - 50, textOverlay.y + 50);
		context.globalAlpha = 1;
	}
	if(game.state == 'won') {
		textOverlay.title = 'Win!',
		textOverlay.subtitle = 'Press Spacebar to replay',
		context.fillStyle = '#fff';
		context.font = '30px Arial';
		textOverlay.alpha += .05;
		context.globalAlpha = textOverlay.alpha;
		context.fillText(textOverlay.title, textOverlay.x, textOverlay.y);
		context.fillText(textOverlay.subtitle, textOverlay.x - 50, textOverlay.y + 50);
		context.globalAlpha = 1;	
	}
}
function drawBackground() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}
/**********************************************************************************/
/*
 * Update game state
 */
function updateGame() {
	// if(spaceship.state == 'alive') {
		// game.state = 'playing';
	// }
	if(spaceship.state == 'hit') {
		
	}
	if(spaceship.state == 'dead') {
		game.state = 'over';
	}
	if(game.state == 'playing' && invaders.length == 0){
		game.state ='won';
		
	}
	if(((game.state == 'over') || (game.state == 'won')) && keyboard[32]) {
		invaders = [];
		spaceship.state = 'alive';
		invaderMissiles = [];
		lasers = [];
		game.state = 'start';
	}
}
/*
 * Spaceship #2
 */
function updateSpaceship() {
	if (spaceship.state === 'dead') {
		return;
	}
	// move left
	if(keyboard[37]) {
		spaceship.x -= 10;
		if(spaceship.x < 0) {
			spaceship.x = 0;
		}
	}
	// move right
	if(keyboard[39]) {
		spaceship.x += 10;
		var right = canvas.width - spaceship.width;
		if(spaceship.x > right) {
			spaceship.x = right;
		}
	}
	// spacebar pressed
	if(keyboard[32]) {
		// only fire one laser
		if(!keyboard.fired) {
			fireLaser();
			keyboard.fired = true;
		} else {
			keyboard.fired = false;
		}
	}
	if(spaceship.state == 'hit') {
		if(spaceship.counter > 20) {
			spaceship.state = 'dead';
		}
	}
	spaceship.counter++;

}

function drawSpaceship() {
	if(spaceship.state === "dead") {
		return;
	}
	if(spaceship.state === "hit") {
		context.fillStyle = "blue";
		context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
		return;
	}
	context.fillStyle = "white";
	context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}
/***********************************************************************************/
/*
 * Laser #3
 */
function updateLasers() {
	// move the laser
	for(var iter in lasers) {
		var laser = lasers[iter];
		laser.y -= 2;
		laser.counter++;
	}
	// remove lasers that are off the screen
	lasers = lasers.filter(function(laser) {
		return laser.y > 0;
	});
}

function drawLasers() {
context.fillStyle = "white";
	for(var iter in lasers) {
		var laser = lasers[iter];
		context.fillRect(laser.x, laser.y, laser.width, laser.height);
	}
}

function fireLaser() {
	lasers.push ({
		x: spaceship.x + 20, //offset
		y: spaceship.y - 10,
		width: 5,
		height: 30
	});
}
/***********************************************************************************/
/*
 * Event #4
 */
function addKeyboardEvents() {
	addEvent(document, "keydown", function(e) {
		keyboard[e.keyCode] = true;
	});
	addEvent(document, "keyup", function(e) {
		keyboard[e.keyCode] = false;
	});
}
function addEvent(node, name, func) {
	if(node.addEventListener) {
		node.addEventListener(name, func, false);
	} else if(node.attachEvent) {
		// handle Microsoft browsers too
		node.attachEvent(name, func);
	}
}

/***********************************************************************************/

function drawInvaders() {
	for(var iter in invaders) {
		var invader = invaders[iter];
		if(invader.state == "alive") {
			context.fillStyle = "red";
		}
		if(invader.state == "hit") {
			context.fillStyle = "purple";
		}
		if(invader.state == "dead") {
			context.fillStyle = "white"; //unimportant cause invaders has been filterd by updateInvaders() function
		}
		context.fillRect(invader.x, invader.y, invader.width, invader.height);
	}
}

function updateInvaders() {
	// populate invaders array
	if(game.state === "start") {
		for(var iter = 0; iter < 10; iter++) {
			invaders.push({
				x: 10 + iter * 50,
				y: 10,
				height: 40,
				width: 40,
				phase: Math.floor(Math.random() * 50),
				counter: 0,
				state: "alive"
			});
		}
		game.state = "playing"
	}
	for(var iter in invaders) {
		var invader = invaders[iter];
		if(!invader) {
			continue;
		}
		if(invader && invader.state === "alive") {
			invader.counter++;
			invader.x += Math.sin(invader.counter * Math.PI * 2 / 100) * 3;
			// fire every
			if((invader.counter + invader.phase) % 200 === 0) {
				invaderMissiles.push(addInvaderMissile(invader));
			}
		}
		if(invader && invader.state === "hit") {
			invader.counter++;
			// change state to dead to be cleaned up
			if(invader.counter >= 20) {
				invader.state = "dead";
				invader.counter = 0;
			}
		}
	}
	
	invaders = invaders.filter(function(event) {
		if(event && event.state !== "dead") { return true; }
		return false;
	});
}


/***********************************************************************************/

function updateInvaderMissiles() {
	for(var iter in invaderMissiles) {
		var laser = invaderMissiles[iter];
		laser.y += 3;
		laser.counter++;
	}
}

function drawInvaderMissiles() {
	for(var iter in invaderMissiles) {
		var laser = invaderMissiles[iter];
		var xoffset = (laser.counter % 9) * 12 + 1;
		var yoffset = 1;
		context.fillStyle = "yellow";
		context.fillRect(laser.x, laser.y, laser.width, laser.height);
	}
}

function addInvaderMissile(invader){
	return {
		x: invader.x,
		y: invader.y,
		width: 10,
		height: 33,
		counter: 0
	}
}

/***********************************************************************************/
function checkHits() {
	for(var iter in lasers) {
		var laser = lasers[iter];
		for(var inv in invaders) {
			var invader = invaders[inv];
			if(hit(laser, invader)) {
				laser.state = "hit";
				invader.state = "hit";
				invader.counter = 0;
			}
		}
	}
	// check for enemy hits on the spaceship
	if(spaceship.state == "hit" || spaceship.state == "dead") {
		return;
	}
	for(var iter in invaderMissiles) {
		var missle = invaderMissiles[iter];
		if(hit(missle, spaceship)) {
			missle.state = "hit";
			spaceship.state = "hit";
			spaceship.counter = 0;
		}
	}
}


function hit(a, b) {
	var hit = false;
	// horizontal collisions
	if(b.x + b.width >= a.x && b.x < a.x + a.width) {
		// vertical collision
		if(b.y + b.height >= a.y && b.y < a.y + a.height) {
			hit = true;
		}
	}
	// a in b
	if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
		if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
			hit = true;
		}
	}
	// b in a
	if(a.x <= b.x && a.x + a.width >= b.x + b.width) {
		if(a.y <= b.y && a.y + a.height >= b.y + b.height) {
			hit = true;
		}
	}
	return hit;
}

/***********************************************************************************/

function gameLoop() {
	updateGame();
	drawBackground();
	updateBackground();
	checkHits();
	updateInvaders();
	updateSpaceship();
	
	drawInvaders();

	drawSpaceship();
	drawLasers();
	updateLasers();
	drawInvaderMissiles();
	updateInvaderMissiles();

}

addKeyboardEvents();
setInterval(gameLoop, 1000 / 60);


