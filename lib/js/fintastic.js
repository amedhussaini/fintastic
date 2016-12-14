"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fintastic = function () {
	function Fintastic(canvasId, windowContext) {
		var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Fintastic);

		this.opts = opts;
		this.canvas = windowContext.document.getElementById(canvasId);
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
		this.priceData = opts.data;
		this.priceMax = null;
		this.priceMin = null;
		this.createBorder();
		this.createAxis();
		this.setRange();
		this.createGrid();
	}

	_createClass(Fintastic, [{
		key: "setRange",
		value: function setRange() {
			switch (this.opts.type) {
				case "point":
					this.priceMax = Math.max.apply(Math, _toConsumableArray(this.priceData));
					this.priceMin = Math.min.apply(Math, _toConsumableArray(this.priceData));
					break;
				case "candle":
					var max = [];
					var min = [];

					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.priceData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var value = _step.value;

							max.push(Math.max.apply(Math, _toConsumableArray(value)));
							min.push(Math.min.apply(Math, _toConsumableArray(value)));
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					this.priceMax = Math.max.apply(Math, max);
					this.priceMin = Math.min.apply(Math, min);
					break;
				default:
					break;
			}
		}
	}, {
		key: "setData",
		value: function setData(priceData) {
			this.priceData = priceData;
		}
	}, {
		key: "createGrid",
		value: function createGrid() {
			var verticalGrid = this.priceData.length;
			var spacing = (this.canvasWidth - 10) / verticalGrid;

			for (var x = 0; x < this.priceData.length; x++) {
				var increment = x + 1;
				this.ctx.beginPath();
				this.ctx.strokeStyle = "grey";
				this.ctx.lineWidth = 1;
				this.ctx.moveTo(spacing * increment, this.canvasHeight - 10);
				this.ctx.lineTo(spacing * increment, 0);
				this.ctx.stroke();
				this.ctx.closePath();
			}

			var horizontalGrid = this.priceMax - this.priceMin + 1;

			var horizontalSpacing = (this.canvasHeight - 10) / horizontalGrid;

			for (var _x2 = 0; _x2 < horizontalGrid; _x2++) {
				console.log("testing");
				var _increment = _x2 + 1;
				this.ctx.beginPath();
				this.ctx.strokeStyle = "grey";
				this.ctx.lineWidth = 1;
				this.ctx.moveTo(this.canvasWidth - 10, horizontalSpacing * _increment);
				this.ctx.lineTo(0, horizontalSpacing * _increment);
				this.ctx.stroke();
				this.ctx.closePath();
			}
		}
	}, {
		key: "createAxis",
		value: function createAxis() {
			var borderPadding = 10;
			var lineWidth = 1;
			this.ctx.beginPath();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = "blue";
			this.ctx.moveTo(0, canvas.height - borderPadding);
			this.ctx.lineTo(canvas.width - borderPadding, canvas.height - borderPadding);
			this.ctx.stroke();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = "blue";
			this.ctx.moveTo(canvas.width - borderPadding, 0);
			this.ctx.lineTo(canvas.width - borderPadding, canvas.height - borderPadding);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}, {
		key: "createBorder",
		value: function createBorder() {
			var lineWidth = 1;
			this.ctx.beginPath();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = "black";
			this.ctx.strokeRect(0, 0, canvas.width, canvas.height);
			this.ctx.closePath();
		}
	}, {
		key: "convertX",
		value: function convertX(index) {
			var idx = index;
			// look at grid code
			var verticalGrid = this.priceData.length;
			var verticalSpacing = (this.canvasWidth - 10) / verticalGrid;
			return verticalSpacing * idx;
		}
	}, {
		key: "convertY",
		value: function convertY(value) {
			var newValue = Math.abs(value - this.priceMax);
			//let idx = index + 1;
			var horizontalGrid = this.priceMax - this.priceMin + 1;
			var horizontalSpacing = (this.canvasHeight - 10) / horizontalGrid;
			console.log(horizontalSpacing * newValue);
			return horizontalSpacing * newValue;
		}
	}, {
		key: "drawPoint",
		value: function drawPoint(type, x, y) {
			switch (type) {
				case "square":
					this.ctx.fillRect(x - 15 / 2, y - 15 / 2, 15, 15);
					break;
				default:
			}
		}
	}, {
		key: "draw",
		value: function draw() {
			var _this = this;

			switch (this.opts.type) {
				case "point":
					this.priceData.forEach(function (value, index) {
						_this.drawPoint("square", fintastic.convertX(index), fintastic.convertY(value));
					});
					break;
				case "candle":

					break;
				default:

			}
		}
	}]);

	return Fintastic;
}();