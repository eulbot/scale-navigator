import * as React from 'react';
import { RulerSegment } from '../ruler-segment/component';

interface IProps {
    map?: any
}

interface IState {
    factor: number;
    offset: number;
    segments: Array<{ position: number; value: number }>;
    segmentWidth: number;
}

export class ScaleNavigator extends React.Component<IProps, IState> {

    private target: React.RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);

        this.state = {
            factor: 1,
            offset: 0,
            segmentWidth: 0,
            segments: []
        }

        this.target = React.createRef<HTMLDivElement>();
        this.initSegments();
    }

    scroll = (e: React.WheelEvent<HTMLDivElement>) => {

        this.setState({
            factor: Math.max(1, this.state.factor + (e.deltaY * -1))
        })
    }

    componentDidMount() {
        this.initSegments();
    }

    initSegments = () => {

        if (!this.target.current)
            return;

        let from = 30;
        let to = 875;

        let range = to - from;
        let width = this.target.current.clientWidth;
        let factor = width / range;

        let power = Math.pow(10, Math.floor(Math.log10(range)));
        let segments = [];
        let offset = from % power;

        for (let i = from - offset; i < to + power; i += power) {

            segments.push({ value: i, position: (i - offset) * factor });
        }

        this.setState({
            segments: segments
        });
    }

    render() {

        return (
            <div className="scale-navigator-container" onWheel={(e) => this.scroll(e)} ref={this.target}>
                {this.state.segments.map((segment, index) => (

                    <RulerSegment key={index} value={segment.value} position={segment.position} />
                ))}
            </div>
        )
    }
}