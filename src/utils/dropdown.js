export const dropdown = () => {
  var el = document.querySelector('.dropdown');
  el.addEventListener('click', onMenuClick, false);
}

const onMenuClick = (event) => {
  event.stopPropagation();
  var menu = document.querySelector('.dropdownMenu');
  var messageList = document.getElementById('messageList');
  var conversationNavbar = document.getElementById('ConversationNavBar');

  menu.classList.toggle('show');

  messageList.addEventListener('click', () => {
    menu.classList.remove('show');
  }, false)

  messageList.addEventListener('touchstart', () => {
    menu.classList.remove('show');
  }, false)

  conversationNavbar.addEventListener('click', () => {
    menu.classList.remove('show');
  }, false)

  conversationNavbar.addEventListener('touchstart', () => {
    menu.classList.remove('show');
  }, false)


}

export default dropdown;
