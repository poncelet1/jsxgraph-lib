import { getXY } from '../core/core.js';

/**
     * Given point A, returns the complex conjugate of A
     * @param A point
     * @returns conjugate
     */
export function complexConjugate(A) {
    const [ax, ay] = getXY(A);
    
    return [ax, -ay];
}

/**
     * Given points A, B, returns the complex sum of A and B
     * @param A first point
     * @param B second dpoint
     * @returns sum
     */
export function complexSum(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    
    return [
        ax + bx,
        ay + by
    ];
}

/**
     * Given points A, B, returns the complex difference of A and B
     * @param A first point
     * @param B second dpoint
     * @returns difference
     */
export function complexDifference(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    
    return [
        ax - bx,
        ay - by
    ];
}

/**
     * Given points A, B, returns the complex product of A and B
     * @param A first point
     * @param B second dpoint
     * @returns product
     */
export function complexProduct(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    
    return [
        ax * bx - ay * by,
        ax * by + ay * bx
    ];
}

/**
     * Given points A, B, returns the complex quotient of A and B
     * @param A first point
     * @param B second dpoint
     * @returns quotient
     */
export function complexQuotient(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    
    return [
        (ax * bx + ay * by)/(bx ** 2 + by ** 2),
        (ay * bx - ax * by)/(bx ** 2 + by ** 2)
    ];
}
