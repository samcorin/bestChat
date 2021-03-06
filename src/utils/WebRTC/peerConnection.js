import firebase, { database, conversationsRef } from './../../firebase';

//this makes sure that our code will work on different browsers
export const peerConnection = {
  yourId: null,
  pc: null,
  metaRef: null,
  yourVideo: null,
  friendsVideo: null,
  servers: null,
  init: function(roomId) {
    console.log("PeerConnection")
    this.metaRef = conversationsRef.child(`${roomId}/meta/call`);
    // let metaRef = firebase.database().ref(`${roomId}/meta/call`);
    
    this.RTCPeerConnection = window.webkitRTCPeerConnection;
    var myHostname = window.location.hostname;

    // var yourVideo = document.getElementById("videoCapture");
    // var friendsVideo = document.getElementById("takeSnapshot");
    this.yourId = Math.floor(Math.random()*1000000000);
    // this.servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'}]};
    
    // this.pc = new RTCPeerConnection(this.servers);
    this.pc = new RTCPeerConnection({
      iceServers: [     // Information about ICE servers - Use your own!
        {
          urls: "turn:" + myHostname,  // A TURN server
          username: "webrtc",
          credential: "turnserver"
        }
      ]
    });

    let id = this.yourId;
    this.pc.onicecandidate = (event => event.candidate ? 
      
      this.sendMessage(id, JSON.stringify({'ice': event.candidate}))
       : console.log("Sent All Ice"))

    this.pc.onaddstream = (event => this.friendsVideo.srcObject = event.stream);
    
    var offerCreated = function(localDesc) {
      var sd = new RTCSessionDescription(localDesc);
      this.pc.setLocalDescription(sd, function() {
        console.log("SET LOCAL DESC")
        this.metaRef.update({offer: true})
      })
    }

    this.showMyFace();
    // RTCPeerConnection.createOffer()
    
    

    // metaRef.update({ sender: id, message: 'hio' });
    // this.metaRef.on('child_changed', this.readMessage);
  
    // function sendMessage(senderId, data) {
    //   console.log("Send Message")
    //   var msg = this.metaRef.push({ sender: senderId, message: data });
    //   this.metaRef.remove();
    // }

    // function readMessage(res) {
    //   console.log("readMessage ", res.val()); 
    //   var data = res.val();
    //   var msg = data.message;
    //   var sender = data.sender;
    //   if (sender != this.yourId) {
    //     if (msg.ice != undefined)
    //       this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
    //     else if (msg.sdp.type == "offer")
    //       this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
    //         .then(() => this.pc.createAnswer())
    //         .then(answer => this.pc.setLocalDescription(answer))
    //         .then(() => sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
    //     else if (msg.sdp.type == "answer")
    //       this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    //   }
    // };



    function showFriendsFace() {
      this.pc.createOffer()
        .then(offer => this.pc.setLocalDescription(offer) )
        .then(() => this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})) );
    }
  },
  listen: function(roomId) {
    console.log("peer listentning...")

    this.yourVideo = document.getElementById("videoCapture");
    this.friendsVideo = document.getElementById("takeSnapshot");

    // this.servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'}]};
    

    // this.yourId = Math.floor(Math.random()*1000000000);
    
    // this.RTCPeerConnection = window.webkitRTCPeerConnection;
    // // let RTCPeerConnection = window.webkitRTCPeerConnection;
    // this.pc = new this.RTCPeerConnection(this.servers);

    // this.pc.onicecandidate = (event) => {
    //   console.log("ICE")
    //   event.candidate ? this.sendMessage(this.yourId, JSON.stringify({'ice': event.candidate})) 
    //   : console.log("Sent All Ice");
    // }
    // this.pc.onaddstream = (event => this.friendsVideo.srcObject = event.stream);

    
    this.metaRef = conversationsRef.child(`${roomId}/meta/call`);
    // metaRef.on('child_changed', this.readMessage.bind(this));
    this.metaRef.on('child_changed', snapshot => {
      console.log("SNAP: ", snapshot.val())
    });

  },
  readMessage: function(res) {
    console.log("readMessage ", res.val()); 
    var data = res.val();
    var msg = data.message;
    console.log("msg: ", data)
    // var msg = JSON.parse(data.message);
    var sender = data.sender;
    if (sender !== this.yourId) {
      console.log("MESSAGE FROM USER: ", sender)
      if (!!msg || msg.ice !== 'undefined')
        this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      else if (msg.sdp.type == "offer")
        this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => this.pc.setLocalDescription(answer))
          .then(() => this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
      else if (msg.sdp.type == "answer")
        this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
  },
  sendMessage: function(senderId, data) {
    console.log("Send Message")
    var msg = this.metaRef.update({ sender: senderId, message: data });
    this.metaRef.remove();
  },
  showMyFace: function() {
    let _yourVideo = this.yourVideo;
    console.log('_yourVideo: ', _yourVideo, this.yourVideo)
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then(stream => _yourVideo.srcObject = stream)
      .then(stream => this.pc.addStream(stream));
      // console.log("stream, ", stream)
      // this.yourVideo.style.opacity = 1;
  }
}