// Code splitting
// Load this only when ChatInput component mounts

export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({
        emojione: require('emojione')
      });
    });
  });
};
