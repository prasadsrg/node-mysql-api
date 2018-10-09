import { Router, Request, Response } from "express";
import { App } from "../..//utils/App";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private router: Router = Router();
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  checkProceed(request: Request) {}
  getRouter(): Router {
    this.router.post("/", async (request: Request, response: Response) => {
      let reqData: any = request.body;
      let sessionInfo: any = {};
      let result: any = null;
      console.log(reqData);
      if (reqData) {
        this.authService.sessionInfo = sessionInfo;
        result = this.authService.retrieve(reqData);
      } else {
        result = { message: "Invalid Data" };
      }
      //App.Send(request, response, result);
      result.then((data: any) => {
        response.send(data);
      });
      result.catch((error: any) => {
        response.send(error);
      });
    });

    //Forgot Password Controller
    this.router.put(
      "/forgotpassword",
      async (request: Request, response: Response) => {
        let reqData: any = request.body;
        // let sessionInfo: any = {};
        let result: any = null;
        console.log(reqData.data);
        if (reqData.data) {
          // sessionInfo.grpcode = reqData.data.grpcode;
          // this.authService.sessionInfo = sessionInfo;
          result = this.authService.forgotPassword(reqData.data);
        } else {
          result = { message: "Invalid Data" };
        }
        App.Send(request, response, result);
      }
    );

    //Reset Password
    this.router.put(
      "/resetpassword",
      async (request: Request, response: Response) => {
        let reqData: any = request.body;
        // let sessionInfo: any = {};
        let result: any = null;
        console.log(reqData.data);
        if (reqData.data) {
          // sessionInfo.grpcode = reqData.data.grpcode;
          //this.authService.sessionInfo = sessionInfo;
          result = this.authService.resetPassword(reqData.data);
        } else {
          result = { message: "Invalid Data" };
        }
        App.Send(request, response, result);
      }
    );

    //Change Password
    this.router.put(
      "/changepassword",
      async (request: Request, response: Response) => {
        let reqData: any = request.body;
        // reqData.id = this.authService.sessionInfo.id;
        // let sessionInfo: any = {};
        let result: any = null;
        console.log(reqData.data);
        if (reqData.data) {
          // sessionInfo.grpcode = reqData.data.grpcode;
          //this.authService.sessionInfo = sessionInfo;
          result = this.authService.changePassword(reqData.data);
        } else {
          result = { message: "Invalid Data" };
        }
        App.Send(request, response, result);
      }
    );
    return this.router;
  }
}
