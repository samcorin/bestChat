import React from 'react';
import {render} from 'react-dom';
import App from './../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);

});

  test('adds 1 + 2 to equal 3', () => {
    expect(2).toBe(3);
  });
