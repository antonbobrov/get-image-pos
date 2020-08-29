# Get image position coordinates

## Documentation: https://antonbobrov.github.io/get-image-pos/



## How to start with NPM
```sh
npm install get-image-pos
```

## How to start with CDN
```html
<script src="https://cdn.jsdelivr.net/npm/get-image-pos/dist/cdn/index.min.js"></script>
```



## Example
```js
import { getPos, applyHTMLPos } from 'get-image-pos';
// for CDN:
// window.getImagePos

const image = document.querySelector("img");

const pos = getPos({
    source: image,
    rule: 'cover',
    container: image.parentElement,
});

applyHTMLPos({
    source: image,
    rule: 'cover',
    container: image.parentElement,
});
```