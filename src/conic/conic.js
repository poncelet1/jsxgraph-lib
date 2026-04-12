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
