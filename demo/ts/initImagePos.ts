import { PosRule, applyHTMLPos } from '../../src/ts/index';

export function initImagePos () {

    const elements = document.querySelectorAll('.image-pos');
    for (let i = 0, l = elements.length; i < l; i++) {

        const el = elements[i];

        // get position rule
        const rule = el.getAttribute('data-rule');

        // get image outer
        const outer = el.querySelector('.image-pos__img');

        // get image, load it and then init the element
        const src = el.getAttribute('data-src');
        if (src) {
            const img = new Image();
            img.src = src;
            outer.appendChild(img);
            img.onload = () => {
                init(outer, img, rule as PosRule);
            };
        }

    }

}



function init (
    el: Element,
    img: HTMLImageElement,
    rule: PosRule,
) {

    applyHTMLPos({
        source: img,
        rule,
        container: el,
    });

}
