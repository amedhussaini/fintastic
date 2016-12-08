class Fintastic {

	constructor(canvasId, windowContext, opts = {}) {
		this.canvas = windowContext.document.getElementById(canvasId);
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
		this.priceData = opts.data;
		this.createBorder();
		this.createAxis();
	}

	setData(priceData) {
		this.priceData = priceData;
	}

	createGrid() {
		let piecesOfData = this.priceData.length
		var spacing = this.canvasWidth / piecesOfData;

		for (let x = 0; x < piecesOfData; x++) {
			ctx.beginPath();
			ctx.moveTo(spacing, this.canvasHeight);
			ctx.lineTo(spacing, 0);
			ctx.stroke();
		}
	}

	createAxis() {
		const borderPadding = 10;
		const lineWidth = 3;

		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = "black";
		this.ctx.moveTo(0, canvas.height - borderPadding);
		this.ctx.lineTo(canvas.width, canvas.height - borderPadding);
		this.ctx.stroke();
		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = "black";
		this.ctx.moveTo(canvas.width - borderPadding, 0);
		this.ctx.lineTo(canvas.width - borderPadding, canvas.height);
		this.ctx.stroke();
	}

	createBorder() {
		const lineWidth = 1;

		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = "black";
		this.ctx.strokeRect(0,0,canvas.width,canvas.height);
	}

}
