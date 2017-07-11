export const dropdown = {
  init: function() {
    var el = document.querySelector('.dropdown');
    el.addEventListener('click', this.onMenuClick, false);
  },
  onMenuClick: function(event) {
    event.stopPropagation();
    var menu = document.querySelector('.dropdownMenu');

    //
    // Outise click events
    var messageList = document.getElementById('messageList');
    var conversationNavbar = document.getElementById('ConversationNavBar');

    if(menu) {
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
  }
}
//   }
// }
// var myObj = {
//   myMethod: function(params) {
//     // ...do something
//   }

//   // OR THIS WORKS TOO

//   myOtherMethod(params) {
//     // ...do something else
//   }
// };


// export const dropdown = () => {
//   var el = document.querySelector('.dropdown');
//   el.addEventListener('click', onMenuClick, false);
// }

// const onMenuClick = (event) => {
//   event.stopPropagation();
//   var menu = document.querySelector('.dropdownMenu');
//   var messageList = document.getElementById('messageList');
//   var conversationNavbar = document.getElementById('ConversationNavBar');

//   console.log("EVENT: ", event)
//   menu.classList.toggle('show');

//   messageList.addEventListener('click', () => {
//     menu.classList.remove('show');
//   }, false)

//   messageList.addEventListener('touchstart', () => {
//     menu.classList.remove('show');
//   }, false)

//   conversationNavbar.addEventListener('click', () => {
//     menu.classList.remove('show');
//   }, false)

//   conversationNavbar.addEventListener('touchstart', () => {
//     menu.classList.remove('show');
//   }, false)

// }

export default dropdown;
