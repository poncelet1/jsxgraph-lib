import { getXY } from '../core/core.js';
import { complexConjugate, complexDifference, complexProduct, complexQuotient, complexSum } from '../complex/complex.js';
import { circleStyle } from '../style/style.js';
import { dist, midpoint, pointScale, rotate } from '../point/point.js';
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
 * Creates a hyperbolic circle on a given board
 */
export function hyperCircle2(board, A, r, style = circleStyle) {
    // 1. Resolve the center coordinates [x, y]
    const getEuclCenter = () => {
        // If A is a JSXGraph point, use .X() and .Y()
        // If it's a function (like () => hyperIncenter), call it
        // Otherwise assume it's an array [x, y]
        let pos;
        if (A && typeof A.X === 'function') {
            pos = [A.X(), A.Y()];
        } else if (typeof A === 'function') {
            pos = A();
        } else {
            pos = A;
        }
        
        const radiusValue = (typeof r === 'function') ? r() : r;
        return hyperCircleCenter(pos, radiusValue);
    };

    // 2. Resolve the Euclidean radius
    const getEuclRadius = () => {
        let pos;
        if (A && typeof A.X === 'function') {
            pos = [A.X(), A.Y()];
        } else if (typeof A === 'function') {
            pos = A();
        } else {
            pos = A;
        }

        const radiusValue = (typeof r === 'function') ? r() : r;
        return hyperCircleRadius(pos, radiusValue);
    };

    return board.create('circle', [getEuclCenter, getEuclRadius], style);
}

