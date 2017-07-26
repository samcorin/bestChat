export const screenTest = () => {

  // Put variables in global scope to make them available to the browser console.
  var video = document.querySelector('video');
  var canvas = window.canvas = document.querySelector('canvas');
  // canvas.width = 480;
  // canvas.height = 360;

  var el = document.getElementById('takeSnapshot');
  var overlay = document.getElementById('canvasOverlay');
  el.onclick = function() {
    overlay.classList.add('hidden');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  var constraints = {
    audio: false,
    video: true
  };

  function success(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
  }

  function error(err) {
    console.log('navigator.getUserMedia error: ', err);
  }

  navigator.mediaDevices.getUserMedia(constraints).
    then(success).catch(error);

  }