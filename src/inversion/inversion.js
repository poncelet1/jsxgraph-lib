import { getXY } from '../core/core.js';
import { dist, pointDifference, pointScale, pointSum } from '../point/point.js';
import { circleStyle } from '../style/style.js';

/**
     * Given point O, radius r, and point P, returns the inverse of P with respect to the circle centered at O with radius r.
     * @param O center
     * @param r radius
     * @param P point
     * @returns inverse of P
     */
export function invertPoint(O, r, P) {
    return pointSum(O, pointScale(pointDifference(P, O), r ** 2 / dist(P, O) ** 2));
}
