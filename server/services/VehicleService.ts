import { App } from "../utils/App";
import { Vehicle } from "../entities/Vehicle";
import { VehicleDAO } from "../dao/VehicleDAO"; 
import { VehicleRegistrationDAO } from "../dao/VehicleRegistrationDAO"; 
import { VehicleInsuranceDAO } from "../dao/VehicleInsuranceDAO"; 
import { VehicleTaxDAO } from "../dao/VehicleTaxDAO";
import { VehicleRegistrationService } from "./VehicleRegistrationService";
import { VehicleTaxService } from "./VehicleTaxService";
import { VehicleInsuranceService } from "./VehicleInsuranceService";
import * as groupArray from "group-array";
import { Props } from '../config/Props';
import { ImgDAO } from "../dao/ImgDAO";

export class VehicleService {
    
    public sessionInfo: any;
    private vehicleDao: VehicleDAO;
    private vehicleregistrationDAO: VehicleRegistrationDAO;
    private vehicleinsuranceDAO: VehicleInsuranceDAO;
    private vehicletaxDAO: VehicleTaxDAO;
    private imgDao:ImgDAO;
    private vrService = new VehicleRegistrationService();
    private viService = new VehicleInsuranceService();
    private vtService = new VehicleTaxService();
    
      
    constructor() {
        this.vehicleDao = new VehicleDAO();
        this.vehicleregistrationDAO = new VehicleRegistrationDAO();
        this.vehicleinsuranceDAO = new VehicleInsuranceDAO();
        this.vehicletaxDAO = new VehicleTaxDAO();
        this.imgDao = new ImgDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.vehicleDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.vehicleDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            // reqData.grpcode = this.sessionInfo.grpcode;
            if(reqData.session.role == "SuperAdmin"){
                let data: any = await this.vehicleDao.search({});
                return Promise.resolve(data)
            }else{
                let profileData: any = await this.vehicleDao.searchByBranch(reqData.session.branch);
                return Promise.resolve(profileData);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async vehicle_entity(id: string) {
        try {
            let dat;
            let data: any = await this.vehicleDao.vehicleentity(id);
            // let finaldata = groupArray(data, 'profile_id');
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item) {
        try {
            if (await this.validate(item)) {
            
                let imgData: any = await this.imgDao.save(item.img);
                // item.vehicleRegistration.frontImg.id = App.UniqueNumber();
                // item.vehicleRegistration.backImg.id = App.UniqueNumber();
                // let frontimgData: any = await this.imgDao.save(item.vehicleRegistration.frontImg);
                // let backimgData: any = await this.imgDao.save(item.vehicleRegistration.backImg);
                
                let vehcileRegistrationData:any=await this.vrService.save(item.vehicleRegistration);

                // item.vehicleInsurance.frontImg.id = App.UniqueNumber();
                // item.vehicleInsurance.backImg.id = App.UniqueNumber();
                // let frontimgDat: any = await this.imgDao.save(item.vehicleInsurance.frontImg);
                // let backimgDat: any = await this.imgDao.save(item.vehicleInsurance.backImg);
                let vehcileInsurenceData:any=await this.viService.save(item.vehicleInsurance); 
                // item.vehicleTax.frontImg.id = App.UniqueNumber();
                // item.vehicleTax.backImg.id = App.UniqueNumber();
                // let frontimgDa: any = await this.imgDao.save(item.vehicleTax.frontImg);
                // let backimgDa: any = await this.imgDao.save(item.vehicleTax.backImg);
                let vehcileTaxData:any=await this.vtService.save(item.vehicleTax);
                console.log(item)
                let vehicleData: any = await this.vehicleDao.save(item); 
        
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: Props.INVALID_DATA
                }
                return Promise.reject(returnData);
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async list(id: any) {
        try {
            let result: any 
            let returnData = {
                id: id,
                message: Props.REMOVED_SUCCESSFULLY
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: any){
        console.log(item.id);
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        //item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
            item.img.id=uid;
            item.vehicleRegistration.id=uid;
            item.vehicleInsurance.id=uid;
            item.vehicleTax.id=uid;
        }
        return true;
    }
}