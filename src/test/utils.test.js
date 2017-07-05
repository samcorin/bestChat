import { objToArray, objKeysToArray, objSwap} from './../utils/objFunctions';

const objKeys = { one: {},  two: {}};

describe('Perform changes to objects', () => {
  it('should return an array of objects', () => {
    expect(
      objToArray({ message1: { text: 'Hello!' }, message2: { text: 'Welcome!' }}))
      .toEqual([{text: "Hello!"}, {text: "Welcome!"}]);
  });

  it('should return an array of keys', () => {
    expect(objKeysToArray(objKeys))
    .toEqual(['one', 'two']);
  });

  it('should swap keys and values', () => {
    expect(objSwap({ 'someID': 1}))
    .toEqual({'1': 'someID'});
  });

});
