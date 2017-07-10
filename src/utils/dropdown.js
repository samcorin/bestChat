export const dropdown = () => {
  var el = document.querySelector('.dropdown');
  el.addEventListener('click', onMenuClick, false);
}

const onMenuClick = (event) => {
  event.stopPropagation();
  var el = document.querySelector('.dropdownMenu');
  console.log("EL: ", el)
  el.classList.toggle('show');

  // // deactivate existing active tab and panel
  // for (var i=0; i < actives.length; i++){
  //   actives[i].classList.remove('active');
  // }

  // var ref = event.target.parentElement.id;

  // // Make new tab active
  // event.target.parentElement.classList.add('active');

  // // Make content active
  // var activeContent = document.getElementById(ref.split('tab-')[1]);
  // activeContent.classList.add('active');
}

export default dropdown;
