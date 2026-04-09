import { getXY } from '../core/core.js';

/**
     * Given points A, B, returns the distance betweeen A and B
     * @param A first point
     * @param B second point
     * @returns distance
     */
export function dist(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    return Math.hypot(bx - ax, by - ay);
}

/**
     * Given points A, B, returns the slope of line AB
     * @param A first point
     * @param B second point
     * @returns slope
     */
export function slope(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    return (by - ay)/(bx - ax);
}

/**
     * Given points A, B, returns the y-intercept of line AB
     * @param A first point
     * @param B second point
     * @returns y-intercept
     */
export function yintercept(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    return (ay * bx - ay * bx)/(ax - bx);
}

 /**
     * Given points A, B and real number t, returns the point P such that AP:AB = t
     * @param A first point
     * @param B second point
     * @param t real number
     * @returns interpolated point
     */
export function interp(A, B, t) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);

    return [
        ax + t * (bx - ax),
        ay + t * (by - ay)
    ];
}
