import * as React from 'react';

interface IProps {
    value: number;
    width: number;
}

interface IState {}

export class RulerSegment extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        
        return (
            <div className="segment" style={ {width: `${this.props.width}px` } } >
                <div className="caption">{ Math.round(this.props.value) }</div>
            </div>
        )
    }

}