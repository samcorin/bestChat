// Vanilla JS Tabs
// Replacement for Material-ui

export const Tabsly = () => {
  var el = document.getElementById('nav-tab');
  el.addEventListener('click', onTabClick, false);
}

const onTabClick = (event) => {
  var actives = document.querySelectorAll('.active');

  // deactivate existing active tab and panel
  for (var i=0; i < actives.length; i++){
    actives[i].classList.remove('active');
  }

  console.log("taget: ", event.target);
  var ref = event.target.parentElement.id;

  // Make new tab active
  event.target.parentElement.classList.add('active');

  // Make content active
  var activeContent = document.getElementById(ref.split('tab-')[1]);
  activeContent.classList.add('active');
}

export default Tabsly;
