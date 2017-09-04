let ID = 0;

function Picture(src) {
  this.id = ++ID;
  this.src = src;
}

Picture.deserialize = function(data) {
  if (!data) return data;

  let obj = new Picture();
  obj.id = data.id;
  obj.src = data.src;
  return obj;
};

export default Picture;
