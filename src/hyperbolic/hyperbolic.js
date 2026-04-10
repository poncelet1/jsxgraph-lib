import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';

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
     * Given points A, B, returns hyperbolic distance between A and B
     * @param A first point
     * @param B second point
     * @returns hyperbolic distance
     */
export function hyperDist(A, B) {
    const Bp = movePointToOrigin(B, A);
    return Math.log((1 + Bp.L())/(1 - Bp.L()));
}
