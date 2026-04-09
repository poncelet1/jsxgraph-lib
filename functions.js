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
    fixed: true,
    draggable: false,
    highlight: false,
    borders: {
        fixed: true,
        draggable: false,
        highlight: false
    }
    },

    pointStyle: {
        size: 2,             // Default is usually 3 or 4; 2 is nice and small
        strokeColor: 'black', // The outline of the point
        fillColor: 'black',   // The inside of the point
        highlight: false,
        showInfobox: false
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
        fixed: true,
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
     * Given point P, returns x and y coordinates
     * @param P point
     * @returns [x, y]
     */
    getXY: function(P) {
    return (typeof P.X === 'function')
        ? [P.X(), P.Y()]
        : P;
    },

    /**
     * Given points A, B, returns the distance betweeen A and B
     * @param A first point
     * @param B second point
     * @returns distance
     */
    dist(A, B) {
    const [ax, ay] = this.getXY(A);
    const [bx, by] = this.getXY(B);
    return Math.hypot(bx - ax, by - ay);
    },
     
    /**
     * Given points A, B and real number t, returns the point P such that AP:AB = t
     * @param A first point
     * @param B second point
     * @param t real number
     * @returns interpolated point
     */
    interp: function(A, B, t) {
        const [ax, ay] = this.getXY(A);
        const [bx, by] = this.getXY(B);
        
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
        return (this.dist(A,B) + this.dist(A,C) + this.dist(B,C))/2;
    },

    /**
     * Given points A, B, C, returns the area of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns area
     */
    area: function(A, B, C) {
    const [ax, ay] = this.getXY(A);
    const [bx, by] = this.getXY(B);
    const [cx, cy] = this.getXY(C);
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
    const [ax, ay] = this.getXY(A);
    const [bx, by] = this.getXY(B);
    const [cx, cy] = this.getXY(C);
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
    const [ax, ay] = this.getXY(A);
    const [bx, by] = this.getXY(B);
    const [cx, cy] = this.getXY(C);

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
    const [ax, ay] = this.getXY(A);
    const [bx, by] = this.getXY(B);
    const [cx, cy] = this.getXY(C);

    return [(ax * x + bx * y + cx * z)/(x + y + z), (ay * x + by * y + cy * z)/(x + y + z)];
},

    /**
     * Given points A, B, C, returns the A-exradius of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-exradius
     */
   exradius: function(A, B, C) {
       const a = this.dist(B,C);
       const s = this.semiperimeter(A, B, C);
       const K = this.area(A, B, C);

       return K/(s - a);
   },
       
    /**
     * Given points A, B, C, returns the A-excenter of triangle ABC
     * @param A first point
     * @param B second point
     * @param C third point
     * @returns A-excenter
     */
   excenter: function(A, B, C) {
       const a = this.dist(B,C);
       const b = this.dist(A,C);
       const c = this.dist(A,B);

       return this.barycoord(A, B, C, -a, b, c);
   },

    /**
 * Creates the A-excircle of triangle ABC on a given board
 * @param board JSXGraph board
 * @param A first point
 * @param B second point
 * @param C third point
 * @param style optional circle style
 * @returns A-excircle
 */
 excircle: function(board, A, B, C, style = this.circleStyle) {
    const center = () => this.excenter(A, B, C);
    const radius = () => this.exradius(A, B, C);
    return board.create('circle', [center, radius], style);
}
   
};

// Make it available globally
window.jg = jg;
