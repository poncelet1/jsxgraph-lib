import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';
import { circleStyle } from '../style/style.js';

/**
     * Given points Z, A, returns (Z - A)/(1 - conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z - A)/(1 - conj(A)*Z)
     */
export function movePointToOrigin(Z, A) {
    const [ax, ay] = getXY(A);
    const [zx, zy] = getXY(Z);
    
    return complexQuotient(complexDifference(Z, A), complexDifference([1, 0], complexProduct(complexConjugate(Z), A)));
}

/**
     * Given points Z, A, returns (Z + A)/(1 + conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z + A)/(1 + conj(A)*Z)
     */
export function movePointFromOrigin(Z, A) {
    const [ax, ay] = getXY(A);
    const [zx, zy] = getXY(Z);
    
    return complexQuotient(complexSum(Z, A), complexSum([1, 0], complexProduct(complexConjugate(Z), A)));
}

/**
     * Given points A, B, returns hyperbolic distance between A and B
     * @param A first point
     * @param B second point
     * @returns hyperbolic distance
     */
export function hyperDist(A, B) {
    const Bp = movePointToOrigin(B, A);
    return Math.log((1 + Bp.L())/(1 - Bp.L()));
}

/**
     * Given point A and number r, returns the (Euclidean) center of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) center of hyperbolic circle
     */
export function hyperCircleCenter(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return pointScale(A, (1 - p ** 2)/(1 - p ** 2 * A.L() ** 2));
}

/**
     * Given point A and number r, returns the (Euclidean) radius of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) radius of hyperbolic circle
     */
export function hyperCircleRadius(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return p * (1 - A.L() ** 2)/(1 - p ** 2 * A.L() ** 2);
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
