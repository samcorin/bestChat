export const urlify = (text) => {
  var urlRegex = /((https?:\/\/|(www\.))[^\s]+)/g;

  return text.replace(urlRegex, url => {
    return url.indexOf('http') !== -1 ?
      `<a href="${url}" target="_blank">${url}</a>` :
      `<a href="http://${url}" target="_blank">${url}</a>`;
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
