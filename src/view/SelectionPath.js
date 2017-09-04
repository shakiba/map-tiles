import React, {Component} from 'react';

import inefficientFindPath from '../model/inefficientFindPath';

import stopEvent from './stopEvent';

class SelectionPath extends Component {
  render() {
    const {state, selected} = this.props;

    const layout = state.page.layout;

    const path = [];

    if (selected) {
      inefficientFindPath(layout, selected, path)
    }

    if (!path.length) {
      path.unshift(layout);
    }

    const pathEl = path.map(comp => <a
        className="path-comp"
        onClick={(_ => stopEvent(_) + state.selectComponent(comp))}
        onMouseOver={(_ => stopEvent(_) + state.hoverComponent(comp))}
        onMouseLeave={(_ => stopEvent(_) + state.unhoverComponent(comp))}
      ><i className="fa fa-square-o"></i></a>
    );

    for (let i = pathEl.length - 1; i > 0; i--) {
      pathEl.splice(i, 0, <i className="fa fa-angle-right"></i>);
    }

    return (
      <div className={"selection-path"}>{pathEl}</div>
    );
  }
}

export default SelectionPath;
