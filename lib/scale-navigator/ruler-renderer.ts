import * as numeral from 'numeral';
import { ISegment } from '../../interfaces/segment';
import { IRulerStyle, IStyle } from '../../interfaces/ruler-style';
import { RulerType } from '../../enums/ruler-type';


export default class RulerRenderer {

	context: CanvasRenderingContext2D;

	constructor(private target: HTMLElement) {

		let canvas = document.createElement('canvas') as HTMLCanvasElement;
		canvas.width = target.clientWidth * 2;
		canvas.height = target.clientHeight * 2;
		canvas.style.width = target.clientWidth + 'px';
		canvas.style.height = target.clientHeight + 'px';
		target.appendChild(canvas);
		this.context = canvas.getContext('2d');
		this.context.scale(2, 2);
	}

	draw(segments: Array<ISegment>, rulerStyle: IRulerStyle) {

		this.clearCanvas();

		let full = segments.filter(s => s.type == RulerType.Full);
		this.setRulerStyle(rulerStyle.full);
		this.drawRuler(full);

		let semi = segments.filter(s => s.type == RulerType.Semi);
		this.setRulerStyle(rulerStyle.semi);
		this.drawRuler(semi);

		let deci = segments.filter(s => s.type == RulerType.Deci);
		this.setRulerStyle(rulerStyle.deci);
		this.drawRuler(deci);
	}

	setRulerStyle(style: IStyle) {

		let ctx = this.context;
		ctx.strokeStyle = `rgba(0, 0, 0, ${ style.opacity })`;
	}

	drawRuler(segments: Array<ISegment>) {

		let height = 50;
		let ctx = this.context;
		ctx.font = '10px monospace';

		ctx.lineWidth = 1;
		ctx.beginPath();

		segments.forEach(segment => {
			ctx.moveTo(segment.position - .5, height);
			ctx.lineTo(segment.position - .5, height + 10);
			// this.renderCaption(segment.value, segment.position, ctx);
		});

		ctx.stroke();
	}

	renderCaption(value: number, position: number, ctx: CanvasRenderingContext2D) {

		let unsigned = Math.abs(value);
		let displayValue = numeral(value).format('0a');
		let displayValueUnsigned = numeral(unsigned).format('0a');
		let displayWidth = ctx.measureText(displayValue).width;
		let unsignedDisplayWidth = ctx.measureText(displayValueUnsigned).width;

		ctx.fillText(displayValue, position - .5 - (displayWidth / 2) - ((displayWidth - unsignedDisplayWidth) / 2) , 50 + 20);
	}

	clearCanvas() {
		this.context.clearRect(0, 0, this.target.clientWidth, this.target.clientHeight)
	}
}