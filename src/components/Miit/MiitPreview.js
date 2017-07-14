import React, {Component} from 'react';

const styles = {
  previewMiit: {
    margin: '0'
  }
}
class MiitPreview extends Component {
  constructor(props) {
    super(props)
    
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    console.log("CLICKED: in preview");
    // this.props.onClick(this.state.chatInput, this.props.room);
  }

  render() {
    return (
      <div style={styles.previewMiit}>
        <button id="MiitButtonPreview" onClick={this.clickHandler}>
          Miit!
        </button>
      </div>
    )
  }
}

export default MiitPreview;