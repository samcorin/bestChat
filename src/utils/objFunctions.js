export const objToArray = (obj) => {
  return Object.keys(obj).map(i => obj[i]);
}

export const objKeysToArray = (obj) => {
  return Object.keys(obj).map(i => i);
}

export const objSwap = (obj) => {
  let result = {};
  Object.keys(obj).map(i => {
    result[obj[i]] = i;
  });
  return result;
}
