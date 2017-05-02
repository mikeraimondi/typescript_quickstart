import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as winston from "winston";

class App {
  public express: express.Application;
  public logger: winston.LoggerInstance;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          timestamp: true,
        }),
      ],
    });
  }

  private middleware(): void {
    this.express.use(this.loggingMiddleware);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private loggingMiddleware: express.RequestHandler = (req, res, next): void => {
    this.logger.info(`${req.method} "${req.url}"`);
    next();
  }

  private resolveAfter1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "yo" });
      }, 1000);
    });
  }

  private async response() {
    const res = await this.resolveAfter1();
    return res;
  }

  private routes(): void {
    const router = express.Router();

    router.get("/", (req, res, next) => {
      this.response().then((resp) => {
        res.json(resp);
      });
    });
    this.express.use("/", router);
  }
}

export default new App();
