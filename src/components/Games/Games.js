import React from 'react';
import BottomNav from './../BottomNav';
// import {connect} from 'react-redux'
// import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
// import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import GamesNavBar from './GamesNavBar';
import './Games.css';
import './TicTacToe.css';
import './../App.css';

class Games extends React.Component {
  constructor(props) {
    super(props);

    // this.submitHandler = this.submitHandler.bind(this);
    // this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  componentWillMount() {
  var board = ["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"];
  var combinations = [["tl", "tc", "tr"],["ml", "mc", "mr"],["bl", "bc", "br"],["tl", "mc", "br"],["tr", "mc", "bl"],["tl", "ml", "bl"],["tc", "mc", "bc"],["tr", "mr", "br"]];
  var board_copy = board.slice();
  var can_move = true;
  var player_choose = true;
  var Player = function(name, id) {
    this.name = name;
    this.id = id;
    this.moves = [];
    this.movesInCombo = [];
    this.score = 0;
  }
  Player.prototype.reset = function() {
    this.moves = [];
    this.movesInCombo = [];
  }

  var player = new Player('player', 'X');
  var computer = new Player('computer', '0');

  // document.getElementById("div").addEventListener("touchstart");
}

  render() {
    if(true) {
      return (
        <div id="GamesWrapper">
          <GamesNavBar />
          <div className="waiting">
            Coming soon...
          </div>
          <BottomNav />
        </div>
      )
    }
    return (
      <div>
      <GamesNavBar />
        <table className="gameTable">
          <tr>
            <td id="tl" className=""></td>
            <td id="tc" className="v"></td>
            <td id="tr" className=""></td>
          </tr>
          <tr>
            <td id="ml" className="h"></td>
            <td id="mc" className="v h"></td>
            <td id="mr" className="h"></td>
          </tr>
          <tr>
            <td id="bl" className=""></td>
            <td id="bc" className="v"></td>
            <td id="br" className=""></td>
          </tr>
        </table>

        <div className="sidebar">
          <button type="button" data-toggle="modal" data-target="#modal-1" id="restart">Restart</button>
          <div className="data">
            <p>Player score is: <span className="player_score">0</span></p>
            <p>Opponent score is: <span className="computer_score">0</span></p>
            <span className="dialog">Do your best</span>
          </div>

        </div>

        <div className='container'>
          <div className="modal fade" id="modal-1">
            <div className='modal-dialog'>
              <div className='modal-content'>
                <h3 className='modal-title text-center'>Player select:</h3>
                <div className="modal-body text-center">
                  <a href="" className="options" id="X" data-dismiss="modal">X</a>
                  <a href="" className="options" id="0" data-dismiss="modal">0</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.currentUser
// });

// export default connect(mapStateToProps)(Game);
export default Games;


//   $(".options").click(function(e) {
//     player.id = e.target.id;
//     player.id == '0' ? computer.id = 'X' : computer.id = '0';

//     // Random start
//     if (Math.random() > 0.5) {
//       computer_move();
//     }
//   });

//   if (player_choose) {
//     player_choose = false;
//     setTimeout(function() {
//       $('#restart').trigger('click').removeAttr("data-toggle");
//     }, 1000);
//   }

//   function check_for_move(who) {
//     combinations.forEach(function(val, i) {
//       var count = 0;
//       for (var i = 0; i < who.moves.length; i++) {
//         if (val.indexOf(who.moves[i]) != -1) {
//           count++;
//         };
//         if (count == 3) {
//           can_move = false;
//           win(val, who);
//         };
//         if (count == 2) {
//           var make_move = val.filter(function(v, i) {
//             return who.moves.indexOf(v) < 0;
//           });
//           if (make_move && can_move && $('#' + make_move).is(":empty")) {
//             can_move = false;
//             add_to_html(make_move[0], computer);
//           }
//           if (who.movesInCombo.length == 3) {
//             win(who.movesInCombo, who);
//           }
//         }
//       };
//     });
//   }

//   function win(val, who) {
//     who.score++;
//     val.forEach(function(a) {
//       $('#' + a).addClass('winner');
//     });
//     setTimeout(function() {
//       $("#restart").trigger('click');
//     }, 500);
//   }

//   function add_to_html(id, who) {
//     $('#' + id).html("<p>" + who.id + "</p>");
//     board_copy.splice(board_copy.indexOf(id), 1);
//     who.moves.push(id);
//     if (board_copy.length == 0) {
//       restart();
//     }
//   }

//   function computer_move() {
//     can_move = true;
//     if (computer.moves.length >= 2) {
//       check_for_move(computer);
//     }
//     if (player.moves.length >= 2 && can_move) {
//       check_for_move(player);
//     };
//     if (can_move) {
//       var randomMove = board_copy[Math.floor(Math.random() * board_copy.length)];
//       add_to_html(randomMove, computer);
//     }
//   }

//   // Main activity
//   $("td").click(function(event) {
//     if ($(event.target).is(":empty")) {
//       var time = 100;
//       var target = event.target;
//       add_to_html(target.id, player);
//       setTimeout(function() {
//         computer_move();
//       }, time += 100)
//     }
//   })

//   $("#restart").click(function(e) {
//     $('.player_score').text(player.score);
//     $('.computer_score').text(computer.score);
//     board_copy = board.slice();
//     can_move = true;
//     player.reset();
//     computer.reset();
//     $("td").each(function() {
//       $(this).removeClass('winner').text("");
//     });
//   });
// });

