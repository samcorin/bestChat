export const urlify = (text) => {
  var urlRegex = /((https?:\/\/|(www\.))[^\s]+)/g;

  return text.replace(urlRegex, url => {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
