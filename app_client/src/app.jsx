'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TwitterListContainer from './components/TwitterListContainer';

var WIDTH = 500;
var HEIGHT = 400;

var iframe = document.createElement('iframe');
iframe.width = WIDTH;
iframe.height = HEIGHT;
iframe.frameBorder = 0;

var container = document.getElementById('twitts');
container.width = WIDTH;
container.height = HEIGHT;
container.appendChild(iframe);

// CSS
var bootstrap = document.createElement('link');
bootstrap.rel = 'stylesheet';
bootstrap.href = 'http://0.0.0.0:5000/css/bootstrap.min.css';

var fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'http://0.0.0.0:5000/css/font-awesome.css';

var style = document.createElement('link');
style.rel = 'stylesheet';
style.href = 'http://0.0.0.0:5000/css/style.css';

var head = iframe.contentDocument.getElementsByTagName('head')[0];
head.appendChild(bootstrap);
head.appendChild(fontAwesome);
head.appendChild(style);


// Scripts
// Twitter Script
iframe.contentWindow.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName('head')[0],
    t = iframe.contentWindow.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.appendChild(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(iframe.contentDocument, "script", "twitter-wjs"));


// ReactAPP
var reactApp = document.createElement('div');
reactApp.id = 'twitter-app';
iframe.contentDocument.body.appendChild(reactApp);


ReactDOM.render(<TwitterListContainer />, reactApp);
