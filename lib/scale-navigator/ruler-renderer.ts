import { ISegment } from "./component";

export default class RulerRenderer {

	context: CanvasRenderingContext2D;

	constructor(private target: HTMLElement) {

		let canvas = document.createElement('canvas') as HTMLCanvasElement;
		canvas.width = target.clientWidth;
		canvas.height = target.clientHeight;
		target.appendChild(canvas);
		this.context = canvas.getContext('2d');
	}

	drawRuler(segments: Map<number, ISegment>) {

		let height = 100;
		let ctx = this.context;
		ctx.font = "10px Arial";

		this.clearCanvas();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.beginPath();

		segments.forEach((segment, value) => {
			ctx.moveTo(segment.position, height);
			ctx.lineTo(segment.position, height + 10);
			ctx.fillText(value.toFixed(0), segment.position - ctx.measureText(value.toFixed(0)).width / 2, height + 20);
		});

		ctx.stroke();
	}

	clearCanvas() {
		this.context.clearRect(0, 0, this.target.clientWidth, this.target.clientHeight)
	}
}