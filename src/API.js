import Store from 'store';
import shuffleArray from 'shuffle-array';

import {Page, Layout, Picture} from './model/index';
import googleEarthView from './googleEarthView';

// to be replaced with real server-side API

const SAVE_PREFIX = "saved_page_";

const API = {};

const GOOGLE_EARTH_VIEW = googleEarthView.map(id => {
    let url = process.env.PUBLIC_URL + '/google-earth-view/' + id + '.jpg';
    let picture = new Picture(url);
    picture.id = id;
    return picture;
  });

shuffleArray(GOOGLE_EARTH_VIEW);

// TODO: use thumbnails and remove this
GOOGLE_EARTH_VIEW.length = 12;

API.listPictures = function() {
  return GOOGLE_EARTH_VIEW;
};

API.newPage = function() {
  let page = new Page();

  page.pictures = API.listPictures();

  page.layout.addChild();
  page.layout.addChild();
  page.layout.addChild();
  page.layout.addChild();

  return page;
};

API.save = function(name, page) {
  let data = page.serialize();
  console.log(data)
  Store.set(SAVE_PREFIX + name, data);
};

API.load = function(name) {
  let data = Store.get(SAVE_PREFIX + name);
  console.log(data);
  return data && Page.deserialize(data);
};

API.listSavedNames = function() {
  let names = [];
  Store.each(function(value, key) {
    if (key.lastIndexOf(SAVE_PREFIX, 0) === 0)
      names.push(key.substring(SAVE_PREFIX.length));
  });
  return names;
};

export default API;