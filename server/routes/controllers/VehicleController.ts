import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { VehicleService } from "../../services/VehicleService";
import { Props } from '../../config/Props';

export class VehicleController {

    private router: Router = Router();
    private service = new VehicleService();

    getRouter(): Router {
        this.router.post("/", async(request: Request, response: Response) => {
            let reqData : any;
            reqData = request.body.data ? request.body.data : {};
            reqData.session = request.body.sessionInfo;         
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Search' : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.filter(reqData);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);

        });
        
        this.router.put("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Save' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
           if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.save(reqData);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.get("/:id", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Entity' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.entity(id);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.put("/driver", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'vehicle_entity' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.vehicle_entity(reqData);

            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.get("/ownerVehicle", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Entity' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.list(id);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        return this.router;
    }
}
