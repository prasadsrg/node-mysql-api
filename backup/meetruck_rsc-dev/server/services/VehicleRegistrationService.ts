import { App } from "../utils/App";
import { Props } from '../config/Props';
import { VehicleRegistration } from '../entities/VehicleRegistration';
import { VehicleRegistrationDAO } from '../dao/VehicleRegistrationDAO';
import { ImgDAO } from "../dao/ImgDAO";

export class VehicleRegistrationService {

    public sessionInfo: any;
    private vehicleRegistrationDao:VehicleRegistrationDAO;
    private imgDao:ImgDAO;

    constructor(){

        this.vehicleRegistrationDao = new VehicleRegistrationDAO();
        this.imgDao= new ImgDAO();
    }


    async entity(id: string) {
        try {
            let data: any = await this.vehicleRegistrationDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.vehicleRegistrationDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: any) {
        try {
            
                console.log(item)
                // item.frontImg.id = App.UniqueNumber();
                // item.backImg.id = App.UniqueNumber();
                // let frontimgData: any = await this.imgDao.save(item.frontImg);
                // let backimgData: any = await this.imgDao.save(item.backImg);
                let branchData: any = await this.vehicleRegistrationDao.save(item); 
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: VehicleRegistration){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        // item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
            
        }
        return true;
    }

}