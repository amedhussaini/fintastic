"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fintastic = function () {
	function Fintastic(canvasId, windowContext) {
		_classCallCheck(this, Fintastic);

		this.canvas = windowContext.document.getElementById(canvasId);
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.context = this.canvas.getContext("2d");
		this.scale = 15;
		this.priceData = null;
		this.createBorder();
		this.createAxis();
		//this.drawCandleChart();
	}

	_createClass(Fintastic, [{
		key: "setData",
		value: function setData(priceData) {
			this.priceData = priceData;
		}
	}, {
		key: "createAxis",
		value: function createAxis() {
			var borderPadding = 10;
			var lineWidth = 3;

			this.context.lineWidth = lineWidth;
			this.context.strokeStyle = "black";
			this.context.moveTo(0, canvas.height - borderPadding);
			this.context.lineTo(canvas.width, canvas.height - borderPadding);
			this.context.stroke();
			this.context.lineWidth = lineWidth;
			this.context.strokeStyle = "black";
			this.context.moveTo(canvas.width - borderPadding, 0);
			this.context.lineTo(canvas.width - borderPadding, canvas.height);
			this.context.stroke();
		}
	}, {
		key: "createBorder",
		value: function createBorder() {
			var lineWidth = 1;
			this.context.lineWidth = lineWidth;
			this.context.strokeStyle = "black";
			this.context.strokeRect(0, 0, canvas.width, canvas.height);
		}
	}, {
		key: "drawCandle",
		value: function drawCandle(array, _x, _y) {

			var o = array[0];
			var h = array[1];
			var l = array[2];
			var c = array[3];
			var x = _x;
			var y = _y;

			var height = null;
			var upBar = false;
			var barWidth = 1.2 * this.scale;
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

			this.context.beginPath();

			this.context.rect(x, y, 1.2 * this.scale, height * this.scale);
			if (upBar) {
				this.context.fillStyle = "#8ED6FF";
			} else {
				this.context.fillStyle = "red";
			}
			this.context.fill();
			this.context.lineWidth = 2;
			this.context.strokeStyle = "#000";

			// draw wick

			this.context.lineWidth = 1;
			this.context.strokeStyle = "black";

			this.context.moveTo(x + barWidth / 2, y);
			if (upBar) {
				this.context.moveTo(x + barWidth / 2, y + height * this.scale);
				this.context.lineTo(x + barWidth / 2, y + height * this.scale - topWick * this.scale);
			} else {
				this.context.moveTo(x + barWidth / 2, y);
				this.context.lineTo(x + barWidth / 2, y - topWick * this.scale);
			}

			this.context.stroke();

			this.context.closePath();
		}
	}, {
		key: "drawCandleChart",
		value: function drawCandleChart() {
			var array = this.priceData;
			var points = array.length;

			//_setScale(5);
			this.setScale(10);

			var range = [];

			for (var x = 0; x < array.length; x++) {
				range.push([array[x][0]]);
				range.push([array[x][1]]);
				range.push([array[x][2]]);
				range.push([array[x][3]]);
			}

			var max = Math.max.apply(Math, range);
			var min = Math.min.apply(Math, range);

			var x_increment = this.canvas.width / array.length;
			for (var _x2 = 0; _x2 < array.length; _x2++) {

				this.drawCandle(array[_x2], _x2 * x_increment, this.canvas.height - array[_x2][2] / max * this.canvas.height);
			}
		}
	}, {
		key: "setScale",
		value: function setScale(_scale) {
			this.scale = _scale;
		}
	}]);

	return Fintastic;
}();