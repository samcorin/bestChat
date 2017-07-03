import React, { Component } from 'react';
import BottomNav from './../BottomNav';
import './../BottomNav.css';
import './../App.css';
import './Calls.css';
import CallsNavBar from './CallsNavBar';
import trace from './../../utils/trace';
// import {Tabs, Tab} from 'material-ui/Tabs';
// import SwipeableViews from 'react-swipeable-views';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// temporarily remove swipeable views.

class Calls extends Component {
  constructor(props) {
    super(props);

    this.startCall = this.startCall.bind(this);
    this.call = this.call.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.onIceCandidate = this.onIceCandidate.bind(this);
    this.onIceStateChange = this.onIceStateChange.bind(this);
    this.getName = this.getName.bind(this);
    this.getOtherPc = this.getOtherPc.bind(this);
    this.gotRemoteStream = this.gotRemoteStream.bind(this);
    this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this);
    this.onSetLocalSuccess = this.onSetLocalSuccess.bind(this);
    this.onCreateSessionDescriptionError = this.onCreateSessionDescriptionError.bind(this);
    this.onSetRemoteSuccess = this.onSetRemoteSuccess.bind(this)
    this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this)
    this.pc1 = null;
    this.pc2 = null;
    this.startTime;
    this.servers = null;
    this.audioTracks = null;
    this.videoTracks = null;
    this.localStream = null;
    this.offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 0
    };
  }

  componentDidMount() {
    this.startButton = document.getElementById('startCallButton');
    this.callButton = document.getElementById('callButton');
    this.localVideo = document.getElementById('localVideo');
    this.remoteVideo = document.getElementById('remoteVideo');
    this.upgradeButton = document.getElementById('upgradeButton');
  }

  startCall() {
    trace('Requesting local stream');
    this.startButton.disabled = true;
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(stream => this.gotStream(stream))
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }

  gotStream(stream) {
    trace('Received local stream');
    this.localVideo.srcObject = stream;
    this.localStream = stream;
    // this.callButton.disabled = false;
  }

  call() {
    trace('Starting call');
    // this.startTime = window.performance.now();
    this.audioTracks = this.localStream.getAudioTracks();
    if (this.audioTracks.length > 0) {
      trace('Using audio device: ' + this.audioTracks[0].label);
    }
    this.pc1 = new RTCPeerConnection(this.servers);
    trace('Created local peer connection object this.pc1');
    this.pc1.onicecandidate = function(e) {
      this.onIceCandidate(this.pc1, e);
    };
    this.pc2 = new RTCPeerConnection(this.servers);
    trace('Created remote peer connection object this.pc2');
    this.pc2.onicecandidate = function(e) {
      this.onIceCandidate(this.pc2, e);
    };
    this.pc1.oniceconnectionstatechange = function(e) {
      this.onIceStateChange(this.pc1, e);
    };
    this.pc2.oniceconnectionstatechange = function(e) {
      this.onIceStateChange(this.pc2, e);
    };
    this.pc2.ontrack = this.gotRemoteStream;

    var _pc1 = this.pc1;
    var _localStream = this.localStream;

    this.localStream.getTracks().forEach(
      function(track) {
        this.pc1.addTrack(
          track,
          this.localStream
        );
      }
    ).bind(this.localStream, this.pc1);
    trace('Added local stream to pc1');

    trace('pc1 createOffer start');
    this.pc1.createOffer(
      this.offerOptions
    ).then(
      this.onCreateOfferSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  upgrade() {
    var _videoTracks = this.videoTracks;
    var _localStream = this.localStream;
    var _localVideo = this.localVideo;
    var _pc1 = this.pc1;
    var _pc2 = this.pc2;

    this.upgradeButton.disabled = true;

    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
      _videoTracks = stream.getVideoTracks();
      if (_videoTracks.length > 0) {
        trace('Using video device: ' + _videoTracks[0].label);
      }
      _localStream.addTrack(_videoTracks[0]);
      _localVideo.srcObject = null;
      _localVideo.srcObject = _localStream;
      _pc1.addTrack(
        _videoTracks[0],
        _localStream
      );
      return _pc1.createOffer();
    })
    .then(function(offer) {
      return _pc1.setLocalDescription(offer);
    })
    .then(function() {
      return _pc2.setRemoteDescription(_pc1.localDescription);
    })
    .then(function() {
      return _pc2.createAnswer();
    })
    .then(function(answer) {
      return _pc2.setLocalDescription(answer);
    })
    .then(function() {
      return _pc1.setRemoteDescription(_pc2.localDescription);
    });
  }

  gotRemoteStream(e) {
    console.log('gotRemoteStream', e.track, e.streams[0]);

    // reset srcObject to work around minor bugs in Chrome and Edge.
    this.remoteVideo.srcObject = null;
    this.remoteVideo.srcObject = e.streams[0];
  }

  onIceCandidate(pc, event) {
    this.getOtherPc(pc).addIceCandidate(event.candidate)
    .then(
      function() {
        this.onAddIceCandidateSuccess(pc);
      },
      function(err) {
        this.onAddIceCandidateError(pc, err);
      }
    );
    trace(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
        event.candidate.candidate : '(null)'));
  }

  getName(pc) { return (pc === this.pc1) ? 'pc1' : 'pc2'; }
  getOtherPc(pc) { return (pc === this.pc1) ? this.pc2 : this.pc1; }

  onIceStateChange(pc, event) {
    if (pc) {
      trace(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  onCreateOfferSuccess(desc) {
    trace('Offer from pc1\n' + desc.sdp);
    trace('pc1 setLocalDescription start');
    this.pc1.setLocalDescription(desc).then(
      function() {
        this.onSetLocalSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError
    );
    trace('pc2 setRemoteDescription start');
    this.pc2.setRemoteDescription(desc).then(
      function() {
        this.onSetRemoteSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError
    );
    trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2.createAnswer().then(
      this.onCreateAnswerSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onSetLocalSuccess(pc) {
    trace(this.getName(pc) + ' setLocalDescription complete');
  }

  onCreateAnswerSuccess(desc) {
    trace('Answer from pc2:\n' + desc.sdp);
    trace('pc2 setLocalDescription start');
    this.pc2.setLocalDescription(desc).then(
      function() {
        this.onSetLocalSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError
    );
    trace('pc1 setRemoteDescription start');
    this.pc1.setRemoteDescription(desc).then(
      function() {
        this.onSetRemoteSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError
    );
  }

  onSetRemoteSuccess(pc) {
    trace(this.getName(pc) + ' setRemoteDescription complete');
  }

  onCreateSessionDescriptionError(error) {
    trace('Failed to create session description: ' + error.toString());
  }

  // Take snapshot code here
  // startVideo() {
  //   // if(window.stream == undefined) { return; }
  //   if (navigator.mediaDevices) {
  //     var video = document.getElementById('video');
  //     var photo = document.getElementById('btnPhoto');
  //     var stop = document.getElementById('btnStop');
  //     var canvas = document.getElementById("canvas");
  //     var context = canvas.getContext("2d")

  //     navigator.mediaDevices.getUserMedia({ video: true, video: { frameRate: { ideal: 16, max: 24 } }, audio: false })
  //     .then(function onSuccess(stream) {
  //       // temp window obj
  //       window.stream = stream;
  //       video.autoplay = true;
  //       video.srcObject = stream;
  //       // To stop:
  //       // stream.getTracks().forEach(function(track) { track.stop(); })

  //       photo.addEventListener("click", function() {
  //         context.drawImage(video, 0, 0, 320, 240);
  //       });

  //       stop.addEventListener("click", function() {
  //         window.stream.getTracks().forEach(function(track) { track.stop(); })
  //         // this.setState({
  //         //   available: false
  //         // })
  //       });

  //     })
  //     .catch(function onError() {
  //       alert('There has been a problem retreiving the streams - are you running on file:/// or did you disallow access?');
  //     });
  //   } else {
  //     console.log('getUserMedia is not supported in this browser.');
  //   }
  // }

  render() {
    return (
      <div className="waiting">
        <CallsNavBar />
        <div>
          <section>
            <button id="startCallButton" onClick={this.startCall}>Start Call</button>
            <button id="callButton" onClick={this.call}>Call</button>
            <button id="upgradeButton" onClick={this.upgrade}>Upgrade</button>

          </section>
          <video id="localVideo" autoPlay muted></video>
          <video id="remoteVideo" autoPlay muted></video>
          <div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
}
          // {this.state.available && <video id="video" width="259" height="200"></video>}
          // <button onClick={this.handleAvailability}>Press</button>
            // <canvas id="canvas" width="160" height="100"></canvas>

export default Calls;
