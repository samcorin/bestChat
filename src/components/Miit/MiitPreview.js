import React, {Component} from 'react';
import {miit} from './../../utils/mapFunctions';

const styles = {
  previewMiit: {
    margin: '0',
    display: 'flex',
    justifyContent: 'space-between'
  },
  miitButtonPreview: {
    width: '52px',
    height: '24px',
    borderRadius: '5px',
    color: '#90EE90',
    border: '1px solid #90EE90',
    backgroundColor: '#fff',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  miitButtonPreviewOld: {
    width: '52px',
    height: '24px',
    borderRadius: '5px',
    color: '#D3D3D3',
    border: '1px solid 	#D3D3D3',
    backgroundColor: '#fff',
    fontSize: '16px',
    boxSizing: 'border-box',
    pointerEvents: 'none'
  }
}
class MiitPreview extends Component {
  constructor(props) {
    super(props)
    
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    //  listen: function(roomId, user, redirect) {
    miit.listen(this.props.roomId, this.props.currentUser, this.props.onClick)
  }

  clickHandler(e) {
    e.preventDefault();
    
    // Set redirect to true from parent, ConversationPreview, then render the map
    this.props.onClick();
    miit.acceptInvite(this.props.currentUser, this.props.roomId)
  }

  render() {
    const isNew = ((Date.now() - this.props.createdAt) < 60 * 1000);
    const myMessage = this.props.author === 'You';  
    
    if(myMessage) {
      return (
        <div style={styles.previewMiit}>
          <p className="previewText">You sent an invite.</p>
        </div>
      )
    } else {
      return (
        <div style={styles.previewMiit}>
          <p className="previewText">{this.props.text} </p>
          <button id='MiitButtonPreview' style={isNew ? styles.miitButtonPreview : styles.miitButtonPreviewOld} onClick={this.clickHandler}>
            OK!
          </button>
        </div>
      )
    }
  }
}

export default MiitPreview;