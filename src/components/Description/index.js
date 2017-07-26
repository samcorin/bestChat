import React, {Component} from 'react';
// import {JavaScriptIcon, ReactIcon, ReduxIcon, FirebaseIcon, NodeIcon, ExpressIcon, GithubIcon} from './TechIcons';
import './Description.css';

export const Description = () => {
  return (
    <div className="description">
      <div className="welcome">
        <div className="welcomeWrapper">
          <div className="appHeader">
            <h1 className="head">bestChat</h1>
            <p className="headVer">v0.5</p>
          </div>
          <h2 className="title1">Performance and functionality in the browser</h2>
        </div>
        <div className="readMore">
          Scroll for more...
        </div>
      </div>
      <div className="Features">
        <p className="featuresText">Building web apps generally means forfeiting some features, most notably a rich UI/UX. Yet, it is possible to develop something that closely resembles a native application. This can be accomplished by proper planning, the right choice of tooling, libraries and frameworks.</p>
        <p className="featuresText">bestChat is an attempt to replicate a feature rich native application, while at the same time remain performant across a range of mobile devices.</p>
        
        <p className="title4">Features</p>
        <ul className="featureList">
          <li> - Mobile first</li>
          <li> - Lightweight</li>
          <li> - Superfast. Interactive in less than 2 seconds</li>
          <li> - Evergreen (self-updating)</li>
          <li> - Real-time, bidirectional, event-based communication with Firebase</li>
          <li> - Miit: convenient venue recommendation for you and your friends</li>
          <li> - WebRTC enabled video and audio calls</li>
          <li> - A chatbot with the worlds lowest IQ</li>
          <li> - Compatible and performant across all browsers, desktop and mobile.</li>
          <li> - Login-less. No passwords to remember. Each instance is tied to your device. <em>*experimental*</em></li>
          <li> - ~90kb bundle size</li>
        </ul>
        
        <br/>
        
        <p className="title4">Calls</p>
        <p className="featuresText">Video and audio calls are possible across a range of Android phones and all browsers with the use of WebRTC. Just waiting on mobile Safari to adopt the standard. That's coming with iOS11.</p>

        <p className="title4">Miit</p>
        <p className="featuresText">The idea for this is simple: convenient and cool venue recommendations for everyone in your group. This module leverages the power of Google Maps API.</p>
        <p className="featuresText">To improve the initial load, bestChat lazy loads Google Maps.</p>

        <p className="title4">Games</p>
        <p className="featuresText">The potential here is almost limitless. You could add almost any web game that exists, even multiplayer.</p>
        
        <p className="title4">Easter eggs</p>
        <p className="featuresText">There are several easter eggs hidden throughout the app, from the obvious to the near impossible to find.</p>
        
        <br/>
        
        {/* <div className="journey">
          <p className="title4">The Journey: Part I</p>
          <p className="featuresText">This project began as a way to practice using Socket.io. But it quickly grew into a playground to test out some of the latest tech and tools in web development.</p> 
          <p className="featuresText">Firebase was only used to store user and message data. So a separate layer for WebSockets was used for communication. There are times that writing code is hard and you end up wasting a lot of time. For the communication part of this project it went like this: <a href="https://socket.io" className="strikethrough">socket.io</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" className="strikethrough">WebSockets</a> then Firebase.</p>
          <p className="featuresText">Changes to the database are pushed to the client so there is no need for the user to reload or refresh the app, only receiving little messages instead of downloading big chunks of data. Events like new messages and changes in user connection status all happen in real-time.</p>
        </div> */}
      
      </div>
    </div>
  )
}

export default Description;

// return (
//   <div className="dText">
//     <div className="dHeader">
//       <h1>bestChat</h1><p>v0.5</p>
//     </div>
//     <p>A <em>mobile-first</em>, <em>evergreen</em>, <em>superfast </em> webapp.</p>

//     <p>bestChat started as a playground, a technical demo to play around with different technologies.</p>

//     <h3>The Stack</h3>
//     <div className="tech">
//       <JavaScriptIcon />

//       <ReactIcon />

//       <ReduxIcon />

//       <FirebaseIcon />

//       <NodeIcon />

//       <ExpressIcon />

//       <svg viewBox="0 0 128 128" className="techIcon">
//       <path fill="#E44D26" d="M27.854 116.354l-8.043-90.211h88.378l-8.051 90.197-36.192 10.033z"></path><path fill="#F16529" d="M64 118.704l29.244-8.108 6.881-77.076h-36.125z"></path><path fill="#EBEBEB" d="M64 66.978h-14.641l-1.01-11.331h15.651v-11.064h-27.743l.264 2.969 2.72 30.489h24.759zM64 95.711l-.049.013-12.321-3.328-.788-8.823h-11.107l1.55 17.372 22.664 6.292.051-.015z"></path><path d="M28.034 1.627h5.622v5.556h5.144v-5.556h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623v-16.822zM51.816 7.206h-4.95v-5.579h15.525v5.579h-4.952v11.243h-5.623v-11.243zM64.855 1.627h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502v-16.822zM86.591 1.627h5.624v11.262h7.907v5.561h-13.531v-16.823z"></path><path fill="#fff" d="M63.962 66.978v11.063h13.624l-1.284 14.349-12.34 3.331v11.51l22.682-6.286.166-1.87 2.6-29.127.27-2.97h-2.982zM63.962 44.583v11.064h26.725l.221-2.487.505-5.608.265-2.969z"></path>
//       </svg>

