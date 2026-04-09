export function getXY(P) {
    return (typeof P.X === 'function')
        ? [P.X(), P.Y()]
        : P;
}
