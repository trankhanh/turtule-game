window.onload = function() {
	var x = 300;
	var y = 450;
	var d = 10;
	const WIDTH = 700;
	const HEIGHT = 500;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	var lasers = [];
	function drawLaser() {
		for(var i in lasers) {
			var laser = lasers[i];
			context.fillRect(laser.x, laser.y, 10, 30);
		}
	}
	function updateLaser() {
		for(var i in lasers) {
			var laser = lasers[i];
			laser.y -= 2;
		}
	}
	function fireLaser() {
		lasers.push({x: spaceShip.x + 20, y: spaceShip.y - 50});
	}
	var spaceShip = {
		x: 300,
		y: 450,
	}
	function drawSpaceShip () {
			context.clearRect(0,0,WIDTH,HEIGHT);
			context.fillRect(spaceShip.x,spaceShip.y,50,50);
	}
	function updateShaceShip() {
			if(keyboard[65] && spaceShip.x > 0){
				spaceShip.x -= 10;
			}
			if(keyboard[68] && spaceShip.x < WIDTH){
				spaceShip.x += 10;
			}
			
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
	var keyboard = {};
	function addKeyboardEvent() {
		addEvent(document, 'keydown', function(e){keyboard[e.keyCode]=true}); //tomorrow debate
		addEvent(document, 'keyup', function(e){keyboard[e.keyCode]=false}); //tomorrow debate
	}
	function addEvent(node, name, func){
		if(node.addEventListener){
			node.addEventListener(name, func);
		}
		if(node.attachEvent) {
			node.attachEvent(name, func);
		}
	}
	addKeyboardEvent();

	function gameLoop() {
			drawSpaceShip();
			updateShaceShip();
			drawLaser();
			updateLaser();
			
	}


	window.setInterval(gameLoop, 1000/60);
}