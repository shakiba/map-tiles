import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layout from './Layout';
import SelectionPath from './SelectionPath';
import LeftPanel from './LeftPanel';
import stopEvent from './stopEvent';

class Page extends Component {
  render() {
    const {state, page} = this.props;

    const layout = page.layout;
    const selected = state.selectedComponent;

    let pageSelection = selected ? null : page.layout;

    let layoutEl = <Layout layout={layout} state={state}/>;

    return (
      <div className="page">
        <LeftPanel state={state} page={state.page}/>
        <div className="status-bar">
          <div className="selection-area"><SelectionPath state={state} selected={state.selectedComponent} /></div>
        </div>
        <div className="page-view" onClick={(_ => stopEvent(_) + state.selectComponent(pageSelection))}>
          <div className="layout-area">{layoutEl}</div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Page);
