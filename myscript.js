 
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var spaceship = {
	x: 100,
	y: 300,
	width: 50,
	height: 50,
	counter: 0
};



function drawBackground() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSpaceship() {
	context.fillStyle = "white";
	context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

var keyboard = {};
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


var lasers = []; // array holding the lasers
function drawLasers() {
context.fillStyle = "white";
	for(var iter in lasers) {
		var laser = lasers[iter];
		context.fillRect(laser.x, laser.y, laser.width, laser.height);
	}
}
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
function fireLaser() {
	lasers.push ({
		x: spaceship.x + 20, //offset
		y: spaceship.y - 10,
		width: 10,
		height: 30
	});
}
function updateSpaceship() {
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
}
var game = {
	state: "start"
};
var invaders = [];
function drawInvaders() {
	for(var iter in invaders) {
		var invader = invaders[iter];
		context.fillStyle = "red";
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
		if(invader && invader.state == "alive") {
			invader.counter++;
			invader.x += Math.sin(invader.counter * Math.PI * 2 / 200) * 1.5;
		}
	}
}



function gameLoop() {
	drawBackground();

	updateInvaders();
	updateSpaceship();
	
	drawInvaders();

	drawSpaceship();
	drawLasers();
	updateLasers();	
}

addKeyboardEvents();
setInterval(gameLoop, 1000 / 60);


