window.onload = function() {
	var x = 300;
	var y = 450;
	var d = 10;
	const WIDTH = 700;
	const HEIGHT = 500;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	function drawSpaceShip () {
			//context.fillStyle = "#000";
			context.clearRect(0,0,WIDTH,HEIGHT);
			context.fillRect(x,y,50,50);
	}
	function updateShaceShip() {
			
	}
	var lasers = [];
	function addLaser() {
			return {
				x: x,
				y: y,				
			}
	}
	function drawLaser(){
		for(var i in lasers) {
			var laser = lasers[i];
			context.fillRect(laser.x + 20, laser.y -20, 10, 30);
		}
	}
	function updateLaser () {
	  		for(var i in lasers) {
	  			var laser = lasers[i];
	  			laser.y -= 3;
	  		}
	}
	function keyDown(evt) {
			switch(evt.keyCode){
				case 68: 
				case 39:
					if(x < WIDTH - 50){
						x += 50;
					}
				break;
				case 65:
				case 37:
					if(x > 0) {
						x -= 50;
					}
				break;
			}
	}
	// function keyDown2(evt) {
			// switch(evt.keyCode){
				// case 32:
					// lasers.push(addLaser());
				// break;
			// }
	// }
	// Debate
	
	function gameLoop() {
			drawSpaceShip();
			updateShaceShip();
			drawLaser();
			updateLaser();
			
	}
	function drawLine() {
		for(i =1; i < 30; i++){
			context.beginPath();
			context.moveTo(50*i, 0);
			context.lineTo(50*i,500);
			context.stroke();
			context.closePath();
		}	
	}

	window.addEventListener('keydown', keyDown, false);
	//window.addEventListener('keydown', keyDown2, false);
	window.setInterval(gameLoop, 10);
	//window.setInterval(drawLine, 1);

}