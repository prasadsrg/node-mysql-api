import { Router } from "express";
import { App } from "../utils/App";

import { ProfileController } from "../app/routes/ProfileController";
import { AuthController } from "../app/routes/AuthController";
import { AppDataController } from "../app/routes/AppDataController";
import { ConsumerController } from "../app/routes/ConsumerController";

export class AppController {
  private router: Router = Router();

  getRouter() {
    this.router.use("/auth", new AuthController().getRouter());
    this.router.use("/profile", new ProfileController().getRouter());
    this.router.use("/appdata", new AppDataController().getRouter());
    this.router.use("/consumer", new ConsumerController().getRouter());

    return this.router;
  }
}
