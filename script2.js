window.onload = function() {
	var x = 300;
	var y = 450;
	const WIDTH = 700;
	const HEIGHT = 500;
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
	
	// Step 1: draw spaceShip
	// Step 2: update spaceShip
	// Step 3: draw laser
	// Step 4: update Laser

	var keyboard = {};
	var spaceShip = {
		x: x,
		y: y,
	}
	function drawBg() {
		context.fillStyle = "#000";
		context.fillRect(0, 0 , WIDTH, HEIGHT);
	}
	function drawSpaceShip() {
		context.clearRect(0, 0, WIDTH, HEIGHT);
		drawBg();
		context.fillStyle = "#fff";
		context.fillRect(spaceShip.x, spaceShip.y, 50, 50);		
	}
	function updateSpaceShip() {
		if(keyboard[65]) {
			if(spaceShip.x > 0) {
				spaceShip.x -= 10;
			} 
		}
		if(keyboard[68]) {
			if(spaceShip.x < WIDTH - 30) {
				spaceShip.x += 10;
			} 
		}
		if(keyboard[32]) {
			if(!keyboard.fired) {
				fireLaser();
				keyboard.fired = true;
			} else {
				keyboard.fired = false;
			}
		}
	}
	
	var lasers = [];
	function drawLaser () {
		for(var i in lasers) {
			var laser = lasers[i];
			context.fillRect(laser.x, laser.y, 5, 10);
		}	  
	}
	function fireLaser() {
		lasers.push({x: spaceShip.x + 20, y: spaceShip.y - 20});
	}

	function updateLaser () {
		for(i in lasers) {
			var laser = lasers[i];
			laser.y -= 5;
		}
	  
	}
	
	function addKeyboardEvt() {
		addEvt(document, 'keydown', function(e) { keyboard[e.keyCode] = true;});
		addEvt(document, 'keyup', function(e) { keyboard[e.keyCode] = false;});
	}
	function addEvt(node, name, func) {
		if(node.addEventListener){
			node.addEventListener(name, func);
		}
		if(node.attachEvent) {
			node.attachEvent(name, func);
		}
	}
	addKeyboardEvt();
	function gameLoop(){
		drawSpaceShip();
		updateSpaceShip();
		drawLaser();
		updateLaser();

	}
	window.setInterval(gameLoop, 1000/60);
}
