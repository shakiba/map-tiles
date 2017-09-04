import React from 'react';
import ReactDOM from 'react-dom';

import Page from './view/Page';
import State from './State';
import './index.css';

function render(state) {
  ReactDOM.render(
    <Page state={state} page={state.page}/>,
    document.getElementById('root')
  );
}

let state = new State(render);

state.newPage();