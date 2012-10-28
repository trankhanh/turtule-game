window.onload = function () {
  
  
var canvas = document.getElementById('canvas');
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

function gameLoop() {
	updateSpaceship();
	drawBackground();
	drawSpaceship();
	drawLasers();
	updateLasers();
	
}
addKeyboardEvents();
setInterval(gameLoop, 1000 / 60);




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



}
