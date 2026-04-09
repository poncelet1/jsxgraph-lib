 /**
     * Given point P, returns x and y coordinates
     * @param P point
     * @returns [x, y]
     */
export function getXY(P) {
    return (typeof P.X === 'function')
        ? [P.X(), P.Y()]
        : P;
}
