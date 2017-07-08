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

export const sortMessages = (obj) => {
  return Object.keys(obj).map((item) => {
    return obj[item]
  }).sort((a, b) => a[a.length -1].createdAt < b[b.length -1].createdAt);
}
