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
  prevReply: '',
  // APIs
  weatherApi: '2faa25f2cdd71388d4f7d4314ab808e5',
  parseRequest: function(message) {    
    let response = {action: ''};
    // what if it's not a question?
    // response should be obj {isQ: true/false, response: "..."}
    
    // is it a 'special command'
    if(message.text[0] === '/') {
        console.log("First letter: ", message.text[0])
        // console.log("parsed reuqest: ", message.text.substr(1))
        let subReddit = message.text.split('-')[1]
        let redditResponse = this.getReddit(subReddit);
        console.log("reddit res", redditResponse)
        response['action'] = 'get reddit';
        response['text'] = redditResponse;
        // return this.performTask(response);

        // console.log("subreddit: ", message.text.split('-')[1])
    } else {
      response = this.questionParser(message.text);
      this.performTask(response);
    }


  },
  performTask: function(request) {
    console.log("PERFORM: ", request)
    
    switch (request.action) {
      case 'get weather':
        console.log("GETTING THE WEAHER")
        this.getWeather();
        break;
      case 'get reddit':
        console.log("GETTING reddits: ", request)
        this.sendMessage(request.text, 'media');
        break;
      default:
        let reply;      
        do {
          reply = this.responseArr[Math.floor(Math.random() * this.responseArr.length)];
        } while (reply === this.prevReply);        
        this.prevReply = reply;
        this.sendMessage(reply);
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
  sendMessage: function(text, type) {
    var message = {
      sender: 'admin-bot',
      text: text,
      createdAt: Date.now(),
      roomId: this.roomId,
      roomName: 'admin-bot',
      type: type || 'default'
    }
    console.log("MESSAGE: ", message)
    // add random delay
      setTimeout(() => {
        SendMessage(this.currentUser, message, this.dispatch)
      }, 50)
  },
  getWeather: function() {
    // fetch('http://ip-api.com/json')
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then((location) => {
        console.log('City location: ', location.city)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=${this.weatherApi}`)
        .then(res => res.json())
        .then((response) => {
          console.log("OK")
          var temp = Math.round(response.main.temp);
          let text = `The temperature is around ${temp}ºC`
          console.log("weather result: ", text)
          this.sendMessage(text);
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
  getReddit: function(sub) {
    // fetch('https://www.reddit.com/live/thread/about.json')
    fetch(`https://www.reddit.com/r/${sub}/.json`)
    .then(res => res.json())
    .then((item) => {
      // console.log("REDDIT: ", item)
      // let author = item.data.children[0].data.author
      // let imgUrl = item.data.children[0].data.thumbnail;
      // let imgUrl = item.data.children[0].data.thumbnail;
      
      // let obj = {};
      // obj['imgUrl'] = imgUrl;
      // obj['author'] = author;


      // JSON.stringify(obj)

      // this.sendMessage(obj, 'media');
      // response['action'] = 'get reddit';
      // response['text'] = redditResponse;
      // return image url
      return item.data.children[0].data.thumbnail;
    })
  }
}

export default bot;