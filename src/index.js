import * as complex from './complex/complex.js';
import * as conic from './conic/conic.js';
import * as core from './core/core.js';
import * as hyperbolic from './hyperbolic/hyperbolic.js';
import * as inversion from './inversion/inversion.js';
import * as point from './point/point.js';
import * as style from './style/style.js';
import * as triangle from './triangle/triangle.js';

export const jg = {
  complex,
  conic,
  core,
  hyperbolic,
  inversion,
  point,
  style,
  triangle
};

window.jg = jg;
