import { getXY, dist } from '../core/pointUtils.js';

export function semiperimeter(A, B, C) {
    return (dist(B, C) + dist(C, A) + dist(A, B)) / 2;
}

export function area(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return Math.abs(
        ax * by + bx * cy + cx * ay -
        ay * bx - by * cx - cy * ax
    ) / 2;
}

export function signedArea(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return (
        ax * by + bx * cy + cx * ay -
        ay * bx - by * cx - cy * ax
    ) / 2;
}

export function centroid(A, B, C) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);

    return [(ax + bx + cx) / 3, (ay + by + cy) / 3];
}

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

export function exradius(A, B, C) {
    const a = dist(B, C);
    const s = semiperimeter(A, B, C);
    const K = area(A, B, C);

    return K / (s - a);
}

export function excenter(A, B, C) {
    const a = dist(B, C);
    const b = dist(C, A);
    const c = dist(A, B);

    return barycoord(A, B, C, -a, b, c);
}
