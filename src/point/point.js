import { getXY } from '../core/pointUtils.js';

export function dist(A, B) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    return Math.hypot(bx - ax, by - ay);
}

export function interp(A, B, t) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);

    return [
        ax + t * (bx - ax),
        ay + t * (by - ay)
    ];
}
