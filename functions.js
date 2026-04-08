/**
 * Asymptote-style helper library for JSXGraph
 * License: MIT
 */

const jg = {
    /**
     * Style Defaults
     */

    boardStyle: {boundingbox: [-5, 5, 5, -5], axis: true, zoom: {wheel: true, needShift: false}, pan: {enabled: true, needShift: false, needCtrl: false}},

    triangleStyle: {
      borders: {
                fixed: true,
                isDraggable: false,
                highlight: false
       },
            fixed: true,
            isDraggable: false,
            highlight: false
    },

    pointStyle: {
        size: 2,             // Default is usually 3 or 4; 2 is nice and small
        strokeColor: 'black', // The outline of the point
        fillColor: 'black',   // The inside of the point
        highlight: false
    },

    pointStyleNoLabel: {
        size: 2,             // Default is usually 3 or 4; 2 is nice and small
        strokeColor: 'black', // The outline of the point
        fillColor: 'black',   // The inside of the point
        withLabel: false,
        highlight: false
    },

    lineStyle: {
        strokeWidth: 1,
        highlight: false
    },

    circleStyle: {
        strokeWidth: 1,
        fixed: true,
        isDraggable: false,
        highlight: false
    },
    
    /**
     * Point Functions
     */
     
    /**
     * Given points A, B and real number t, returns the point P such that AP:AB = t
     * @param A first point
     * @param B second point
     * @param t real number
     * @returns interpolated point
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
     * Triangle Functions
     */

   /**
     * Given points A, B, C, returns the semiperimeter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns semiperimeter
     */
    semiperimeter: function(A, B, C) {
        return (B.Dist(C) + C.Dist(A) + A.Dist(B))/2;
    },

    /**
     * Given points A, B, C, returns the area of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns area
     */
    area: function(A, B, C) {
    const ax = (typeof A.X === 'function') ? A.X() : A[0];
    const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
    const bx = (typeof B.X === 'function') ? B.X() : B[0];
    const by = (typeof B.Y === 'function') ? B.Y() : B[1];
    const cx = (typeof C.X === 'function') ? C.X() : C[0];
    const cy = (typeof C.Y === 'function') ? C.Y() : C[1];
        return Math.abs(ax * by + bx * cy + cx * ay - ay * bx - by * cx - cy * ax)/2;
    },

    /**
     * Given points A, B, C, returns the signed area of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns signed area
     */
    signedArea: function(A, B, C) {
    const ax = (typeof A.X === 'function') ? A.X() : A[0];
    const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
    const bx = (typeof B.X === 'function') ? B.X() : B[0];
    const by = (typeof B.Y === 'function') ? B.Y() : B[1];
    const cx = (typeof C.X === 'function') ? C.X() : C[0];
    const cy = (typeof C.Y === 'function') ? C.Y() : C[1];
        return (ax * by + bx * cy + cx * ay - ay * bx - by * cx - cy * ax)/2;
    },

   /**
     * Given points A, B, C, returns the centroid of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns centroid
     */
    centroid: function(A, B, C) {
    const ax = (typeof A.X === 'function') ? A.X() : A[0];
    const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
    const bx = (typeof B.X === 'function') ? B.X() : B[0];
    const by = (typeof B.Y === 'function') ? B.Y() : B[1];
    const cx = (typeof C.X === 'function') ? C.X() : C[0];
    const cy = (typeof C.Y === 'function') ? C.Y() : C[1];

    return [(ax + bx + cx) / 3, (ay + by + cy) / 3];
},

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
    barycoord: function(A, B, C, x, y, z) {
    const ax = (typeof A.X === 'function') ? A.X() : A[0];
    const ay = (typeof A.Y === 'function') ? A.Y() : A[1];
    const bx = (typeof B.X === 'function') ? B.X() : B[0];
    const by = (typeof B.Y === 'function') ? B.Y() : B[1];
    const cx = (typeof C.X === 'function') ? C.X() : C[0];
    const cy = (typeof C.Y === 'function') ? C.Y() : C[1];

    return [(ax * x + bx * y + cx * z)/(x + y + z), (ay * x + by * y + cy * z)/(x + y + z)];
},

    /**
     * Given points A, B, C, returns the A-excenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-excenter
     */
   exradius: function(A, B, C) {
       const a = B.Dist(C);
       const s = this.semiperimeter(A, B, C);
       const K = this.area(A, B, C);

       return K/(s - a);
   }
       
    /**
     * Given points A, B, C, returns the A-excenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-excenter
     */
   excenter: function(A, B, C) {
       const a = B.Dist(C);
       const b = C.Dist(A);
       const c = A.Dist(B);

       return this.barycoord(A, B, C, -a, b, c);
   }
   
};

// Make it available globally
window.jg = jg;
