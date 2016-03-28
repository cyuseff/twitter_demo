'use strict';

import Fetch from 'whatwg-fetch';

function parseJSON(data) {
  return data.json();
}

function _fetch(url, method, data) {
  let opts = {method};
  if(data) {
    url += '?';
    for(let i in data) url += i+'='+data[i]+',';
    url = url.replace(/,$/, '');
  }

  return fetch(url, {method})
    .then(data => parseJSON(data));
}

export default {
  get(url, data) {
    return _fetch(url, 'GET', data);
  }
};
