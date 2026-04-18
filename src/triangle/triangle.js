import { getXY } from "../core/core.js";
import {
  pointDist,
  intersectionPoint,
  midpoint,
  projectPoint,
  rotatePoint,
} from "../point/point.js";
import { circleStyle } from "../style/style.js";

/**
 * Given points A, B, C, returns the semiperimeter of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns semiperimeter
 */
export function triangleSemiperimeter(A, B, C) {
  return (pointDist(A, B) + pointDist(A, C) + pointDist(B, C)) / 2;
}

/**
 * Given points A, B, C, returns the area of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns area
 */
export function triangleArea(A, B, C) {
  const [ax, ay] = getXY(A);
  const [bx, by] = getXY(B);
  const [cx, cy] = getXY(C);

  return (
    Math.abs(ax * by + bx * cy + cx * ay - ay * bx - by * cx - cy * ax) / 2
  );
}

/**
 * Given points A, B, C, returns the signed area of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns signed area
 */
export function triangleSignedArea(A, B, C) {
  const [ax, ay] = getXY(A);
  const [bx, by] = getXY(B);
  const [cx, cy] = getXY(C);

  return (ax * by + bx * cy + cx * ay - ay * bx - by * cx - cy * ax) / 2;
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
export function barycoordPoint(A, B, C, x, y, z) {
  const [ax, ay] = getXY(A);
  const [bx, by] = getXY(B);
  const [cx, cy] = getXY(C);

  return [
    (ax * x + bx * y + cx * z) / (x + y + z),
    (ay * x + by * y + cy * z) / (x + y + z),
  ];
}

/**
 * Given points A, B, C, returns the centroid of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns centroid
 */
export function triangleCentroid(A, B, C) {
  return barycoordPoint(A, B, C, 1, 1, 1);
}

/**
 * Given points A, B, C, returns the inradius of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns inradius
 */
export function triangleInradius(A, B, C) {
  const s = triangleSemiperimeter(A, B, C);
  const K = triangleArea(A, B, C);

  return K / s;
}

/**
 * Given points A, B, C, returns the incenter of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns incenter
 */
export function triangleIncenter(A, B, C) {
  const a = pointDist(B, C);
  const b = pointDist(C, A);
  const c = pointDist(A, B);

  return barycoordPoint(A, B, C, a, b, c);
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
export function triangleIncircle(board, A, B, C, style = circleStyle) {
  return board.create(
    "circle",
    [() => triangleIncenter(A, B, C), () => triangleInradius(A, B, C)],
    style,
  );
}

/**
 * Given points A, B, C, returns the A-exradius of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns A-exradius
 */
export function triangleExradius(A, B, C) {
  const a = pointDist(B, C);
  const s = triangleSemiperimeter(A, B, C);
  const K = triangleArea(A, B, C);

  return K / (s - a);
}

/**
 * Given points A, B, C, returns the A-excenter of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns A-excenter
 */
export function triangleExcenter(A, B, C) {
  const a = pointDist(B, C);
  const b = pointDist(C, A);
  const c = pointDist(A, B);

  return barycoordPoint(A, B, C, -a, b, c);
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
export function triangleExcircle(board, A, B, C, style = circleStyle) {
  return board.create(
    "circle",
    [() => triangleExcenter(A, B, C), () => triangleExradius(A, B, C)],
    style,
  );
}

/**
 * Given points A, B, C, returns the circumradius of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns circumradius
 */
export function triangleCircumradius(A, B, C) {
  const a = pointDist(B, C);
  const b = pointDist(A, C);
  const c = pointDist(A, B);
  const K = triangleArea(A, B, C);

  return (a * b * c) / (4 * K);
}

/**
 * Given points A, B, C, returns the circumcenter of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns circumcenter
 */
export function triangleCircumcenter(A, B, C) {
  return intersection(
    midpoint(A, B),
    rotatePoint(midpoint(A, B), Math.PI / 2, A),
    midpoint(A, C),
    rotatePoint(midpoint(A, C), Math.PI / 2, A),
  );
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
export function triangleCircumcircle(board, A, B, C, style = circleStyle) {
  return board.create(
    "circle",
    [() => triangleCircumcenter(A, B, C), () => triangleCircumradius(A, B, C)],
    style,
  );
}

/**
 * Given points A, B, C, returns the orthocenter of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns orthocenter
 */
export function triangleOrthocenter(A, B, C) {
  return intersectionPoint(A, projectPoint(B, C, A), B, projectPoint(C, A, B));
}

/**
 * Given points A, B, C, returns the inner Soddy radius of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns inner Soddy radius
 */
export function triangleInnerSoddyRadius(A, B, C) {
  const r = triangleInradius(A, B, C);
  const R = triangleCircumradius(A, B, C);
  const s = triangleSemiperimeter(A, B, C);
  const K = triangleArea(A, B, C);

  return K / (4 * R + r + 2 * s);
}

/**
 * Given points A, B, C, returns the inner Soddy center of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns inner Soddy center
 */
export function triangleInnerSoddyCenter(A, B, C) {
  const a = pointDist(B, C);
  const b = pointDist(A, C);
  const c = pointDist(A, B);
  const rA = triangleExradius(A, B, C);
  const rB = triangleExradius(B, C, A);
  const rC = triangleExradius(C, A, B);

  return barycoordPoint(A, B, C, a + rA, b + rB, c + rC);
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
export function triangleInnerSoddyCircle(board, A, B, C, style = circleStyle) {
  return board.create(
    "circle",
    [() => triangleInnerSoddyCenter(A, B, C), () => triangleInnerSoddyRadius(A, B, C)],
    style,
  );
}

/**
 * Given points A, B, C, returns the outer Soddy radius of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns outer Soddy radius
 */
export function triangleOuterSoddyRadius(A, B, C) {
  const r = triangleInradius(A, B, C);
  const R = triangleCircumradius(A, B, C);
  const s = triangleSemiperimeter(A, B, C);
  const K = triangleArea(A, B, C);

  return K / (4 * R + r - 2 * s);
}

/**
 * Given points A, B, C, returns the outer Soddy center of triangle ABC
 * @param A first point
 * @param B second point
 * @param C third point
 * @returns outer Soddy center
 */
export function triangleOuterSoddyCenter(A, B, C) {
  const a = pointDist(B, C);
  const b = pointDist(A, C);
  const c = pointDist(A, B);
  const rA = triangleExradius(A, B, C);
  const rB = triangleExradius(B, C, A);
  const rC = triangleExradius(C, A, B);

  return barycoordPoint(A, B, C, -a + rA, -b + rB, -c + rC);
}

/**
 * Creates the outer Soddy circle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns outer Soddy circle
 */
export function triangleOuterSoddyCircle(board, A, B, C, style = circleStyle) {
  return board.create(
    "circle",
    [() => triangleOuterSoddyCenter(A, B, C), () => triangleOuterSoddyRadius(A, B, C)],
    style,
  );
}
