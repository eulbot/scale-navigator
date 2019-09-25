import * as React from 'react';

interface IProps {
    position: number;
    value: number;
}

interface IState { }

export class RulerSegment extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {

        return (
            <div className="segment" style={{ left: `${this.props.position}px` }} >
                <div className="caption">{Math.round(this.props.value * 100) / 100}</div>
            </div>
        )
    }

}