//       <svg viewBox="0 0 128 128" className="techIcon">
//       <path fill="#131313" d="M89.234 5.856h-7.384l7.679 8.333v3.967h-15.816v-4.645h7.678l-7.678-8.333v-3.971h15.521v4.649zm-18.657 0h-7.384l7.679 8.333v3.967h-15.817v-4.645h7.679l-7.679-8.333v-3.971h15.522v4.649zm-18.474.19h-7.968v7.271h7.968v4.839h-13.632v-16.949h13.632v4.839z"></path><path fill="#1572B6" d="M27.613 116.706l-8.097-90.813h88.967l-8.104 90.798-36.434 10.102-36.332-10.087z"></path><path fill="#33A9DC" d="M64.001 119.072l29.439-8.162 6.926-77.591h-36.365v85.753z"></path><path fill="#fff" d="M64 66.22h14.738l1.019-11.405h-15.757v-11.138h27.929000000000002l-.267 2.988-2.737 30.692h-24.925v-11.137z"></path><path fill="#EBEBEB" d="M64.067 95.146l-.049.014-12.404-3.35-.794-8.883h-11.178999999999998l1.561 17.488 22.814 6.333.052-.015v-11.587z"></path><path fill="#fff" d="M77.792 76.886l-1.342 14.916-12.422 3.353v11.588l22.833-6.328.168-1.882 1.938-21.647h-11.175z"></path><path fill="#EBEBEB" d="M64.039 43.677v11.136999999999999h-26.903000000000002l-.224-2.503-.507-5.646-.267-2.988h27.901zM64 66.221v11.138h-12.247l-.223-2.503-.508-5.647-.267-2.988h13.245z"></path>
//       </svg>

//       <GithubIcon />


//       <a href="https://www.heroku.com" >
//         <svg viewBox="0 0 128 128" className="techIcon">
//         <path fill="#6762A6" d="M35.3 101.8c-4 0-7.3.5-9.7 1.4-.9 3.2-1.3 6.6-1.3 10.4 0 7 1.2 11.3 9.2 11.3 3.7 0 6.8-1.1 9.3-2.3l-.8-3.6c-2.4.9-5.5 1.7-8.2 1.7-3.5 0-4.6-.9-4.8-6.9h15v-2.2c0-6.1-2.2-9.8-8.7-9.8zm-6.3 9.2c.1-3 .3-3.8.5-4.7 1.9-.4 4.1-.4 5.6-.4 3.3 0 3.9 2.1 3.9 5.1h-10zM13.9 101.8c-2.7 0-4.9.7-7.9 1.5v-10.3h-4v31h4v-16.6c3-1 5-1.5 7-1.5 1 0 2 .5 2 1.7v16.9l.4-.4h4.6v-15.8c0-3.8-1.8-6.5-6.1-6.5zM122 102v17.4c-3 1-5.6 1.5-7.7 1.5-1 0-2.3-.5-2.3-1.7v-17.2h-4v16.7c0 3.7 1.3 6.3 5.6 6.3 2.7 0 7.4-.4 12.4-3.5v-19.5h-4zM103.8 102h-5.4c-1.3 3-3.2 7-5.6 9h-1.8v-18h-5v31h5v-10h2.1c2.8 3 4.6 7 6 10h5.6c-2.1-4-4.5-8.4-7.7-12.4 2.6-2.7 5-5.6 6.8-9.6zM48 124h4v-16.6c2-.8 5-1.1 7-1.2v-4c-3 .2-7 .9-11 3.1v18.7zM71.4 101.8c-6.1 0-10.3 3.2-10.3 11.7 0 8 3.2 11.5 10.3 11.5 6.1 0 10.3-3.2 10.3-11.7 0-8-3.2-11.5-10.3-11.5zm0 19.2c-4 0-5.7-1.4-5.7-7.5 0-5.6 2-7.7 5.7-7.7 4 0 5.7 1.4 5.7 7.5-.1 5.6-2.1 7.7-5.7 7.7zM99 10.3c0-4.6-3.7-8.3-8.3-8.3h-53.4c-4.6 0-8.3 3.7-8.3 8.3v70.4c0 4.6 3.7 8.3 8.3 8.3h53.4c4.6 0 8.3-3.7 8.3-8.3v-70.4zm-67 .5c0-3.3 2.5-5.8 5.7-5.8h52.5c3.3 0 5.8 2.6 5.8 5.8v69.4c0 3.3-2.5 5.9-5.7 5.9h-52.6c-3.3 0-5.7-2.6-5.7-5.9v-69.4zM85.9 14h-10.7s-3.4 8-7.1 12h10.4c5.6-7 7.4-12 7.4-12zM45 76.9l9.8-9.9-9.8-9.8zM73 42.4v34.5l-.1.1h9.1v-34.5c0-18.9-27-8.2-27-8.2v-20.5l-9.8.1s0 32 .1 31.9c29.9-11.6 27.7-3.4 27.7-3.4z"></path>
//         </svg>
//       </a>
//     </div>

