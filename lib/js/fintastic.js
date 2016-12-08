"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fintastic = function () {
	function Fintastic(canvasId, windowContext) {
		var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Fintastic);

		this.canvas = windowContext.document.getElementById(canvasId);
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.context = this.canvas.getContext("2d");
		this.scale = 15;
		this.priceData = null;
		this.createBorder();
		this.createAxis();
		console.log(opts);
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
	}]);

	return Fintastic;
}();