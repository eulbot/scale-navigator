import { RulerType } from '../enums/ruler-type';

export interface ISegment {
    value: number;
    position: number;
    type: RulerType;
    opacity: number;
}