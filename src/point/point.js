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
