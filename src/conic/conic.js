import { signedArea } from '../triangle/triangle.js';

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
  
    return signedArea(B, C, E) * signedArea(D, A, E) * ((ay - by) * (dx - cx) + (bx - ax) * (cy - dy)) - signedArea(A, B, E) * signedArea (C, D, E) * ((by - cy) * (ax - dx) + (cx - bx) * (dy - ay));
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




