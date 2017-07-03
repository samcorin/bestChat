import React from 'react';
// import App from './components/App.js';

function sum(a, b) {
  return a + b;
}

describe('Just testing', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(2, 2)).toBe(3);
  });

  test('this test will not run', () => {
    expect('A').toBe('b');
  });

});
