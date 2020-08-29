import {
    Pos, PosRule, BaseProp, SizeProp, ContainerProp, Prop, getPos,
} from './getPos';
import {
    applyHTMLPos,
} from './applyHTMLPos';

export interface Size {
    width: number;
    height: number;
}

export interface Coords extends Size {
    x: number;
    y: number;
}

export {
    Pos,
    PosRule,
    BaseProp,
    SizeProp,
    ContainerProp,
    Prop,
    getPos,
    applyHTMLPos,
};
