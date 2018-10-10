import { Router } from "express";
import { App } from "../utils/App";

import { ProfileController } from "../app/routes/ProfileController";
import { AuthController } from "../app/routes/AuthController";

export class AppController {
  private router: Router = Router();

  getRouter() {
    this.router.use("/auth", new AuthController().getRouter());
    this.router.use("/profile", new ProfileController().getRouter());

    return this.router;
  }
}
