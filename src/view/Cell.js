import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';

import stopEvent from './stopEvent';

class Cell0 extends Component {
  render() {
    const {state, cell, connectDropTarget, connectDragSource, isOver, canDrop} = this.props;

    let isDropTarget = isOver && canDrop;
    let selected = cell === state.selectedComponent;
    let hovered = cell === state.hoveredComponent;

    let actions = [];
    let content;
    let backgroundStyle = {};
    let className = "cell cell_" + cell.mode;

    if (selected) {
      className += " selected";
    }

    if (hovered) {
      className += " hovered";
    }

    if (isDropTarget) {
      className += " dropTarget";
    }

    if (cell.picture) {
      backgroundStyle.backgroundImage = "url(" + cell.picture.src + ")";
    }

    content = cell.children.map(cell => <Cell key={cell.id} cell={cell} state={state}/>);

    if (!cell.children.length) {
      actions.push((
        <a onClick={(_ => stopEvent(_) + state.cellSplitVertical(cell))}><i className="fa fa-ellipsis-h"></i></a>));
      actions.push((
        <a onClick={(_ => stopEvent(_) + state.cellSplitHorizontal(cell))}><i className="fa fa-ellipsis-v"></i></a>));

    } else {
      actions.push((<a onClick={(_ => stopEvent(_) + state.cellMerge(cell))}><i className="fa fa-square-o"></i></a>));
    }

    actions.push((<a onClick={(_ => stopEvent(_) + state.cellRemove(cell))}><i className="fa fa-times"></i></a>));
    // actions.push((<a onClick={(_ => stopEvent(_) + state.cellStartSwap(cell))}><i className="fa fa-arrows"></i></a>));

    return connectDragSource(connectDropTarget(
      <div
        className={className}
        onClick={(_ => stopEvent(_) + state.selectComponent(cell))}
        onMouseOver={(_ => stopEvent(_) + state.hoverComponent(cell))}
        onMouseLeave={(_ => stopEvent(_) + state.unhoverComponent(cell))}
      >
        <div className="actions" style={{display: (selected ? 'inline' : 'none')}}>{actions}</div>
        <div className="background" style={backgroundStyle}></div>
        {content}
      </div>
    ));
  }
}

let Cell = DropTarget('picture', {
    canDrop(props, monitor) {
      return !props.cell.children.length;
    },
    drop(props, monitor, component) {
      let item = monitor.getItem();
      if (monitor.didDrop()) {
      } else if (item.picture) {
        props.state.cellSetPicture(props.cell, item.picture);
      } else if (item.cell) {
        props.state.swapContent(props.cell, item.cell);
      }
    }
  }, function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    };
  }
)(DragSource('picture', {
    canDrag(props, monitor) {
      return !props.cell.children.length;
    },
    beginDrag(props) {
      return {cell: props.cell};
    }
  }, function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
)(Cell0));

export default Cell;
