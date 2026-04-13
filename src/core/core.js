/**
 * Given point P, returns x and y coordinates
 * @param P point
 * @returns [x, y]
 */
export function getXY(P) {
  return typeof P.X === "function" ? [P.X(), P.Y()] : P;
}

/**
 * Given a, b, c, returns the root of ax^2 + bx + c = 0
 * @param a coefficient of x^2
 * @param b coefficient of x
 * @param c coefficient of 1
 * @param n 0 or 1
 * @returns root
 */
export function quadraticRoot(a, b, c, n) {
  return (-b + (2 * n - 1) * Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
}
