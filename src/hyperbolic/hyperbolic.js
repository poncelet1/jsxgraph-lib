import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';
import { circleStyle } from '../style/style.js';
import { dist, pointScale, rotate } from '../point/point.js';

/**
     * Given points Z, A, returns (Z - A)/(1 - conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z - A)/(1 - conj(A)*Z)
     */
export function movePointToOrigin(Z, A) {
    return complexQuotient(complexDifference(Z, A), complexDifference([1, 0], complexProduct(complexConjugate(A), Z)));
}

/**
     * Given points Z, A, returns (Z + A)/(1 + conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z + A)/(1 + conj(A)*Z)
     */
export function movePointFromOrigin(Z, A) {
    return complexQuotient(complexSum(Z, A), complexSum([1, 0], complexProduct(complexConjugate(A), Z)));
}

/**
     * Given points A, B, returns hyperbolic distance between A and B
     * @param A first point
     * @param B second point
     * @returns hyperbolic distance
     */
export function hyperDist(A, B) {
    const Bp = movePointToOrigin(B, A);
    return Math.log((1 + dist(Bp))/(1 - dist(Bp)));
}

/**
     * Given point A and number r, returns the (Euclidean) center of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) center of hyperbolic circle
     */
export function hyperCircleCenter(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return pointScale(A, (1 - p ** 2)/(1 - p ** 2 * dist(A) ** 2));
}

/**
     * Given point A and number r, returns the (Euclidean) radius of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) radius of hyperbolic circle
     */
export function hyperCircleRadius(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return p * (1 - dist(A) ** 2)/(1 - p ** 2 * dist(A) ** 2);
}

/**
 * Creates a hyperbolic circle on a given board
 * @param board JSXGraph board
 * @param A center
 * @param r radius
 * @param style optional circle style
 * @returns hyperbolic circle
 */
export function hyperCircle(board, A, r, style = circleStyle) {
    const center = () => hyperCircleCenter(A, r);
    const radius = () => hyperCircleRadius(A, r);
    return board.create('circle', [center, radius], style);
}

/**
     * Given point C, real number t, and point P, returns the rotation of P around C by an angle of t
     * @param C center of rotation
     * @param t angle of rotation
     * @param P point being rotated
     * @returns rotated point
     */
export function hyperRot(C, t, P) {
    return movePointFromOrigin(rotate([0, 0], t, movePointToOrigin(P, C)), C);
}
