import * as React from 'react';
import { RulerSegment } from '../ruler-segment/component';

interface IProps {
    map?: any
}

interface IExtent {
    from: number; 
    to: number; 
    range: number;
}

interface ISegment {
    position: number;
    value: number;
}

interface IState {
    factor: number;
    extent: IExtent;
    segments: Map<number, number>;
}

export class ScaleNavigator extends React.Component<IProps, IState> {

    private target: React.RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);

        this.state = {
            factor: 1,
            extent: { from: -100, to: 100, get range() { return this.to - this. from } },
            segments: new Map()
        }

        this.target = React.createRef<HTMLDivElement>();
        this.initSegments();
    }

    scroll = (e: React.WheelEvent<HTMLDivElement>) => {

        let extent = this.state.extent;
        extent.to += e.deltaY / 10;
        extent.from -= e.deltaY / 10;

        this.setState({
            extent: extent
        });
        
        this.initSegments();
    }

    componentDidMount() {
        this.initSegments();
    }

    initSegments = () => {

        if (!this.target.current)
            return;

        let extent = this.state.extent;
        let width = this.target.current.clientWidth;
        this.ruler(this.state.segments, extent, width);
    }

    ruler = (segments: Map<number, number>, extent: IExtent, width: number) => {

        let usedKeys = [];
        let slope = (x: number) => x * (width / extent.range) + (width / 2);
        let power = Math.pow(10, Math.floor(Math.log10(extent.range)));
        let offset = extent.from % power + power;

        for (let i = extent.from - offset; i < extent.to + power; i += power) {
            segments.set(i, slope(i));
            usedKeys.push(i);
        }

        // Drop unused entries
        [...segments.keys()].filter(s => !usedKeys.includes(s)).map(d => segments.delete(d));
    }

    render() {

        return (
            <div className="scale-navigator-container" onWheel={(e) => this.scroll(e)} ref={this.target}>
                {
                    [...this.state.segments].map(([value, position]) => {
                        return <RulerSegment key={value} value={value} position={position} />
                    })
                }
            </div>
        )
    }
}