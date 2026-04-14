export const boardStyle = {
  boundingbox: [-5, 5, 5, -5],
  axis: true,
  zoom: { wheel: true, needShift: false },
  pan: { enabled: true, needShift: false, needCtrl: false },
};

export const boardStyleHyperbolic = {
  boundingbox: [-1.2, 1.2, 1.2, -1.2],
  axis: true,
  zoom: { wheel: true, needShift: false },
  pan: { enabled: true, needShift: false, needCtrl: false },
};

export const pointStyleDrag = {
  showInfobox: false,
};

export const pointStyleNoDrag = {
  size: 2,
  strokeColor: "black",
  fillColor: "black",
  highlight: false,
  showInfobox: false,
};

export const pointStyleNoShow = {
  visible: false,
  withLabel: false,
};

export const pointStyleNoLabel = {
  size: 2,
  strokeColor: "black",
  fillColor: "black",
  withLabel: false,
  highlight: false,
};

export const lineStyle = {
  strokeWidth: 1,
  fixed: true,
  highlight: false,
};

export const triangleStyle = {
  fixed: true,
  draggable: false,
  highlight: false,
  borders: {
    fixed: true,
    draggable: false,
    highlight: false,
  },
};

export const circleStyle = {
  strokeWidth: 1,
  fixed: true,
  draggable: false,
  highlight: false,
};

export const circleStyleInverse = {
  strokeColor: "red",
  dash: 2,
  strokeWidth: 1,
  fixed: true,
  draggable: false,
  highlight: false,
};
