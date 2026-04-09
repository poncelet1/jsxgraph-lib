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
     * Given points A, B, C, D, returns the intersection of lines AB and CD
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @returns intersection
     */
export function intersection(A, B, C, D) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    return [
        -((ax - bx)*(cx * dy - cy * dx) - (cx - dx)*(ax * by - ay * bx))/((ax - bx)*(cy - dy) - (ay - by)*(cx - dx)),
        -((ay - by)*(cy * dx - cx * dy) - (cy - dy)*(ay * bx - ax * by))/((ay - by)*(cx - dx) - (ax - bx)*(cy - dy))
        ];
        
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

/**
     * Given points A, B, returns the midpoint of AB
     * @param A first point
     * @param B second point
     * @returns midpoint
     */
export function midpoint(A, B) {
    return interp(A, B, 1/2);
}

/**
     * Given points A, B, C returns the projection of C onto line AB
     * @param A first point
     * @param B second point
     * @param C second point
     * @returns projection
     */
export function project(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return [
        ((cx - ax)*(bx - ax) + (cy - ay)*(by - ay))*(bx - ax)/dist(A,B) ** 2 + ax,
        ((cx - ax)*(bx - ax) + (cy - ay)*(by - ay))*(by - ay)/dist(A,B) ** 2 + ay
    ];
}

/**
     * Given points A, B, C returns the reflection of C over line AB
     * @param A first point
     * @param B second point
     * @param C second point
     * @returns reflection
     */
export function reflect(A, B, C) {
    const [cx, cy] = getXY(C);
    const [px, py] = getXY(project(A, B, C));

    return [2*px - cx, 2*py - cy];
}

/**
     * Given point C, real number t, and point P, returns the rotation of P around C by an angle of t
     * @param C center of rotation
     * @param t angle of rotation
     * @param P point being rotated
     * @returns rotated point
     */
export function rotate(C, t, P) {
    const [cx, cy] = getXY(C);
    const [px, py] = getXY(P);

    return [
        (px - cx) * Math.cos(t) - (py - cy) * Math.sin(t) + cx,
        (px - cx) * Math.sin(t) + (py - cy) * Math.cos(t) + cy
    ];
}
