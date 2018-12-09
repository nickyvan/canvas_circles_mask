export const normalize = (value, min, max) => {
  return (value - min) / (max - min);
};

export const interpolate = (value, min, max) => {
  return min + (max - min) * value;
};

export const map = (value, min1, max1, min2, max2) => {
  return interpolate(normalize(value, min1, max1), min2, max2);
};
export const findPreferredRatio =(width, height, maxWidth, maxHeight)=> {
  let dw = maxWidth / width;
  let dh = maxHeight / height;
  return dw > dh ? dw : dh;
}
