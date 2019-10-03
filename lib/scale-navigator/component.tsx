import * as React from 'react';
import RulerRenderer from './ruler-renderer';

interface IProps {
    map?: any
}

interface IExtent {
    from: number;
    to: number;
    range: number;
}

export enum Ruler {
    Full,
    Half,
    Tenth
}

export interface ISegment {
    position: number;
    type: Ruler;
}

interface IState {
    factor: number;
    extent: IExtent;
    segments: Map<number, ISegment>;
}

export class ScaleNavigator {

    private state: IState;
    private renderer: RulerRenderer;

    constructor(private target: HTMLElement, private map?: any) {

        this.state = {
            factor: 1,
            extent: { from: -110, to: 110, get range() { return this.to - this.from } },
            segments: new Map()
        }

        this.renderer = new RulerRenderer(this.target);

        this.initSegments();

        window.addEventListener('keydown', (ev) => {
            if (ev.keyCode == 187)
                (this.scroll as any)({ deltaY: 1 });
            else if (ev.keyCode == 189)
                (this.scroll as any)({ deltaY: -1 });
        });

        target.addEventListener('wheel', this.scroll)
    }


    scroll = (e: WheelEvent) => {

        let extent = this.state.extent;
        let section = extent.range / 100 * Math.sign(e.deltaY);
        extent.from -= section;
        extent.to += section;
        this.initSegments();
    }

    initSegments = () => {

        let extent = this.state.extent;
        let width = this.target.clientWidth;
        this.ruler(this.state.segments, extent, width);
        this.renderer.drawRuler(this.state.segments);
    }

    ruler = (segments: Map<number, ISegment>, extent: IExtent, width: number) => {

        let usedKeys = [];
        let slope = (x: number) => (x - extent.from) * (width / extent.range);

        let adf = (power: number, value: number): Ruler => {
            if (value % power === 0)
                return Ruler.Full;
            else if (value % (power / 2) == 0)
                return Ruler.Half;

            return Ruler.Tenth;
        }
        let power = Math.pow(10, Math.floor(Math.log10(extent.range)));
        let offset = extent.from % power;

        for (let i = extent.from - offset; i < extent.to - offset + power; i += (power / 10)) {
            segments.set(i, { position: slope(i), type: adf(power, i) });
            usedKeys.push(i);
        }

        // Drop unused entries
        [...segments.keys()].filter(s => !usedKeys.includes(s)).map(d => segments.delete(d));
    }
}