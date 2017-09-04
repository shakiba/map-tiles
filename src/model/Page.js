import Picture from './Picture';
import Layout from './Layout';

let ID = 0;

function Page() {
  this.pictures = [];
  this.layout = new Layout(true);

  this.serialize = function() {
    return JSON.stringify(this);
  };
}

Page.deserialize = function(data) {
  data = JSON.parse(data);
  let obj = new Page();
  obj.pictures = data.pictures.map(Picture.deserialize);
  obj.layout = Layout.deserialize(data.layout);
  return obj;
};

export default Page;
