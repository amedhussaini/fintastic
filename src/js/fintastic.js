var fintastic = (function(window) {

	//var privateVar = "private";
	//var public = "public";
	var canvas = null;
	var context = null;
	var scale = 15;

	function setContext(id) {
		canvas = window.document.getElementById(id);
		context = canvas.getContext("2d");
	}

	function drawAxis() {
		context.lineWidth = 1;
		context.strokeStyle = "black";
		context.moveTo(0, canvas.height - 10);
		context.lineTo(canvas.width, canvas.height - 10);
		context.stroke();
		context.lineWidth = 1;
		context.strokeStyle = "black";
		context.moveTo(canvas.width - 10, 0);
		context.lineTo(canvas.width - 10, canvas.height);
		context.stroke();
	}

	function drawCandle(array) {

		var o = array[0];
		var h = array[1];
		var l = array[2];
		var c = array[3];
		var x = array[4];
		var y = array[5];

		var height = null;
		var upBar = false;
		var barWidth = 1.2*scale;
		var topWick = null;
		var bottomWick = null;

		if (o > c) {

			height = o - c;
			topWick = h - o;

		} else if (c > o) {

			height = o - c;
			upBar = true;
			topWick = h - c;

		}

		context.beginPath();

		context.rect(x, y, 1.2*scale, height*scale);
		if (upBar) {
			console.log("im reallyt here");
			context.fillStyle = "#8ED6FF";
       	} else {
       		console.log("im here");
			context.fillStyle = "red";
       	}
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = "#000";


		// draw wick

		context.lineWidth = 1;
		context.strokeStyle = "black";

		context.moveTo(x+(barWidth/2), y);
		if (upBar) {
			context.moveTo(x+(barWidth/2), (y+height*scale));
			context.lineTo(x+(barWidth/2), (y+height*scale)-topWick*scale);
		} else {
			context.moveTo(x+(barWidth/2), y);
			context.lineTo(x+(barWidth/2), y-topWick*scale);
		}

		context.stroke();

		context.closePath();

	}

	function drawCandleChart(array) {

		for (x = 0; x < array.length; x++) {

			drawCandle(array[x]);
		}

	}

	return {
		setContext: setContext,
		drawAxis: drawAxis,
		drawCandle: drawCandle,
		drawChart: drawCandleChart
	};


})(window);

fintastic.setContext("canvas");
fintastic.drawAxis();
price_data = [
	[100, 105, 92, 95, 50, 200],
	[100, 105, 92, 95, 80, 200],
	[100, 105, 92, 95, 110, 200],
	[100, 105, 92, 95, 140, 200],
	[100, 105, 92, 95, 170, 200],
	[100, 105, 92, 95, 200, 200],

];
fintastic.drawChart(price_data);
//fintastic.drawCandle(100, 105, 92, 95, 50, 200);
//fintastic.drawCandle(100, 105, 92, 104, 80, 200);
//fintastic.drawCandle(100, 105, 92, 104, 110, 200);
//fintastic.drawCandle(94, 125, 75, 125, 140, 250);