/**
 * Asymptote-style helper library for JSXGraph
 * License: MIT
 */

const jg = {
    /**
     * Point Functions
     */
     
    /**
     * Linear interpolation between two points A and B.
     * @param {Point|Array} A - Starting point (JSXGraph point or [x,y])
     * @param {Point|Array} B - Ending point (JSXGraph point or [x,y])
     * @param {Number} t - Interpolation factor (0 to 1)
     * @returns {Array} [x, y] coordinates
     */
    interp: function(A, B, t) {
        const ax = (typeof A.X === 'function') ? A.X() : A[0];
        const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
        const bx = (typeof B.X === 'function') ? B.X() : B[0];
        const by = (typeof B.Y === 'function') ? B.Y() : B[1];

        return [
            ax + t * (bx - ax),
            ay + t * (by - ay)
        ];
    },

    /**
     * Returns the midpoint between two points.
     */
    midpoint: function(A, B) {
        return this.interp(A, B, 0.5);
    }

    /**
     * Triangle Functions
     */

    // Add this to your jg object in jg.js
centroid: function(A, B, C) {
    const ax = (typeof A.X === 'function') ? A.X() : A[0];
    const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
    const bx = (typeof B.X === 'function') ? B.X() : B[0];
    const by = (typeof B.Y === 'function') ? B.Y() : B[1];
    const cx = (typeof C.X === 'function') ? C.X() : C[0];
    const cy = (typeof C.Y === 'function') ? C.Y() : C[1];

    return [(ax + bx + cx) / 3, (ay + by + cy) / 3];
}
};

// Make it available globally
window.jg = jg;
