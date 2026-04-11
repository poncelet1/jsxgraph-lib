import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';
import { circleStyle } from '../style/style.js';
import { dist, pointScale, rotate } from '../point/point.js';
import { signedArea } from '../triangle/triangle.js';

/**
     * Given points Z, A, returns (Z - A)/(1 - conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z - A)/(1 - conj(A)*Z)
     */
export function movePointToOrigin(Z, A) {
    return complexQuotient(complexDifference(Z, A), complexDifference([1, 0], complexProduct(complexConjugate(A), Z)));
}

/**
     * Given points Z, A, returns (Z + A)/(1 + conj(A)*Z)
     * @param Z first point
     * @param A second point
     * @returns (Z + A)/(1 + conj(A)*Z)
     */
export function movePointFromOrigin(Z, A) {
    return complexQuotient(complexSum(Z, A), complexSum([1, 0], complexProduct(complexConjugate(A), Z)));
}

/**
     * Given points A, B, returns hyperbolic distance between A and B
     * @param A first point
     * @param B second point
     * @returns hyperbolic distance
     */
export function hyperDist(A, B) {
    const Bp = movePointToOrigin(B, A);
    return Math.log((1 + dist(Bp))/(1 - dist(Bp)));
}

/**
     * Given point A and number r, returns the (Euclidean) center of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) center of hyperbolic circle
     */
export function hyperCircleCenter(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return pointScale(A, (1 - p ** 2)/(1 - p ** 2 * dist(A) ** 2));
}

/**
     * Given point A and number r, returns the (Euclidean) radius of the hyperbolic circle centered at A with radius r
     * @param A center
     * @param r radius
     * @returns (Euclidean) radius of hyperbolic circle
     */
export function hyperCircleRadius(A, r) {
    const p = (Math.exp(r) - 1)/(Math.exp(r) + 1);
    return p * (1 - dist(A) ** 2)/(1 - p ** 2 * dist(A) ** 2);
}

/**
 * Creates a hyperbolic circle on a given board
 * @param board JSXGraph board
 * @param A center
 * @param r radius
 * @param style optional circle style
 * @returns hyperbolic circle
 */
export function hyperCircle(board, A, r, style = circleStyle) {
    const center = () => hyperCircleCenter(A, r);
    const radius = () => hyperCircleRadius(A, r);
    return board.create('circle', [center, radius], style);
}

/**
     * Given point C, real number t, and point P, returns the rotation of P around C by an angle of t
     * @param C center of rotation
     * @param t angle of rotation
     * @param P point being rotated
     * @returns rotated point
     */
export function hyperRot(C, t, P) {
    return movePointFromOrigin(rotate([0, 0], t, movePointToOrigin(P, C)), C);
}

/**
     * Given points A, B, returns the center of the cline passing through A and B
     * @param A first point
     * @param B second point
     * @returns center of cline
     */
export function clineCenter(A, B) {
    const N = complexDifference(pointScale(A, 1 + dist(B) ** 2), pointScale(B, 1 + dist(A) ** 2));
    const D = complexDifference(complexProduct(A, complexConjugate(B)), complexProduct(complexConjugate(A), B));
    return complexQuotient(N, D);
}

/**
     * Given points A, B, returns the hyperbolic midpoint of A and B
     * @param A first point
     * @param B second point
     * @returns midpoint
     */
export function hyperMidpoint(A, B) {
    const N = complexSum(pointScale(B, 1 - dist(A) ** 2), pointScale(A, 1 - dist(B) ** 2));
    const D = 1 - dist(A) ** 2 * dist(B) ** 2 + dist(complexDifference([1, 0], complexProduct(complexConjugate(A), B))) * Math.sqrt((1 - dist(A) ** 2)*(1 - dist(B) ** 2));
    return pointScale(N, 1/D);
}

/**
     * Given points A, B, returns the endpoint of line AB past A
     * @param A first point
     * @param B second point
     * @returns endpoint
     */
export function hyperlineEndPoint(A, B) {
    const Bp = movePointToOrigin(B, A);
    const Ep = pointScale(Bp, -1/dist(Bp));
    return movePointFromOrigin(Ep, A);
}

/**
 * Creates hyperbolic line AB on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param style optional circle style
 * @returns hyperbolic line
 */
export function hyperline(board, A, B, style = circleStyle) {
    const getC = () => clineCenter(A, B);
    const getP = () => hyperlineEndPoint(A, B);
    const getQ = () => hyperlineEndPoint(B, A);

    const arcCenter = board.create('point', [() => getC()], { visible: false, withLabel: false });
    
    const startPoint = board.create('point', [
        () => signedArea(getC(), A, B) > 0 ? getP() : getQ()
    ], { visible: false, withLabel: false });

    const endPoint = board.create('point', [
        () => signedArea(getC(), A, B) > 0 ? getQ() : getP()
    ], { visible: false, withLabel: false });
    
    return board.create('arc', [arcCenter, startPoint, endPoint], style);
}

/**
 * Creates hyperbolic line segment AB on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param style optional circle style
 * @returns hyperbolic line segment
 */
export function hyperlineSegment(board, A, B, style = circleStyle) {
    const getA = () => [A.X(), A.Y()];
    const getB = () => [B.X(), B.Y()];
    const getC = () => clineCenter(A, B);

    const arcCenter = board.create('point', [() => getC()], { visible: false, withLabel: false });

    const startPoint = board.create('point', [
        () => signedArea(getC(), A, B) > 0 ? getA() : getB()
    ], { visible: false, withLabel: false });

    const endPoint = board.create('point', [
        () => signedArea(getC(), A, B) > 0 ? getB() : getA()
    ], { visible: false, withLabel: false });

    return board.create('arc', [arcCenter, startPoint, endPoint], style);
}

/**
     * Given points A, B, P, returns the reflection of P over line AB
     * @param A first point
     * @param B second point
     * @param P third point
     * @returns reflection
     */
export function hyperReflect(A, B, P) {
    const Z1 = complexDifference(pointScale(A, (1 + dist(B) ** 2)), pointScale(B, (1 + dist(A) ** 2)));
    const Z2 = complexDifference(complexProduct(A, complexConjugate(B)), complexProduct(complexConjugate(A), B));
    const N = complexDifference(complexProduct(Z1, complexConjugate(P)), Z2);
    const D = complexSum(complexProduct(Z2, complexConjugate(P)), complexConjugate(Z1));
    return complexQuotient(N, D);
}

/**
     * Given points A, B, returns the center of the perpendicular bisector of AB
     * @param A first point
     * @param B second point
     * @returns center of perpendicular bisector of AB
     */
export function hyperPerpBisCenter(A, B) {
    const N = complexDifference(pointScale(A, 1 - dist(B) ** 2), ponitScale(B, 1 - dist(A) ** 2));
    const k = dist(A) ** 2 - dist(B) ** 2;
    return pointScale(N, 1/k);
}


