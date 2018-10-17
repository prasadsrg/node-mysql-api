import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { Props } from "../../utils/Props";
import { AccessDataService } from "../services/AccessDataService";

export class AccessDataController {
  private componentName: string = "accessData";
  private router: Router = Router();
  private service = new AccessDataService();

  getRouter(): Router {
    this.router.post("/", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body ? request.body.data : {};
        reqData.session = request.body.sessionInfo;
        this.service.sessionInfo = request.body.sessionInfo;
        App.PrintLog(this.constructor.name, "Search", this.service.sessionInfo);
        let result = null;
        if (App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props.ACCESS_READ)) {
          result = await this.service.search(reqData);
          console.log(result);
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
