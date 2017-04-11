import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'winston';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    // TODO logger
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req, res, next) => {
      throw new Error('foobar');
      // res.json({
      //   message: 'yo',
      // });
    });
    this.express.use('/', router);
  }
}

export default new App().express;