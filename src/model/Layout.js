import Cell from './Cell';

function Layout(top) {
  this.children = [];

  this.addChild = function(cell) {
    cell = cell || new Cell();
    this.children.push(cell);
  };

  this.removeChild = function(cell) {
    let index = this.children.indexOf(cell);
    if (index >= 0) {
      this.children.splice(index, 1);
    }

    if (this.children.length === 0) {
      this.children.push(new Cell());
    }
  };
}

Layout.deserialize = function(data) {
  if (!data) return data;

  let obj = new Layout();
  obj.children = data.children.map(Cell.deserialize);
  return obj;
};

export default Layout;
