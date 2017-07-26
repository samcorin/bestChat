import database from './../../firebase';

//this makes sure that our code will work on different browsers
export const peerConnection = () => {
  var RTCPeerConnection = window.webkitRTCPeerConnection;

  var yourVideo = document.getElementById("videoCapture");
  var friendsVideo = document.getElementById("takeSnapshot");
  var yourId = Math.floor(Math.random()*1000000000);
  var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'}]};
  var pc = new RTCPeerConnection(servers);
  pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
  pc.onaddstream = (event => friendsVideo.srcObject = event.stream);

  function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    msg.remove();
  }

  function readMessage(data) {
      var msg = JSON.parse(data.val().message);
      var sender = data.val().sender;
      if (sender != yourId) {
          if (msg.ice != undefined)
              pc.addIceCandidate(new RTCIceCandidate(msg.ice));
          else if (msg.sdp.type == "offer")
              pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => pc.createAnswer())
                .then(answer => pc.setLocalDescription(answer))
                .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
          else if (msg.sdp.type == "answer")
              pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
  };

  database.on('child_added', readMessage);

  function showMyFace() {
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then(stream => yourVideo.srcObject = stream)
      .then(stream => pc.addStream(stream));
  }

  function showFriendsFace() {
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer) )
      .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
  }
}