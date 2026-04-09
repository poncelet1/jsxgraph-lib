import { getXY } from '../core/core.js';
import { dist } from '../point/point.js';

/**
     * Given points A, B, C, returns the semiperimeter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns semiperimeter
     */
export function semiperimeter(A, B, C) {
    return (dist(B, C) + dist(C, A) + dist(A, B)) / 2;
}

/**
     * Given points A, B, C, returns the area of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns area
     */
export function area(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return Math.abs(
        ax * by + bx * cy + cx * ay -
        ay * bx - by * cx - cy * ax
    ) / 2;
}

 /**
     * Given points A, B, C, returns the signed area of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns signed area
     */
export function signedArea(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return (
        ax * by + bx * cy + cx * ay -
        ay * bx - by * cx - cy * ax
    ) / 2;
}

/**
     * Given points A, B, C and real numbers x, y, z, returns the point with barycentric coordinates x:y:z
     * @param A first point
     * @param B second point
     * @param C third point
     * @param x A-coordinate
     * @param y B-coordinate
     * @param z C-coordinate
     * @returns barycentric point
     */
export function barycoord(A, B, C, x, y, z) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    const s = x + y + z;

    return [
        (ax * x + bx * y + cx * z) / s,
        (ay * x + by * y + cy * z) / s
    ];
}

/**
     * Given points A, B, C, returns the centroid of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns centroid
     */
export function centroid(A, B, C) {
  return barycoord(A, B, C, 1, 1, 1);
}

/**
     * Given points A, B, C, returns the A-exradius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-exradius
     */
export function exradius(A, B, C) {
    const a = dist(B, C);
    const s = semiperimeter(A, B, C);
    const K = area(A, B, C);

    return K / (s - a);
}

/**
     * Given points A, B, C, returns the A-excenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-excenter
     */
export function excenter(A, B, C) {
    const a = dist(B, C);
    const b = dist(C, A);
    const c = dist(A, B);

    return barycoord(A, B, C, -a, b, c);
}
