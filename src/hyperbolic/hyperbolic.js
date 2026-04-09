import { complexConjugate, complexProduct, complexQuotient } from '../complex/complex.js';

/**
     * Given point Z, A, returns (Z - A)/(1 - conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z - A)/(1 - conj(A)*Z)
     */
export function movePointToOrigin(Z, A) {
    const [ax, ay] = getXY(A);
    const [zx, zy] = getXY(Z);
    
    return complexQuotient([zx - ax, zy - ay]);
}
