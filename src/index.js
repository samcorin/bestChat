import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import init from './init'
import registerServiceWorker from './registerServiceWorker';
const store = require('./store').configure();

// Listen for changes to store
// var unsubscribe = store.subscribe(() => {
//   console.log("Subscribe State: ", store.getState());
// });

init(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// registerServiceWorker();