export function hyperCircle3(board, A, r, style = circleStyle) {
    const getCoords = () => (typeof A.X === 'function') ? [A.X(), A.Y()] : A;
    const center = () => hyperCircleCenter(getCoords(), typeof r === 'function' ? r() : r);
    const radius = () => hyperCircleRadius(getCoords(), typeof r === 'function' ? r() : r);
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
     * Given points A, B, P, returns the projection of P onto line AB
     * @param A first point
     * @param B second point
     * @param P third point
     * @returns projection
     */
export function hyperProject(A, B, P) {
    return hyperMidpoint(P, hyperReflect(A, B, P));
}

/**
     * Given points A, B, returns the center of the perpendicular bisector of AB
     * @param A first point
     * @param B second point
     * @returns center of perpendicular bisector of AB
     */
export function hyperPerpBisCenter(A, B) {
    const N = complexDifference(pointScale(A, 1 - dist(B) ** 2), pointScale(B, 1 - dist(A) ** 2));
    const k = dist(A) ** 2 - dist(B) ** 2;
    return pointScale(N, 1/k);
}

/**
 * Creates perpendicular bisector A and B on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param style optional circle style
 * @returns hyperbolic line segment
 */
export function hyperPerpBis(board, A, B, style = circleStyle) {
    const M = board.create('point', [
        () => hyperMidpoint(A, B)
    ], { visible: false, withLabel: false });
    const R = board.create('point', [
        () => hyperRot(M, Math.PI/2, A)
    ], { visible: false, withLabel: false });

    return hyperline(board, M, R, style);
}

/**
     * Given points A, B, and real number d, returns point P such that P lies on AB extended past B, and AP = d
     * @param A first point
     * @param B second point
     * @param d number
     * @returns extended point P
     */
export function extendSegment(A, B, d) {
    const Bp = movePointToOrigin(B, A);
    const Ep = pointScale(Bp, (Math.exp(d) - 1)/(Math.exp(d) + 1)*1/dist(Bp));
    return movePointFromOrigin(Ep, A);
}

/**
     * Given points A, B, C, returns hyperbolic angle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns hyperbolic angle ABC
     */
export function hyperAngle(A, B, C) {
    const a = hyperDist(B, C);
    const b = hyperDist(A, C);
    const c = hyperDist(A, B);

    return Math.acos((Math.cosh(a)*Math.cosh(c) - Math.cosh(b))/(Math.sinh(a)*Math.sinh(c)));
}

/**
     * Given points A, B, C, returns area of hyperbolic triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns area
     */
export function hyperArea(A, B, C) {
    return Math.PI - hyperAngle(B, A, C) - hyperAngle(A, B, C) - hyperAngle(A, C, B);
}

/**
     * Given points A, B, C, D, returns the intersection of lines AB and CD
     * @param A first point
     * @param B second point
     * @param C third point
     * @param D fourth point
     * @returns intersection of AB and CD
     */
export function clineIntersect(A, B, C, D) {
    const Ap = hyperlineEndPoint(A, B);
    const Bp = hyperlineEndPoint(B, A);
    const Cp = hyperlineEndPoint(C, D);
    const Dp = hyperlineEndPoint(D, C);
    const X = jg.point.intersection(Ap, Bp, Cp, Dp);
    const [u,v] = getXY(X);
    const w = -Math.sqrt(1 - u **2 - v ** 2);

    return [ u / (1 - w), v / (1 - w) ];
}

/**
     * Given points A, B, C, returns the hyperbolic centroid of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns centroid
     */
export function hyperCentroid(A, B, C) {
    return clineIntersect(A, hyperMidpoint(B, C), B, hyperMidpoint(A, C));
}

/**
     * Given points A, B, C, returns the point where the incircle of hyperbolic triangle ABC touches side BC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns intouch point
     */
export function hyperIntouchPoint(A, B, C) {
    const a = hyperDist(B, C);
    const b = hyperDist(C, A);
    const c = hyperDist(A, B);
    const s = (a + b + c)/2;
    
    return extendSegment(B, C, s - b);
}

/**
     * Given points A, B, C, returns the point where the inradius of hyperbolic triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns inradius point
     */
export function hyperInradius(A, B, C) {
    const a = hyperDist(B, C);
    const b = hyperDist(C, A);
    const c = hyperDist(A, B);
    const s = (a + b + c)/2;
    
    return Math.atanh(Math.sqrt(Math.sinh(s - a) * Math.sinh(s - b) * Math.sinh(s - c) / Math.sinh(s)));
}

/**
     * Given points A, B, C, returns the point where the incenter of hyperbolic triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns incenter
     */
export function hyperIncenter(A, B, C) {
    const D = hyperIntouchPoint(A, B, C);
    const E = hyperIntouchPoint(B, C, A);

    return clineIntersect(D, hyperRot(D, Math.PI/2, B), E, hyperRot(E, Math.PI/2, C));
}

/**
 * Creates incircle of hyperbolic triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C second point
 * @param style optional circle style
 * @returns incircle
 */
export function hyperIncircle(board, A, B, C, style = circleStyle) {
    //const r = () => hyperInradius(A, B, C);

    //const getI = () => hyperIncenter(A, B, C);
    //const I = board.create('point', [getI], { visible: false, withLabel: false });

    r = hyperInradius(A, B, C);
    I = hyperIncenter(A, B, C);

    return hyperCircle3(board, I, r, style);
}

/**
     * Given points A, B, C, returns the hyperbolic orthocenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns orthocenter
     */
export function hyperOrthocenter(A, B, C) {
    return clineIntersect(A, hyperProject(B, C, A), B, hyperProject(C, A, B));
}

/**
     * Given points A, B, C, returns the hyperbolic circumradius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns circumradius
     */
export function hyperCircumradius(A, B, C) {
    const a = hyperDist(B, C);
    const b = hyperDist(A, C);
    const c = hyperDist(A, B);
    const K = hyperArea(A, B, C);

    return Math.atanh(Math.tanh(a / 2) * Math.tanh(b / 2) * Math.tanh(c / 2) / Math.sin(K / 2));
}

/**
     * Given points A, B, C, returns the hyperbolic circumcenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns circumcenter
     */
export function hyperCircumcenter(A, B, C) {
    return clineIntersect(hyperMidpoint(A, B), hyperRot(hyperMidpoint(A, B), Math.PI/2, A), hyperMidpoint(A, C), hyperRot(hyperMidpoint(A, C), Math.PI/2, A));
}
