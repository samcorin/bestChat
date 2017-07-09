export const objToArray = (obj) => {
  return Object.keys(obj).map(i => obj[i]);
}

export const objKeysToArray = (obj) => {
  return Object.keys(obj).map(i => i);
}

export const objSwap = (obj) => {
  let result = {};
  Object.keys(obj).map(i => {
    return result[obj[i]] = i;
  });
  return result;
}

// Sort an array of objects "messages", and sorts them.
export const sortMessages = (obj) => {
  return Object.keys(obj).map((item) => {
    return obj[item]
  }).sort((a, b) => b[b.length - 1].createdAt - a[a.length - 1].createdAt);
}

// Sort an array of objects "messages", and returns only the latest ones.
export const latestMessages = (obj) => {
  return Object.keys(obj).map((item) => {
    return obj[item][obj[item].length - 1]
  }).sort((a, b) => b.createdAt - a.createdAt);
}
