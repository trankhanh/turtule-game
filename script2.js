	var x = 300;
	var y = 350;
	const WIDTH = 600;
	const HEIGHT = 400;
	var canvas = document.getElementById("game");
	var context = canvas.getContext('2d');
	
	// Step 1: draw spaceship
	// Step 2: update spaceship
	// Step 3: draw laser
	// Step 4: update Laser
	var spaceship = {
		x: 100,
		y: 300,
		width: 50,
		height: 50,
	}

	function drawBackground() {
		context.fillStyle = "#000";
		context.fillRect(0, 0 , WIDTH, HEIGHT);
	}
	function drawSpaceship() {
		// context.clearRect(0, 0, WIDTH, HEIGHT);

		context.fillStyle = "#fff";
		context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);		
	}
	var keyboard = {};
	
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
	
	var lasers = [];
	function drawLasers () {
		for(var i in lasers) {
			var laser = lasers[i];
			context.fillRect(laser.x, laser.y, laser.width, laser.height);
		}	  
	}
	function updateLasers () {
		for(i in lasers) {
			var laser = lasers[i];
			laser.y -= 2;
			laser.counter++;
		}
		
		// remove lasers that are off the screen
		lasers = lasers.filter(function(laser) {
			return laser.y > 0;
		});
	  
	}
	function fireLaser() {
		lasers.push({
			x: spaceship.x + 20, //offset
			y: spaceship.y - 10,
			width: 10,
			height: 30
		});
	}


	
	function updateSpaceship() {
		
		// if(keyboard[32]) {
			// if(!keyboard.fired) {
				// fireLaser();
				// keyboard.fired = true;
			// } else {
				// keyboard.fired = false;
			// }
		// }
		// if(keyboard[65]) {
			// if(spaceship.x > 0) {
				// spaceship.x -= 10;
			// } 
		// }
		// if(keyboard[68]) {
			// if(spaceship.x < WIDTH - 30) {
				// spaceship.x += 10;
			// } 
		// }
		
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
	

	


	function gameLoop(){
		drawBackground();

		updateSpaceship();
		drawSpaceship();
		drawLasers();
		updateLasers();
		
			// updateSpaceship();
			// drawBackground();
			// drawSpaceship();
			// drawLasers();
			// updateLasers();	

	}
		addKeyboardEvt();
	window.setInterval(gameLoop, 1000/60);
