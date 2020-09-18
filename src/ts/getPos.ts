import { Size, Coords } from './index';



/**
 * Calculated sizes of the image
 */
export interface Pos extends Size, Coords {
    /**
     * The initial width of the media element
     */
    sourceWidth: number;
    /**
     * The initial width of the media element
     */
    sourceHeight: number;
    /**
     * The calculated width
     */
    width: number;
    /**
     * The calculated height
     */
    height: number;
    /**
     * The x-axis coordinate of the top-left corner
     */
    x: number;
    /**
     * The y-axis coordinate of the top-left corner
     */
    y: number;
}



/**
 * Size / position algorythms
 */
export type PosRule = 'cover' | 'contain' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';



/**
 * Base Properties
 */
export interface BaseProp {
    /**
     * Image source
     */
    source: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement;
    /**
     * Size/position algorythm
     */
    rule: PosRule;
    /**
     * Scaling
     */
    scale?: number;
}

/**
 * Properties base
 */
export interface SizeProp extends BaseProp, Size {
    /**
     * Container width
     */
    width: number;
    /**
     * Container height
     */
    height: number;
}

export interface ContainerProp extends BaseProp {
    /**
     * Parent element according to which sizes will be calculated
     */
    container: Element;
}

export type Prop = SizeProp | ContainerProp;



/**
 * Get image size according to the selected rules.
 * Note that the resources must be loaded before applying sizes to them.
 */
export function getPos (
    data: Prop,
): Pos {

    // get container size
    const containerSizes = getContainerSizes(data);
    // get source size
    const sourceSizes = getSourceSizes(data);

    // source coordinates
    let coords: Coords;

    // calculate position
    if (data.rule === 'cover') {
        coords = getPosCover(data, containerSizes, sourceSizes);
    }
    else if (data.rule === 'contain') {
        coords = getPosContain(data, containerSizes, sourceSizes);
    }
    else if (data.rule === 'top-left') {
        coords = getPosTopLeft(data, sourceSizes);
    }
    else if (data.rule === 'top-right') {
        coords = getPosTopRight(data, containerSizes, sourceSizes);
    }
    else if (data.rule === 'bottom-left') {
        coords = getPosBottomLeft(data, containerSizes, sourceSizes);
    }
    else if (data.rule === 'bottom-right') {
        coords = getPosBottomRight(data, containerSizes, sourceSizes);
    }
    else if (data.rule === 'center') {
        coords = getPosCenter(data, containerSizes, sourceSizes);
    }

    // return position
    return Object.assign(coords, {
        sourceWidth: sourceSizes.width,
        sourceHeight: sourceSizes.height,
    }) as Pos;

}



/**
 * Get scale prop
 * @ignore
 */
function getScale (
    data: Prop,
) {

    if (typeof data.scale !== 'undefined') {
        return data.scale;
    }

    return 1;

}

/**
 * Get source sizes
 * @ignore
 */
function getSourceSizes (
    data: Prop,
): Size {

    const { source } = data;

    if (source instanceof HTMLVideoElement) {
        return {
            width: source.videoWidth,
            height: source.videoHeight,
        };
    }

    return {
        width: source.width as number,
        height: source.height as number,
    };

}

/**
 * Get container sizes
 * @ignore
 */
function getContainerSizes (
    data: Prop,
): Size {

    // if has a container
    if ('container' in data) {
        return {
            width: data.container.clientWidth,
            height: data.container.clientHeight,
        };
    }

    return {
        width: data.width,
        height: data.width,
    };

}



/**
 * Get "cover" position
 * @ignore
 */
function getPosCover (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    let width = containerSizes.width * getScale(data);
    let height = sourceSizes.height * width / sourceSizes.width;

    if (height < containerSizes.height) {
        height = containerSizes.height * getScale(data);
        width = sourceSizes.width * height / sourceSizes.height;
    }

    const x = (containerSizes.width - width) / 2;
    const y = (containerSizes.height - height) / 2;

    return {
        width,
        height,
        x,
        y,
    };

}

/**
 * Get "contain" position
 * @ignore
 */
function getPosContain (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    let width = 0;
    let height = 0;

    if (sourceSizes.width > sourceSizes.height) {
        width = containerSizes.width * getScale(data);
        height = sourceSizes.height * width / sourceSizes.width;
    }
    else if (sourceSizes.height >= sourceSizes.width) {
        height = containerSizes.height * getScale(data);
        width = sourceSizes.width * height / sourceSizes.height;
    }

    const x = (containerSizes.width - width) / 2;
    const y = (containerSizes.height - height) / 2;

    return {
        width,
        height,
        x,
        y,
    };

}

/**
 * Get "top-left" position
 * @ignore
 */
function getPosTopLeft (
    data: Prop,
    sourceSizes: Size,
): Coords {

    const width = sourceSizes.width * getScale(data);
    const height = sourceSizes.height * getScale(data);

    return {
        width,
        height,
        x: 0,
        y: 0,
    };

}

/**
 * Get "top-right" position
 * @ignore
 */
function getPosTopRight (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    const width = sourceSizes.width * getScale(data);
    const height = sourceSizes.height * getScale(data);

    const x = containerSizes.width - sourceSizes.width;

    return {
        width,
        height,
        x,
        y: 0,
    };

}

/**
 * Get "bottom-left" position
 * @ignore
 */
function getPosBottomLeft (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    const width = sourceSizes.width * getScale(data);
    const height = sourceSizes.height * getScale(data);

    const y = containerSizes.height - sourceSizes.height;

    return {
        width,
        height,
        x: 0,
        y,
    };

}

/**
 * Get "bottom-right" position
 * @ignore
 */
function getPosBottomRight (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    const width = sourceSizes.width * getScale(data);
    const height = sourceSizes.height * getScale(data);

    const x = containerSizes.width - sourceSizes.width;
    const y = containerSizes.height - sourceSizes.height;

    return {
        width,
        height,
        x,
        y,
    };

}

/**
 * Get "center" position
 * @ignore
 */
function getPosCenter (
    data: Prop,
    containerSizes: Size,
    sourceSizes: Size,
): Coords {

    const width = sourceSizes.width * getScale(data);
    const height = sourceSizes.height * getScale(data);

    const x = (containerSizes.width - sourceSizes.width) / 2;
    const y = (containerSizes.height - sourceSizes.height) / 2;

    return {
        width,
        height,
        x,
        y,
    };

}
