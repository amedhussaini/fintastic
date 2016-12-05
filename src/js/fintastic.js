class Fintastic {

	constructor(canvasId, windowContext) {
		this.canvas = windowContext.document.getElementById(canvasId);
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.context = this.canvas.getContext("2d");
		this.scale = 15;
		this.priceData = null;
		this.createBorder();
		this.createAxis();

	}

	setData(priceData) {
		this.priceData = priceData;
	}

	createAxis() {
		const borderPadding = 10;
		const lineWidth = 3;

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

	createBorder() {
		const lineWidth = 1;

		this.context.lineWidth = lineWidth;
		this.context.strokeStyle = "black";
		this.context.strokeRect(0,0,canvas.width,canvas.height);
	}

	drawCandle(array, _x, _y) {

		let o = array[0];
		let h = array[1];
		let l = array[2];
		let c = array[3];
		let x = _x;
		let y = _y;

		let height = null;
		let upBar = false;
		let barWidth = 1.2*this.scale;
		let topWick = null;
		let bottomWick = null;

		if (o > c) {

			height = o - c;
			topWick = h - o;

		} else if (c > o) {

			height = o - c;
			upBar = true;
			topWick = h - c;

		}

		this.context.beginPath();

		this.context.rect(x, y, 1.2*this.scale, height*this.scale);
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

		this.context.moveTo(x+(barWidth/2), y);
		if (upBar) {
			this.context.moveTo(x+(barWidth/2), (y+height*this.scale));
			this.context.lineTo(x+(barWidth/2), (y+height*this.scale)-topWick*this.scale);
		} else {
			this.context.moveTo(x+(barWidth/2), y);
			this.context.lineTo(x+(barWidth/2), y-topWick*this.scale);
		}

		this.context.stroke();

		this.context.closePath();

	}


	drawCandleChart(priceData) {
		this.setData(priceData);
		var points = this.priceData.length;

		this.setScale(15);

		var range = [];

		for (let x = 0; x < this.priceData.length; x++) {
			range.push([this.priceData[x][0]]);
			range.push([this.priceData[x][1]]);
			range.push([this.priceData[x][2]]);
			range.push([this.priceData[x][3]]);
		}

		var max = Math.max.apply(Math, range);
		var min = Math.min.apply(Math, range);


		let x_increment = this.canvas.width/this.priceData.length;
		for (let x = 0; x < this.priceData.length; x++) {

			this.drawCandle(this.priceData[x], ((x)*x_increment), this.canvas.height- ((this.priceData[x][2]) / max)*this.canvas.height );
		}

	}

	setScale(_scale) {
		this.scale = _scale;
	}

}
