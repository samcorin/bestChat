import { objToArray, objKeysToArray } from './../utils/objToArray.js';

const objKeys = { one: {},  two: {}};

describe('Convert Objects to Arrays', () => {
  it('should return an array of objects', () => {
    expect(
      objToArray({ message1: { text: 'Hello!' }, message2: { text: 'Welcome!' }}))
      .toEqual([{text: "Hello!"}, {text: "Welcome!"}]);
  });

  it('should return an array of keys', () => {
    expect(objKeysToArray(objKeys))
    .toEqual(['one', 'two']);
  });
});
