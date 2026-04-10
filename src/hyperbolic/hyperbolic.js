import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';

/**
     * Given point Z, A, returns (Z - A)/(1 - conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z - A)/(1 - conj(A)*Z)
     */
export function movePointToOrigin(Z, A) {
    const [ax, ay] = getXY(A);
    const [zx, zy] = getXY(Z);
    
    return complexQuotient(complexDiffrence(Z, A), complexDifference([1, 0], ComplexProduct(ComplexQuotient(Z), A)));
}
