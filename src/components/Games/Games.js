import React from 'react';
import BottomNav from './../BottomNav';
// import {connect} from 'react-redux'
// import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
// import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
// import './Games.css';

class Games extends React.Component {
  constructor(props) {
    super(props);

    // this.submitHandler = this.submitHandler.bind(this);
    // this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  render() {
    return (
      <div>
        <table className="text-center container-centered">
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




