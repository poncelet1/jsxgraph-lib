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
 * Given circles circ1 and circ2, returns the inverse of the circ2 with respect to circ1
 * @param circ1 circle
 * @param circ2 circle
 * @returns inverse of circle
 */
export function invertCircle(board, circ1, circ2, style = circleStyle) {
  const o1x = () => circ1.center.X();
  const o1y = () => circ1.center.Y();
  const r1 = circ1.Radius();
  const o2x = () => circ2.center.X();
  const o2y = () => circ2.center.Y();
  const r2 = circ2.Radius();

  const denom = () => Math.hypot(o1x() - o2x(), o1y() - o2y()) ** 2 - r2() ** 2;
  
  const center = () => [
    r1() ** 2 / denom() * (o2x() - o1x()) + o1x(),
    r1() ** 2 / denom() * (o2y() - o1y()) + o1y()
  ];
  const radius = () => (r1() ** 2 * r2()) / denom();
  return board.create("circle", [center, radius], style);
}
