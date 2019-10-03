import RulerRenderer from './ruler-renderer';
import { IExtent } from '../../interfaces/extent';
import { IRulerStyle } from '../../interfaces/ruler-style';
import { ISegment } from '../../interfaces/segment';
import { RulerType } from '../../enums/ruler-type';

export class ScaleNavigator {

    extent: IExtent;
    power: number;
    segments: Array<ISegment>;
    renderer: RulerRenderer;

    constructor(private target: HTMLElement, private map?: any) {

        this.extent = { from: -110, to: 110, get range() { return this.to - this.from } };
        this.segments = new Array();
        this.renderer = new RulerRenderer(this.target);

        this.initSegments();
        target.addEventListener('wheel', this.scroll)
    }


    scroll = (e: WheelEvent) => {

        let section = this.extent.range / 50 * Math.sign(e.deltaY);
        this.extent.from -= section;
        this.extent.to += section;

        this.power = Math.pow(10, Math.floor(Math.log10(this.extent.range)));
        this.initSegments();
    }

    initSegments() {

        let width = this.target.clientWidth;
        this.segments = this.buildRuler(this.extent, width);
        this.renderer.draw(this.segments, this.getRulerStyle());
    }

    buildRuler = (extent: IExtent, width: number) => {

        let result = new Array();
        let slope = (x: number) => (x - extent.from) * (width / extent.range);
        let offset = extent.from % this.power;

        for (let value = extent.from - offset - this.power; value < extent.to - offset + this.power; value += (this.power / 10))
            result.push({ value: value, position: slope(value), type: this.getRulerType(value) });

        return result;
    }

    getRulerType(value: number): RulerType {
        
        let type = RulerType.Deci;

        if (value % this.power === 0)
            type = RulerType.Full;
        else if (value % (this.power / 2) == 0)
            type = RulerType.Semi;

        return type;
    }

    getRulerStyle(): IRulerStyle {

        let powerOffset = Math.log10(this.extent.range);

        return {
            full: { height: 12, opacity: 1 },
            semi: { height: 8, opacity: 1 - Math.pow(powerOffset % 1, 3) },
            // ((2 * x - 1)^2)
            deci: { height: 5, opacity: powerOffset > .5 ? Math.pow(2 * ((Math.log10(this.extent.range) % 1) - 1), 2) : 0 }
        }
    }
}