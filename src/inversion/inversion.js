import { dist, pointDifference, pointScale, pointSum } from "../point/point.js";
import { circleStyle } from "../style/style.js";
import { getXY } from "../core/core.js";

/**
 * Given circle circ and point P, returns the inverse of P with respect to the circle circ
 * @param circ circle
 * @param P point
 * @returns inverse of P
 */
export function invertPoint(circ, P) {
  const ox = circ.center.X();
  const oy = circ.center.Y();
  const r = circ.Radius();
  const [px, py] = getXY(P);
  
  return [
    ox + r ** 2 / Math.hypot(ox - px, oy - py) ** 2 * (px - ox),
    oy + r ** 2 / Math.hypot(ox - px, oy - py) ** 2 * (py - oy)
  ];
}

/**
 * Given point O, radius r, and point P, radius s, returns the inverse of the circle centered at P with radius s
 * with respect to the circle centered at O with radius r
 * @param O center
 * @param r radius
 * @param P center
 * @param s radius
 * @returns inverse of circle
 */
export function invertCircle(board, O, r, P, s, style = circleStyle) {
  const center = () =>
    pointSum(
      O,
      pointScale(pointDifference(P, O), r ** 2 / (dist(O, P) ** 2 - s ** 2)),
    );
  const radius = () => (r ** 2 * s) / (dist(O, P) ** 2 - s ** 2);
  return board.create("circle", [center, radius], style);
}
