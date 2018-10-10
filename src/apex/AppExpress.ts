import express from "express";
import { json, urlencoded } from "body-parser";
import { APIDocs } from "./ApiDocs";
import { AppController } from "./AppController";
import { App } from "../utils/App";

export default class AppExpress {
  public express: any;

  constructor() {
    this.express = express();
    this.express.use(json());
    this.errorHandle();
    this.chunkDataHandle();
    this.mountRoutes();
  }

  public async mountRoutes() {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello World! Website Applications"
      });
    });
    this.express.use("/", router);

    let apiDocs = new APIDocs();
    this.express.use("/apidocs", apiDocs.getRouter());

    let appController = new AppController();
    this.express.use("/api", await appController.getRouter());
  }

  private chunkDataHandle(): void {
    this.express.all("*", (req: any, res: express.Response, next: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      res.setHeader("Access-Control-Allow-Headers", "accept, Content-Type, Authorization");

      if (req.headers["content-type"] && req.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1) {
        this.parsePost(req, (data: any) => {
          if (data && data != "") {
            req.body = data;
          }
          this.addSessionInfo(req);
          next();
        });
      } else {
        this.addSessionInfo(req);
        next();
      }
    });
  }

  private addSessionInfo = (req: any) => {
    let sessionInfo = App.decodeJWT(req.headers["authorization"]);
    console.log("sessionInfo: ");
    console.log(sessionInfo);
    console.log("-----------------------------------------------------");
    if (!req.body) {
      req.body = {};
    }
    req.body.sessionInfo = sessionInfo;
  };

  private parsePost(req: express.Request, callback: any) {
    var data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      if (data != "") {
        data = JSON.parse(data);
      }
      callback(data);
    });
  }

  private errorHandle(): void {
    this.express.use(
      (err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {
        //response.status(err.status || 500);
        response.json({
          status: 0,
          error: {
            code: err.status,
            message: "Server side error"
          }
        });
      }
    );
  }
}
