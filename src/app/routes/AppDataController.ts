import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { Props } from "../../utils/Props";
import { AppDataService } from "../services/AppDataService";

export class AppDataController {
  private componentName: String = "AppData";
  private router: Router = Router();
  private service = new AppDataService();

  getRouter(): Router {
    this.router.get("/:id", async (request: Request, response: Response) => {
      try {
        const id: any = request.params.id;
        this.service.sessionInfo = request.body.sessionInfo;
        let result = null;
        App.PrintLog(this.constructor.name, "Entity", this.service.sessionInfo);
        if (App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props.ACCESS_READ)) {
          result = await this.service.entity(id);
        } else {
          throw this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE };
        }
        response.send({ status: 1, data: result });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.query ? request.query : {};
        reqData.session = request.body.sessionInfo;
        this.service.sessionInfo = request.body.sessionInfo;
        App.PrintLog(this.constructor.name, "Search", this.service.sessionInfo);
        let result = null;
        if (App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props.ACCESS_READ)) {
          result = await this.service.filter(reqData);
        } else {
          throw this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE };
        }
        response.send({ status: 1, data: result });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });
    this.router.put("/", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body.data ? request.body.data : {};
        // reqData.session = request.body.sessionInfo;
        this.service.sessionInfo = request.body.sessionInfo;
        App.PrintLog(this.constructor.name, "SAVE", this.service.sessionInfo);
        let result = null;
        if (App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props.ACCESS_WRITE)) {
          result = await this.service.save(reqData);
        } else {
          throw this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE };
        }
        response.send({ status: 1, data: result });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
