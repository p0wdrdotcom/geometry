# geometry
A standalone simple geometry javascript framework for points, lines and polygons.

## simple example
```
const geometry = require('geometry');

let aPoint = new geometry.Point2D(34, 56);
let bPoint = new geometry.Point2D(45, 62);

let distance = aPoint.distance(bPoint);

```

## run tests
```npm test```
