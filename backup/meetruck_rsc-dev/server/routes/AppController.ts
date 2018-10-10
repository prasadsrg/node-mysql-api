import { Router } from "express";
import { App } from "../utils/App";
import { ApexReportController } from "./common/ApexReportController";
import { AppMenuController } from './common/AppMenuController';
import { BranchController } from './controllers/BranchController';
import { ImgController } from './controllers/ImgController';
import { AppDataController} from './common/AppDataController';
import { VehicleController } from './controllers/VehicleController';
import { DriverController } from './controllers/DriverController';
import { DeviceController } from './controllers/DeviceController';
import { ProfileController } from "./controllers/ProfileController";
import { UserVehicleController } from "./controllers/UserVehicleController";
import { AgencyDeviceController} from "./controllers/AgencyDeviceController";



export class AppController {
    private router: Router = Router();

    getRouter() {
     
        this.router.use('/appdata', new AppDataController().getRouter());
        this.router.use('/appmenu', new AppMenuController().getRouter());
        this.router.use("/apexreport", new ApexReportController().getRouter());
        this.router.use("/agency", new BranchController().getRouter());
        this.router.use("/img", new ImgController().getRouter());
        this.router.use('/vehicle', new VehicleController().getRouter());
        this.router.use('/device',new DeviceController().getRouter());
        this.router.use('/driver', new DriverController().getRouter());
        this.router.use('/profile', new ProfileController().getRouter());
        this.router.use('/uservehicle', new UserVehicleController().getRouter());
        this.router.use('/agencydevice', new AgencyDeviceController().getRouter());

        return this.router;
    }
}
