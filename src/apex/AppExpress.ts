import express from "express";
import { json, urlencoded } from "body-parser";
import { APIDocs } from "./ApiDocs";

class AppExpress {
  public express: any;

  constructor() {
    this.express = express();
    this.express.use(json());
    this.errorHandle();
    this.chunkDataHandle();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello World! Website Applications"
      });
    });
    let apiDocs = new APIDocs();
    //Prefix as dledursc
    this.express.use("/apidocs", apiDocs.getRouter());

    this.express.use("/", router);
  }

  private chunkDataHandle(): void {
    this.express.all("*", (req: any, res: express.Response, next: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "accept, Content-Type, Authorization"
      );

      if (
        req.headers["content-type"] &&
        req.headers["content-type"].indexOf(
          "application/x-www-form-urlencoded"
        ) > -1
      ) {
        this.parsePost(req, (data: any) => {
          if (data && data != "") {
            req.body = data;
          }
          next();
        });
      } else {
        next();
      }
    });
  }

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
      (
        err: Error & { status: number },
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
      ): void => {
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

export default new AppExpress().express;