import { getXY } from '../core/core.js';
import { dist, intersection, midpoint, project, rotate } from '../point/point.js';
import { circleStyle } from '../style/style.js';

/**
     * Given point O, radius r, and point P, returns the inverse of P with respect to the circle centered at O with radius r.
     * @param O center
     * @param r radius
     * @param P point
     * @returns inverse of P
     */
export function invertPoint(A, B, C) {
    return (dist(A, B) + dist(A, C) + dist(B, C)) / 2;
}
