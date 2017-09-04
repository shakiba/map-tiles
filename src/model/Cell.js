import Picture from './Picture';
import inefficientFindPath from './inefficientFindPath';

let ID = 0;

function Cell(top) {
  this.id = ++ID;
  this.mode = 'content';
  this.children = [];
  this.picture;

  this.setPicture = function(picture) {
    this.picture = new Picture(picture.src);
  };

  this.setVertical = function() {
    this.mode = 'vertical';
  };

  this.setHorizontal = function() {
    this.mode = 'horizontal';
  };

  this.mergeChildren = function() {
    this.mode = 'content';
    for (let i = 0; !this.picture && i < this.children.length; i++) {
      let child = this.children[i];
      if (child.picture) {
        this.picture = new Picture(child.picture.src);
      }
    }
    this.children.length = 0;
  };

  this.splitVertical = function() {
    this.setVertical();
    this.split();
  };

  this.splitHorizontal = function() {
    this.setHorizontal();
    this.split();
  };

  this.split = function() {
    this.children[0] = this.children[0] || new Cell();
    this.children[1] = this.children[1] || new Cell();

    if (this.picture) {
      this.children[0].picture = new Picture(this.picture.src);
      this.children[1].picture = new Picture(this.picture.src);
      delete this.picture;
    }
  };

  this.swap = function(that) {
    if (inefficientFindPath(this, that, false) || inefficientFindPath(that, this, false)) {
      return false;
    }

    let children = that.children;
    that.children = this.children;
    this.children = children;

    let picture = that.picture;
    that.picture = this.picture;
    this.picture = picture;

    let mode = that.mode;
    that.mode = this.mode;
    this.mode = mode;

    return true;
  };

  this.removeChild = function(cell) {
    let index = this.children.indexOf(cell);
    if (index >= 0) {
      this.children.splice(index, 1);
    }

    if (this.children.length === 1) {
      this.picture = this.children[0].picture;
      this.mode = this.children[0].mode;
      this.children.length = 0;
    }
  };
}

Cell.deserialize = function(data) {
  if (!data) return data;

  let obj = new Cell();
  obj.id = data.id;
  obj.mode = data.mode;
  obj.picture = Picture.deserialize(data.picture);
  obj.children = data.children.map(Cell.deserialize);
  return obj;
};

export default Cell;
