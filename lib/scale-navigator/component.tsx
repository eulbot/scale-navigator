import * as React from 'react';
import { RulerSegment } from '../ruler-segment/component';
import Util from './util';

interface IProps {
    map?: any
}

interface IState {
    factor: number;
    offset: number;
    segments: Array<number>;
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

        let from = 0;
        let to = 10;

        if(!this.target.current)
            return;

        let segmentation = Util.initSegmentation(this.target.current.clientWidth);
        
        let segments = Util.getSegments(from, to, 1)

        
        this.setState({
            segments: segments,
            segmentWidth: segmentation.width
        });
    }

    render() {
        
        return (
            <div className="scale-navigator-container" onWheel={ (e) => this.scroll(e) } ref={ this.target }>
                { this.state.segments.map((segment, index) => (
                    <RulerSegment key={ index } value={ segment } width={ this.state.segmentWidth } />
                )) }
            </div>
        )
    }
}