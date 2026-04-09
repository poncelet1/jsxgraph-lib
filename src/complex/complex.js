/**
     * Given point Z, returns the complex conjugate of Z
     * @param Z point
     * @returns conjugate
     */
export function complexConjugate(Z) {
    const [zx, zy] = getXY(Z);
    
    return [zx, -zy];
}