//     <h4>Features</h4>
//     <ul>
//       <li> - It's fast.</li>
//       <li> - Lightweight.</li>
//       <li> - Evergreen, self-updating.</li>
//       <li> - Video and audio calls. (Soon)</li>
//       <li> - A chatbot with the IQ of a pet rock.</li>
//       <li> - Compatible across all browsers, desktop and mobile.</li>
//       <li> - 100% awesome.</li>
//       <br/>  
//       <li> <em>Experimental:</em></li>
//       <li> - Login-less. No passwords to remember. Each instance is tied to your device. (experimental)</li>
//       <li> - <em>Miit</em>. Venue recommendation based on your group's whereabouts.</li>
//     </ul>

//     <div className="dSubHeader">
//       <h3>Some words</h3>
//     </div>
//     <p>As an aspiring software developer, I need to push myself to improve, so I challenged myself to build something ambitious (for me). I wanted to avoid the iOS vs Android, Desktop vs mobile line of argumentation and just make something that would work across devices. All of them, new or old. It needed to be a challenge, so it's as close to a full featured chat application I could make in a short time.</p>
//     <p>It needed to fulfill several criteria. It had to be interesting and hard to work on. It needed to take into account the differing states of API adoption across mobile browsers.</p>

//     <div className="dSubHeader">
//       <h3>Speed</h3>
//     </div>
//     <p>How a webpage performs is important. The project began by leveraging webpacks ability to trim down unwanted npm sub-modules; really optimize production build. On a modern browser, the app should load in around a second. On a 3G connection, you can expect 2.5s - 3s load time.</p>

//     <div className="dSubHeader">
//       <h3>https</h3>
//     </div>
//     <p>Some features like webRTC, navigator.geolocation.getHighAccuracy require secure origins to work.  </p>

//     <div className="dSubHeader">
//       <h3>Broweser compatibility</h3>
//     </div>
//     <p>Building a web app means forfeiting some features. Right now it's an interesting time for developers made true by Apple and the release of iOS11, with Mobile Safari adopting several web APIs. For example, getUserMedia.</p>

//     <div className="dSubHeader" id="firebase">
//       <div className="headerIcon">
//         <FirebaseIcon />
//       </div>
//       <h3>Firebase </h3><div className="headerSpace"></div><p>(storage, communication, presence)</p>
//     </div>

//     <p>Thanks to web sockets, changes to the database are pushed to the client so there is no need for the user to reload or refresh the app, only receiving little messages instead of downloading big chunks of data. Events like new messages, users connecting and disconnecting all happen real-time.</p>
//     <p>Initially, I only used Firebase to store user and message data, and used another layer of websockets for communication. There are times that writing code is hard and you end up wasting a lot of time. Investing in the wrong technology is one example. For the communication part of this project it went like this: <a href="https://socket.io" className="strikethrough">socket.io</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" className="strikethrough">WebSockets</a> then Firebase.</p>
//     <p>The whole process took a lot of time. It meant rewriting large parts of the application, twice. Socket.io is a simple solution for real-time bidirectional event-based communication. But it's just an additional layer of abstraction that took up valuable space. As for WebSockets, all browsers, with the exception of IE, offer full RFC 6455 support, and were an improvement in size and performance on the client side. But seeing as Firebase was already handling data storage and it's capable of real-time bidirectional event-based communication, I used that instead.</p>
//     <p>One downside though, it's a little heavy. The database module takes up 54kb~ of the bundle file. If you want to user any other modules, say 'auth', you're going to pay.</p>

//     <div className="dSubHeader">
//       <h3>Future improvements</h3>
//     </div>
//     <ul>
//       <li>UX/UI</li>
//       <li>Games</li>
//     </ul>

//     <h3>Changelog</h3>
//     <ul className="toc">
//       <li>v0.5 - Performance improvements. Squished some bugs.</li>
//       <li>v0.4 - Likes!</li>
//       <li>v0.3 - Link parsing. New look. </li>
//       <li>v0.2 - Firebase now handles communication. many performance improvements. </li>
//       <li>v0.1 - Basic chat. Basic styling.</li>
//     </ul>

//     <div className="dSubHeader">
//       <h3>Stats</h3>
//     </div>
//     <ul>
//       <li className="metrics">domComplete: <span className="stats"> {this.state.domLoadTime}ms</span></li>
//       <li className="metrics">navigationStart: <span className="stats"> {this.state.navigationStart}ms</span></li>
//       <li className="metrics">bundle.js: <span className="stats">200kb~</span></li>
//     </ul>

//   </div>
// );