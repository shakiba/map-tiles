import React, {Component} from 'react';

import stopEvent from './stopEvent';
import Cell from './Cell';

class Layout extends Component {
  render() {
    const {state, layout}= this.props;

    let selected = layout === state.selectedComponent;
    let hovered = layout === state.hoveredComponent;

    let className = "cell layout";

    if (selected) {
      className += " selected";
    }

    if (hovered) {
      className += " hovered";
    }

    let content = layout.children.map(cell => <Cell key={cell.id} cell={cell} state={state}/>);

    let actions = [];
    actions.push((<a onClick={(_ => stopEvent(_) + state.layoutAddChild(layout))}><i className="fa fa-plus"></i></a>));

    return (
      <div
        className={className}
        onClick={(_ => stopEvent(_) + state.selectComponent(layout))}
        onMouseOver={(_ => stopEvent(_) + state.hoverComponent(layout))}
        onMouseLeave={(_ => stopEvent(_) + state.unhoverComponent(layout))}
      >
        <div className="actions" style={{display: (selected ? 'inline' : 'none')}}>{actions}</div>
        {content}
      </div>
    );
  }
}

export default Layout;
