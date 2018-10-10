import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { Props } from "../../utils/Props";
import { AppDataService } from "../services/AppDataService";

export class AppDataController {
  private router: Router = Router();
  private service = new AppDataService();

  getRouter(): Router {
    this.router.get("/:id", async (request: Request, response: Response) => {
      try {
        const id: any = request.params.id;
        this.service.sessionInfo = request.body.sessionInfo;
        let result = null;
        App.PrintLog(this.constructor.name, "Entity", this.service.sessionInfo);
        if (App.CheckSessionInfo(this.service.sessionInfo)) {
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

    return this.router;
  }
}