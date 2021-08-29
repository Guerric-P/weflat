import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as bodyParser from 'body-parser';
import * as cookieparser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
import * as request from 'request';
import 'zone.js/node';
import { AppServerModule } from './src/main.server';



// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.use(bodyParser.json());
  server.use(cookieparser());

  const distFolder = join(process.cwd(), 'dist/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.all('/backend/*', (req, res) => {
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
  server.get('*', (req, res) => {
    res.render(
      'index', {
        req,
        res,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
      },
      (err, html) => {
        if (err) { console.error(err); }
        res.send(html);
      }
    );
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';

