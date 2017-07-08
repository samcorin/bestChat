// Code splitting

export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({
        emojione: require('emojione')
      });
    });
  });
};
