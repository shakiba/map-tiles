import React, {Component} from 'react';
import {DragSource} from 'react-dnd';

import stopEvent from './stopEvent';

class Picture extends Component {
  render() {
    const {picture, connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <span style={{backgroundImage: "url('" + picture.src + "')"}} className={"picture"}></span>
    );
  }
}

export default DragSource('picture', {
    beginDrag(props) {
      return {picture: props.picture};
    }
  }, function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
)(Picture);
