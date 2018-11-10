import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

import * as cookieparser from 'cookie-parser';
import * as request from 'request';

const app = express();
app.use(bodyParser.json());
app.use(cookieparser());

// https://github.com/angular/angular/issues/15730
import * as xhr2 from 'xhr2';
xhr2.prototype._restrictedHeaders.cookie = false;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

app.all('/backend/*', (req, res) => {
  const newurl = 'http://' + req.hostname + req.path;
  const cookies = [];
  for (const name in req.cookies) {
    if (req.cookies.hasOwnProperty(name)) {
      cookies.push(`${name}=${req.cookies[name]}`);
    }
  }
  const serializedCookies = cookies.join('; ');

  request(
    {
      method: req.method,
      uri: newurl,
      json: true,
      body: req.body,
      headers: { 'Cookie': serializedCookies }
    })
    .pipe(res);
});

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(
    'index', {
      req,
      res
    },
    (err, html) => {
      if (err) { console.error(err); }
      res.send(html);
    }
  );
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
