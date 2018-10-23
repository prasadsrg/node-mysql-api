import { Router } from "express";
import { App } from "../utils/App";

import { ProfileController } from "../app/routes/ProfileController";
import { AuthController } from "../app/routes/AuthController";
import { AppDataController } from "../app/routes/AppDataController";
import { ConsumerController } from "../app/routes/ConsumerController";
import { AccessMenuController } from "../app/routes/AccessMenuController";
import { AccessDataController } from "../app/routes/AccessDataController";
import { BranchController } from "../app/routes/BranchController";


export class AppController {
  private router: Router = Router();

  getRouter() {
    this.router.use("/auth", new AuthController().getRouter());
    this.router.use("/profile", new ProfileController().getRouter());
    this.router.use("/appdata", new AppDataController().getRouter());
    this.router.use("/consumer", new ConsumerController().getRouter());
    this.router.use("/accessmenu", new AccessMenuController().getRouter());
    this.router.use("/accessdata", new AccessDataController().getRouter());
    this.router.use("/branch", new BranchController().getRouter());


    return this.router;
  }
}
