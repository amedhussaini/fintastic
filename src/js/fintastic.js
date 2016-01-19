var fintastic = (function(window) {

	//var privateVar = "private";
	//var public = "public";
	var canvas = null;
	var context = null;
	var canvas_width = null;
	var canvas_height = null;
	var scale = 15;

	function _setScale(_scale) {
		scale = _scale;
	}

	function setContext(id) {
		canvas = window.document.getElementById(id);
		canvas_width = canvas.width;
		canvas_height = canvas.height;
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

	function drawCandle(array, _x, _y) {

		var o = array[0];
		var h = array[1];
		var l = array[2];
		var c = array[3];
		var x = _x;
		var y = _y;

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

		var points = array.length;

		//_setScale(5);

		_setScale(10);

		var range = [];

		for (x = 0; x < array.length; x++) {
			range.push([array[x][0]]);
			range.push([array[x][1]]);
			range.push([array[x][2]]);
			range.push([array[x][3]]);
		}

		var max = Math.max.apply(Math, range);
		var min = Math.min.apply(Math, range);
		console.log(max);
		console.log(min);
		console.log(canvas_height/(max-min));

		x_increment = canvas_width/array.length;
		for (x = 0; x < array.length; x++) {

			drawCandle(array[x], ((x)*x_increment), canvas_height- ((array[x][2]) / max)*canvas_height );
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
	[100, 105, 92, 95],
	[100, 105, 92, 95],
	[95, 105, 92, 95],
	[85, 88, 78, 87],
	[35, 44, 28, 43],
	[25, 27, 19, 23],
	[45, 54, 38, 49],
	[55, 64, 54, 58],
	[55, 55, 54, 55],
	[85, 90, 75, 79],
	[100, 105, 92, 95],
	[155, 185, 100, 176]

];
fintastic.drawChart(price_data);
//fintastic.drawCandle(100, 105, 92, 95, 50, 200);
//fintastic.drawCandle(100, 105, 92, 104, 80, 200);
//fintastic.drawCandle(100, 105, 92, 104, 110, 200);
//fintastic.drawCandle(94, 125, 75, 125, 140, 250);