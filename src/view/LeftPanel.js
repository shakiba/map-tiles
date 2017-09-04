import React, {Component} from 'react';

import Picture from './Picture';

class LeftPanel extends Component {
  render() {
    const {state, page} = this.props;

    let savedEl = state.savedNames.map(name => <option key={name} value={name}>{name}</option>);
    let picturesEl = page.pictures.map(picture => <Picture key={picture.id} picture={picture}/>);

    return (
      <div className="left-panel">
        <div className="action-area">
          <div className="menu-item page-name">{state.pageName}</div>
          <div className="page-actions">
            <a className="menu-item" onClick={(_ => confirm("New?") && state.newPage())}>New</a>
            <a className="menu-item" onClick={(_ => state.save(prompt("Name to save?", state.pageName || '')))}>Save</a>
            <span className="menu-item"><select onChange={_ => state.load(_.target.value)}>
              <option>Load...</option>
              {savedEl}
            </select></span>
          </div>
        </div>
        <div className="picture-area">{picturesEl}</div>
      </div>
    );
  }
}

export default LeftPanel;
