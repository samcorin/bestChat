export const objToArray = (obj) => {
  return Object.keys(obj).map(i => obj[i]);
}

export const objKeysToArray = (obj) => {
  return Object.keys(obj).map(i => i);
}
