# bestChat
Fast and full featured chat application in your browser.


### Progress:

- [x] Instant Chat.
- [x] Modern design.
- [x] Fast initial paint on 4G devices (<1s)
- [ ] Smart chat-bot.
- [ ] Fast initial paint on 3G devices (<2.5s)
- [ ] WebRTC audio and video calls.
- [ ] Miit: Venue recommendations for groups, using Google Maps API.
- [ ] Small size. (<60kb)


#### Rationale
As an aspiring developer, I needed a project that would challenge me. I decided on a chat application for the web because of the ability to add new features (video communication, google maps integration, games and more) would make this a potentially large and complicated project.

I tried to follow several best practices outlined in the these articles for developing progressive web applications.

[Progressive Web Apps with React.js: Part I](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12)

[Progressive Web Apps with React.js: Part 2](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-2-page-load-performance-33b932d97cf2)


#### Constraints
Following the approaches as listed in the articles above, this project needed to: 

- [x] be perfomant across a range of devices
- [x] be feature rich
- [x] as well as make use of the latest web APIs (WebRTC, userMedia, etc..)
- [x] and remain lightweight


#### Structure
The basic architecture for the app is this:
 - Firebase handles data storage (users, online status, messages, location data, etc..)
 - React for the complex UI
 - Node.js to serve the static bundle files as well as redirecting to https.

Not a lot of thought went into the structure of the components at the beginning. My lack of experience compelled me to dive in to 'see what happens'. Two iterations later, and the codebase is completely different(improved) from when the project started.


#### Chat things
For a chat app to work there needs to be a way to enable quick, bi-derectional communication. A common library, like Socket.io, make this process straighforward. With some added abstraction you can create a chat application relatively quickly. And that's just what I did for the first iteration of the app. But the reliance on too many libraries goes against the primary constraint. Keep things small

More coming soon...

#### Frontend
Coming soon...

#### backend
Seeing as all routes and communications are handled client-side, there isn't much for Node.js to do other than serve static content and redirect all non-scure traffic to HTTPS (for getUserMedia, highAccuracyLocation, ...).

# CHANGELOG

v0.5
  - Performance improvements
v0.4
  - Replaced WebSockets with Firebase.
v0.3
  - Replaced Socket.io with plain WebSockets.
v0.2
  - Basic Styling
v0.1
  - Basic messaging with Socket.io.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
