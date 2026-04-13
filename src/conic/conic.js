import { signedArea } from '../triangle/triangle.js';
import { getXY } from '../core/core.js';
import { intersection } from '../point/point.js';

/**
     * Given points A, B, C, D, E, returns the coefficient of x^2 in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of x^2
     */
export function conicxx(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * (ay - by) * (cy - dy) - signedArea(A, B, E) * signedArea (C, D, E) * (by - cy) * (dy - ay);
}


/**
     * Given points A, B, C, D, E, returns the coefficient of xy in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of xy
     */
export function conicxy(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * ((ay - by) * (dx - cx) + (bx - ax) * (cy - dy))
        - signedArea(A, B, E) * signedArea (C, D, E) * ((by - cy) * (ax - dx) + (cx - bx) * (dy - ay));
}

/**
     * Given points A, B, C, D, E, returns the coefficient of y^2 in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of y^2
     */
export function conicyy(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * (bx - ax) * (dx - cx) - signedArea(A, B, E) * signedArea (C, D, E) * (cx - bx) * (ax - dx);
}

/**
     * Given points A, B, C, D, E, returns the coefficient of x in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of x
     */
export function conicx(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * ((ay - by) * (cx * dy - cy * dx) + (ax * by - ay * bx) * (cy - dy))
        - signedArea(A, B, E) * signedArea (C, D, E) * ((by - cy) * (dx * ay - dy * ax) + (bx * cy - by * cx) * (dy - ay));
}

/**
     * Given points A, B, C, D, E, returns the coefficient of y in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of y
     */
export function conicy(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * ((bx - ax) * (cx * dy - cy * dx) + (ax * by - ay * bx) * (dx - cx))
        - signedArea(A, B, E) * signedArea (C, D, E) * ((cx - bx) * (dx * ay - dy * ax) + (bx * cy - by * cx) * (ax - dx));
}

/**
     * Given points A, B, C, D, E, returns the coefficient of 1 in the equation of the conic passing through the five points
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns coefficient of 1
     */
export function conic1(A, B, C, D, E) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);
    const [ex, ey] = getXY(E);
  
    return signedArea(B, C, E) * signedArea(D, A, E) * ((ax * by - ay * bx) * (cx * dy - cy * dx))
        - signedArea(A, B, E) * signedArea (C, D, E) * ((bx * cy - by * cx) * (dx * ay - dy * ax));
}

/**
     * Returns the center of the conic Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0
     * @param A coefficient of x^2
     * @param B coefficient of xy
     * @param C coefficient of y^2
     * @param D coefficient of x
     * @param E coefficient of y
     * @param E coefficient of 1
     * @returns center of conic
     */
export function conicCenter(A, B, C, D, E, F) {
    return [
        (2 * C * D - B * E)/(B ** 2 - 4 * A * C),
        (2 * A * E - B * D)/(B ** 2 - 4 * A * C)
    ];
}

/**
     * Returns the center of the conic passing through the points A, B, C, D, E
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns center of conic
     */
export function conicCenterByPoints(A, B, C, D, E) {
    const Acoeff = conicxx(A, B, C, D, E);
    const Bcoeff = conicxy(A, B, C, D, E);
    const Ccoeff = conicyy(A, B, C, D, E);
    const Dcoeff = conicx(A, B, C, D, E);
    const Ecoeff = conicy(A, B, C, D, E);
    const Fcoeff = conic1(A, B, C, D, E);
    
    return conicCenter(Acoeff, Bcoeff, Ccoeff, Dcoeff, Ecoeff, Fcoeff);
}

/**
     * Given points A, B, C, D, E, returns point where inscribed conic is tangent to AB
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns brianchon point
     */
export function brianchonPoint(A, B, C, D, E) {
    return intersection(A, B, D, intersection(A, C, B, E));
}

/**
     * Given points A, B, C, D, E, returns the conic that is tangent to lines AB, BC, CD, DE, EA
     * @param JSXgraph board
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @returns brianchon point
     */
export function conicByLine(board, A, B, C, D, E, style = jg.style.circleStyle) {
    const TAB = () => brianchonPoint(A, B, C, D, E);
    const TBC = () => brianchonPoint(B, C, D, E, A);
    const TCD = () => brianchonPoint(C, D, E, A, B);
    const TDE = () => brianchonPoint(D, E, A, B, C);
    const TEA = () => brianchonPoint(E, A, B, C, D);
    
    return board.create('conic', [TAB, TBC, TCD, TDE, TEA], style);
}

/**
     * Given points A, B, C, D, E lying on a conic, and a point P (not on conic), returns the point where line EP intersects the conic (again)
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param E fifth point
     * @param P sixth point
     * @returns sixth point on conic
     */
export function conicSixthPoint(A, B, C, D, E, P) {
    const M1 = jg.point.intersection(A, B, D, E);
    const M2 = jg.point.intersection(B, C, E, P);
    const M3 = jg.point.intersection(C, D, M1, M2);
    
    return intersection(A, M3, E, P);
}

/**
     * Given points A, B, C, D on a line, returns the fixed point of the involution that has (A,B) and (C,D) as reciprocal pairs
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @param n is 0 or 1
     * @returns fixed point
     */
export function fixedPoint(A, B, C, D, n) {
    const [ax, ay] = getXY(A);
    const [bx, by] = getXY(B);
    const [cx, cy] = getXY(C);
    const [dx, dy] = getXY(D);

    const fx = jg.core.quadraticRoot(ax + bx - cx - dx, -2 * (ax * bx - cx * dx), ax * bx * cx + ax * bx * dx - ax * cx * dx - bx * cx * dx, n);
    const fy = jg.core.quadraticRoot(ay + by - cy - dy, -2 * (ay * by - cy * dy), ay * by * cy + ay * by * dy - ay * cy * dy - by * cy * dy, n);
    
    return [fx, fy];
}

