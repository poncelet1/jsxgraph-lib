import * as core from './core/pointUtils.js';
import * as point from './point/pointOps.js';
import * as triangle from './triangle/triangle.js';
import * as jsxgraph from './jsxgraph/circles.js';
import * as style from './style/styles.js';

export const jg = {
    core,
    point,
    triangle,
    jsxgraph,
    style
};

window.jg = jg;
