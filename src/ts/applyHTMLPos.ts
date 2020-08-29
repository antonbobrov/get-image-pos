import { getPos, Prop } from './getPos';

/**
 * Apply position of an image.
 */
export function applyHTMLPos (
    data: Prop,
) {

    const sizes = getPos(data);

    // apply sizes
    const { source } = data;
    source.style.position = 'absolute';
    source.style.left = `${sizes.x}px`;
    source.style.top = `${sizes.y}px`;
    source.style.width = `${sizes.width}px`;
    source.style.height = `${sizes.height}px`;

}
