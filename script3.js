window.onload = function  () {
	
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		const WIDTH = 700;
		const HEIGHT = 500;
		var x = 300;
		var y = 450;
		function drawSpaceShip (e) {
			context.clearRect(0,0,WIDTH,HEIGHT);
			if (e.keyCode == 65) {
					if(x > 0) 
						x -= 5;
			}
			if (e.keyCode == 68) {
					if(x < WIDTH)
						x += 5;
			}
			if(e.keyCode == 32){
				var lasers = [];
				function drawLaser() {
					for(var i in lasers) {
						var laser = lasers[i];
						context.fillRect(laser.x, laser.y, 10,20);	
					}
				}
				function updateLaser() {
					for(var i in lasers) {
						var laser = lasers[i];
						laser.y -= 5;
					}
				}
				function addLaser() {
					lasers.push({x: x + 20, y: y - 30})
				}
				addLaser();
				function laserLoop() {
					drawLaser();
					updateLaser();
				}
				window.setInterval(laserLoop, 100);

			}
			context.fillRect(x,y,50,50);		  
		}
		window.addEventListener('keydown', drawSpaceShip, false);
}