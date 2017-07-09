// Handle touch/swipe events
// TODO:
// - export functions

var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;

var touchArea = document.getElementById('gesuredZone');

touchArea.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, false);

touchArea.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;
  handleGesure();
}, false);

 handleGesure = () => {
  var swiped = 'swiped: ';
  if (touchEndX < touchStartX) {
      console.log(swiped + 'left!');
  }
  if (touchEndX > touchStartX) {
      console.log(swiped + 'right!');
  }
  if (touchEndY < touchStartY) {
      console.log(swiped + 'down!');
  }
  if (touchEndY > touchStartY) {
      console.log(swiped + 'up!');
  }
  if (touchEndY == touchStartY) {
      console.log('tap!');
  }
}
