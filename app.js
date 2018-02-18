import http from 'http';
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import register from 'ignore-styles';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderToString } from 'react-dom/server';

import config from './config';
import store from './src/store';
register(['.sass', '.scss']);

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src/dist'));
app.use(express.static(__dirname + '/src/src'));
app.set('views', __dirname + '/src/dist');
app.use('/src', express.static(__dirname + '/src'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(favicon(__dirname + '/favicon.ico'));

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(config.db, err => {
  if (err) throw err;
  console.log('mongodb connected');
});

app.get('/', (req, res, next) => {
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(serverTemplate(html));
    res.end();
  }

  next();
});

fs.readdirSync(__dirname + '/models').forEach(file => {
  if (file.match(/\.js$/) !== null) {
    require(__dirname + `/models/${file}`);
  }
});

fs.readdirSync(__dirname + '/controllers').forEach(file => {
  if (file.match(/\.js$/) !== null) {
    let fileName = file.replace('.js', '').toLowerCase();
    if (fileName === 'api') {
      app.use('/api', require(__dirname + `/controllers/${file}`));
    } else {
      app.use('/', require(__dirname + `/controllers/${file}`));
    }
  }
});

import Main from './src/containers/main.container';
import serverTemplate from './src/serverTemplate';

const context = {};

app.use((req, res, next) => {
  res.render('index');
});

app.use((err, req, res, next) => {
  res.status(400).send(err);
  next();
});

let server = http.createServer(app);

server.listen(config.port, config.host, function () {
  console.log(`server connected on port ${this.address().port}`);
});
