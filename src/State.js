import {Page, Layout, Picture} from './model/index';
import API from './API';
import inefficientFindPath from './model/inefficientFindPath'

// A simple state container consisting of actions and a reducer
function State(render) {

  const state = this;

  state.newPage = function() {
    state.page = API.newPage();
    state.pageName = "";
    rerender();
  };

  state.save = function(name) {
    API.save(name, this.page);
    state.pageName = name;
    rerender();
  };

  state.load = function(name) {
    let page = API.load(name);
    console.log(page)
    if (page) {
      state.page = page;
      state.pageName = name;
    }
    rerender();
  };

  state.cellSetPicture = function(layout, picture) {
    layout.setPicture(picture);
    rerender();
  };

  state.selectComponent = function(comp) {
    if (comp === state.selectedComponent) {
      state.selectedComponent = null;

    } else if (this.swapCell) {

      this.swapCell.swap(comp);

      state.swapCell = null;
      state.selectedComponent = null;

    } else {
      state.selectedComponent = comp;
    }
    rerender();
  };

  state.hoverComponent = function(comp) {
    state.hoveredComponent = comp;
    rerender();
  };

  state.unhoverComponent = function(comp) {
    if (state.hoveredComponent === comp) {
      state.hoveredComponent = null;
    }
    rerender();
  };

  state.cellStartSwap = function(layout) {
    state.swapCell = layout;
  };

  state.swapContent = function(cellA, cellB) {
    cellA.swap(cellB);
    rerender();
  };


  state.cellSplitVertical = function(layout) {
    layout.splitVertical();
    state.selectedComponent = null;
    rerender();
  };

  state.cellSplitHorizontal = function(layout) {
    layout.splitHorizontal();
    state.selectedComponent = null;
    rerender();
  };

  state.layoutAddChild = function(layout) {
    layout.addChild();
    rerender();
  };

  state.cellMerge = function(layout) {
    layout.mergeChildren();
    rerender();
  };

  state.cellRemove = function(cell) {
    let path = [];
    let found = inefficientFindPath(this.page.layout, cell, path);
    if (found) {
      let parent = path[path.length - 2];
      parent.removeChild(cell);
    }
    rerender();
  };

  function reduce() {
    state.savedNames = API.listSavedNames();
  }

  function rerender() {
    reduce();
    render(state);
  }
}

export default State;
