import { getXY } from '../core/core.js';
import { dist, intersection, midpoint, project, rotate } from '../point/point.js';
import { circleStyle } from '../style/style.js';

/**
     * Given points A, B, C, returns the semiperimeter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns semiperimeter
     */
export function semiperimeter(A, B, C) {
    return (dist(A, B) + dist(A, C) + dist(B, C)) / 2;
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
     * Given points A, B, C, returns the inradius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns inradius
     */
export function inradius(A, B, C) {
    const s = semiperimeter(A, B, C);
    const K = area(A, B, C);

    return K / s;
}

/**
     * Given points A, B, C, returns the incenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns incenter
     */
export function incenter(A, B, C) {
    const a = dist(B, C);
    const b = dist(C, A);
    const c = dist(A, B);

    return barycoord(A, B, C, a, b, c);
}

/**
 * Creates the incircle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns incircle
 */
export function incircle(board, A, B, C, style = circleStyle) {
    const center = () => incenter(A, B, C);
    const radius = () => inradius(A, B, C);
    return board.create('circle', [center, radius], style);
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

  /**
 * Creates the A-excircle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns A-excircle
 */
export function excircle(board, A, B, C, style = circleStyle) {
    const center = () => excenter(A, B, C);
    const radius = () => exradius(A, B, C);
    return board.create('circle', [center, radius], style);
}

/**
     * Given points A, B, C, returns the circumradius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns circumradius
     */
export function circumradius(A, B, C) {
    const a = dist(B,C);
    const b = dist(A,C);
    const c = dist(A,B);
    const K = area(A, B, C);

    return (a * b * c)/(4 * K);
}

/**
     * Given points A, B, C, returns the circumcenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns circumcenter
     */
export function circumcenter(A, B, C) {
    return intersection(midpoint(A, B), rotate(midpoint(A,B), Math.PI/2, A), midpoint(A, C), rotate(midpoint(A, C), Math.PI/2, A));
}

 /**
 * Creates the circumcircle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns circumcircle
 */
export function circumcircle(board, A, B, C, style = circleStyle) {
    const center = () => circumcenter(A, B, C);
    const radius = () => circumradius(A, B, C);
    return board.create('circle', [center, radius], style);
}

/**
     * Given points A, B, C, returns the orthocenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns orthocenter
     */
export function orthocenter(A, B, C) {
    return intersection(A, project(B, C, A), B, project(C, A, B));
}

/**
     * Given points A, B, C, returns the inner Soddy radius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns inner Soddy radius
     */
export function innerSoddyRadius(A, B, C) {
    const r = inradius(A, B, C);
    const R = circumradius(A, B, C);
    const s = semiperimeter(A, B, C);
    const K = area(A, B, C);

    return K / (4 * R + r + 2 * s);
}

/**
     * Given points A, B, C, returns the inner Soddy center of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns inner Soddy center
     */
export function innerSoddyCenter(A, B, C) {
    const a = dist(B,C);
    const b = dist(A,C);
    const c = dist(A,B);
    const rA = exradius(A, B, C);
    const rB = exradius(A, B, C);
    const rC = exradius(A, B, C);

    return barycoord(A, B, C, a + rA, b + rB, c + rc);
}

/**
 * Creates the inner Soddy circle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns inner Soddy circle
 */
export function innerSoddyCircle(board, A, B, C, style = circleStyle) {
    const center = () => innerSoddyCenter(A, B, C);
    const radius = () => innerSoddyRadius(A, B, C);
    return board.create('circle', [center, radius], style);
}
