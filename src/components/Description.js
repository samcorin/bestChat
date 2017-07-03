import React, {Component} from 'react';
import './Description.css';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    if(this.state.show) {
      return (
        <div className="dText">
          <div>
            <h1>bestChat</h1><p>v0.1</p>
          </div>

          <p><em>What if 'Apps' were URLs?</em></p>

          <h4><em>bestChat is intended for mobile devices.</em></h4>

          <h2>Features</h2>

          <h4>Messaging</h4>
          <p>Real time, WebSocket powered communication.</p>

          <h4>Calls</h4>
          <p>Video and audio chat is moslty available on mobile browsers thanks to the <em>navigator.getUserMedia API</em>. Just waiting for you, iOS 11.</p>

          <h4>Miit</h4>
          <p>Recommends convenient places of interest for you and your friends, </p>

          <h4>Why another *#@?&$ chat app?</h4>

          <p>It's fun to try stuff.</p>

          <ul>
            <li className="why">- bestChat is a Progressive Web App. It works just like a native application.</li>
            <li className="why">- It's <strong>Evergreen</strong>. Self updating. No need to download any updates.</li>
            <li className="why">- No Login. No email. No passwords to remember. Each instance is tied to your device.</li>
          </ul>


          <h4>Release Notes</h4>
          <ul>
            <li><h4>v0.1</h4></li>
            <li>Basic chat works</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dText">
          <div className="dHeader">
            <h1>bestChat</h1><p>v0.2</p><div className="headerSpace"></div><p>(200kb~)</p>
          </div>
          <p><em>Mobile-ready</em>, <em>evergreen</em>, <em>light</em>, <em>fast.</em></p>

          <h4>Features</h4>
          <ul>
            <li> - Evergreen, self-updating.</li>
            <li> - <em>Miit</em>. Venue recommendation based on your group's whereabouts. (TBA)</li>
            <li> - Video and audio calls.</li>
            <li> - Compatible across the board.</li>
            <li> - Lightweight.</li>
            <li> - It's fast.</li>
            <li> - 100% JavaScript.</li>

          </ul>

          <p>bestChat started as a playground. A few hours for me to learn how to use socket.io to make a simple communication client. But it grew into much more than that.</p>

          <div className="dSubHeader">
            <h3>Why</h3>
          </div>
          <p>As an aspiring software developer, I decided to challenge myself and build something interesting. I wanted to avoid the iOS vs Android, Desktop vs mobile line of argumentation and just make something that would work across devices. All of them, new or old. It needed to be a challenge, so it's as close to a full featured chat application I could make in a short time.</p>
          <p>It needed to fulfill several criteria. It had to be interesting and hard to work on. It needed to take into account the differing states of API adoption across mobile browsers.</p>


          <div className="dSubHeader">
            <h3>Firebase </h3><div className="headerSpace"></div><p>(storage, communication, presence)</p>
          </div>

          <p>There are times that writing code is hard and you end up wasting a lot of time. Investing in the wrong technology is one example. For this project it went like this: <a href="https://socket.io" className="strikethrough">socket.io</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" className="strikethrough">WebSockets</a>, emotional plunge into the depths of hell and finally Firebase.</p>

          <p>The whole process took a lot of time. Too much to be exact. It meant rewriting large parts of the application, twice. Socket.io was meant as a simple solution for handling communication between clients, but I figure it's just an additional layer of abstraction that you don't need. WebSockets, adopted by all browsers, cut down the excess space socket.io was taking up, but you need to learn it. </p>
          <p>One downside though, it's a little heavy. It takes up 54kb~ of the bundle. That's only the database module... If for whatever reason you want to user any other modules, say 'auth', you're going to pay.</p>


          <p>Firebase handles a lot of the logic Previously handled by socket.io</p>
          <p>Seeing as Firebase was handling data storage and it's capable of doing everything I need, I used this instead.</p>

          <h3>Changelog</h3>
          <ul className="toc">
            <li>v0.2 - Firebase now handles communication. Performance tweaks </li>
            <li>v0.1 - Basic chat. Basic styling.</li>
          </ul>

        </div>
      );
    }
  }
}

export default Description;
