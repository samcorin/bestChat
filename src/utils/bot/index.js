import SendMessage from './../SendMessage';

// see if I can integrate api.io, or google ai

// TODO:
// - timer "set timer for 4minutes..."
// - reddit top X
// - headlines....
// - weather
//

export const bot = {
  roomId: null,
  currentUser: null,
  // Not sure about this... feels hackish
  dispatch: null,
  // List of possible actions
  // should the actions be functions?
  commands: {
    'weather': {action: "get weather", text: "You selelcted weather", moreInfo: "how hot...."},
    'rain': {action: "get rain", text: "You selelcted rain"},
    'reddit': {action: "get reddit", text: "You selelcted reddit"}
  },
  // Possible responses if action returns blank
  responseArr: [
    "What was the question?",
    "Are you trying to confuse me?",
    "Questions... I know it's a difficult concept for some.",
    "Idiot",
    "Bah!",
    "Blah blah blah.."
  ],
  // APIs
  weatherApi: '2faa25f2cdd71388d4f7d4314ab808e5',
  parseRequest: function(message) {    
    // what if it's not a question?
    // response should be obj {isQ: true/false, response: "..."}
    const response = this.questionParser(message.text);

    if(response !== '') {
      this.performTask(response);
    }

  },
  performTask: function(request) {
    console.log("PERFORM: ", request)
    if(request.action === '') {
      // pick random response
      // const responseArr = [
      //   "What was the question?",
      //   "Are you trying to confuse me?",
      //   "Questions... I know it's a difficult concept for some."
      // ];
      
      const chosenResponse = this.responseArr[Math.floor(Math.random() * this.responseArr.length)]
      this.sendMessage(chosenResponse);

    }

  },
  questionParser: function questionParser(string) {
    let response = {action: ''};
    
    // Does string end with a '?'
    var isQuestion = string[string.length - 1] == '?';
    
    response['isQ'] = isQuestion;
    // Initiate response 
    
    // this is pretty dumb, you have to be careful that it mathes only one word..
    var arr = string.split(" ");
    console.log("string arr: ", arr)


    // if starts with 'how | how | what' etc... obviously question, but how can you make it smarter?
    // iterate array
    arr.forEach((item) => {
      if (item in this.commands) {
        console.log("string is in commands: ", this.commands[item].action)
        if (isQuestion) {
    //       console.log("isQuestoin yes")
          response['action'] = this.commands[item].action;
        }
      }
    })
    return response;
  },
  sendMessage: function(text) {
    // const messageObject = {
    //   sender: this.props.currentUser,
    //   text: '',
    //   createdAt: Date.now(),
    //   roomId: roomId,
    //   roomName: this.props.match.params.room
    // }
    var message = {
      sender: 'admin-bot',
      text: text,
      createdAt: Date.now(),
      roomId: this.roomId,
      roomName: 'admin-bot',
      type: 'default'
    }
    // export const SendMessage = (currentUser, message, dispatch, callback) => {
    SendMessage(this.currentUser, message, this.dispatch)
  },
  getWeather: function() {
    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then((location) => {
        // console.log('City location: ', location.city)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=${this.weatherApi}`)
        .then(res => res.json())
        .then((response) => {
          var temp = Math.round(response.main.temp);
          let text = `The temperature is around ${temp}ºC`
          console.log("weather result: ", text)
          // bot.sendAdminMessage(io, data, time, adminResponse);
        }).catch((error) => {
          console.log(error)
          // bot.sendAdminMessage(io, data, time, 'There was a problem with the weather API');
        })
      }).catch((error) => {
        console.log(error)
        // bot.sendAdminMessage(io, data, time, 'Your location is a mystery.');
      });
  },
  requestType: function requestType(io, bot, data, time, fetch) {
    var weatherApi = '2faa25f2cdd71388d4f7d4314ab808e5';
    // what about if the user sends a picture??


    // default admin response
    var adminResponse = {
      text: "That's great!",
      mediaType: "default"
    };

    if(data.userText == 'reddit') {
      fetch('https://www.reddit.com/.json')
      .then(res => res.json())
      .then((response) => {
        console.log(response.data.children[0].data)
        adminResponse.text = "Here's the top story: \n" + response.data.children[0].data.title;
        adminResponse.mediaType = "article";
        // if image
        // response.data.children[0].data.preview.images.source.url

        bot.sendAdminMessage(io, data, time, adminResponse);
      }).catch((e) => {
        console.log(e)
      })
    } else if(data.userText == 'weather') {
      fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then((location) => {
        // console.log('City location: ', location.city)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=${weatherApi}`)
        .then(res => res.json())
        .then((response) => {
          var temp = Math.round(response.main.temp);
          adminResponse.text = `The temperature is around ${temp}ºC`
          bot.sendAdminMessage(io, data, time, adminResponse);
        }).catch((error) => {
          bot.sendAdminMessage(io, data, time, 'There was a problem with the weather API');
        })
      }).catch((error) => {
        bot.sendAdminMessage(io, data, time, 'Your location is a mystery.');
      });
    } else {
      var time = Date.now();
      bot.sendAdminMessage(io, data, time, adminResponse);
    }
  },
  sendAdminMessage: function sendAdminMessage(io, data, time, adminResponse) {
    var message = {
      username: 'Admin bot',
      text: adminResponse.text,
      medyaType: adminResponse.medyaType,
      createdAt: time,
      roomId: data.id.toString(),
      currentUser: data.currentUser
    }
    return setTimeout(function() {
      io.sockets.emit('admin:response', message);
    }, 100)
  }
}

export default bot;