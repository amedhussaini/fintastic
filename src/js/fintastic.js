class Fintastic {

	constructor(canvasId, windowContext, opts = {}) {
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

	setRange() {
		switch (this.opts.type) {
			case "point":
				this.priceMax = Math.max(...this.priceData);
				this.priceMin = Math.min(...this.priceData);
				break;
			case "candle":
				let max = [];
				let min = [];

				for (let value of this.priceData) {
					max.push(Math.max(...value));
					min.push(Math.min(...value));
				}

				this.priceMax = Math.max(...max);
				this.priceMin = Math.min(...min);
				break;
			default:
				break;
		}

	}

	setData(priceData) {
		this.priceData = priceData;
	}

	createGrid() {
		let verticalGrid = this.priceData.length
		var spacing = (this.canvasWidth - 10) / verticalGrid;

		for (let x = 0; x < this.priceData.length; x++) {
			let increment = x+1;
			this.ctx.beginPath();
			this.ctx.strokeStyle = "grey";
			this.ctx.lineWidth = 1;
			this.ctx.moveTo(spacing*increment, this.canvasHeight-10);
			this.ctx.lineTo(spacing*increment, 0);
			this.ctx.stroke();
			this.ctx.closePath();
		}

		let horizontalGrid = (this.priceMax - this.priceMin) + 1;

		let horizontalSpacing = (this.canvasHeight - 10) / horizontalGrid;

		for (let x = 0; x < horizontalGrid; x++) {
			console.log("testing");
			let increment = x+1;
			this.ctx.beginPath();
			this.ctx.strokeStyle = "grey";
			this.ctx.lineWidth = 1;
			this.ctx.moveTo(this.canvasWidth-10, horizontalSpacing*increment);
			this.ctx.lineTo(0, horizontalSpacing*increment);
			this.ctx.stroke();
			this.ctx.closePath();
		}

	}

	createAxis() {
		const borderPadding = 10;
		const lineWidth = 1;
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

	createBorder() {
		const lineWidth = 1;
		this.ctx.beginPath();
		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = "black";
		this.ctx.strokeRect(0,0,canvas.width,canvas.height);
		this.ctx.closePath();
	}

	convertX(index) {
		let idx = index;
		// look at grid code
		let verticalGrid = this.priceData.length
		let verticalSpacing = (this.canvasWidth - 10) / verticalGrid;
		return verticalSpacing * idx;
	}
	convertY(value) {
		let newValue = Math.abs(value - this.priceMax)
		//let idx = index + 1;
		let horizontalGrid = (this.priceMax - this.priceMin) + 1;
		let horizontalSpacing = (this.canvasHeight - 10) / horizontalGrid;
		console.log(horizontalSpacing * newValue);
		return horizontalSpacing * newValue;
	}

	drawPoint(type, x, y) {
		switch (type) {
			case "square":
					this.ctx.fillRect(x-(15/2), y-(15/2), 15, 15);
				break;
			default:
		}
	}

	draw() {
		switch (this.opts.type) {
			case "point":
				this.priceData.forEach((value, index) => {
					this.drawPoint("square", fintastic.convertX(index), fintastic.convertY(value));
				});
				break;
			case "candle":

				break;
			default:

		}
	}

}
