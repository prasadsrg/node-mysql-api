import { App } from "../utils/App";

import { Props } from '../config/Props';
import { DeviceDAO } from "../dao/DeviceDAO";
import { BranchDAO } from "../dao/BranchDAO";
import { AgencyDevice } from "../entities/AgencyDevice";
import { AgencyDeviceDAO } from "../dao/AgencyDeviceDAO";


export class AgencyDeviceService {
    
    public sessionInfo: any;
    private agencyDeviceDao:AgencyDeviceDAO;
    private deviceDao:DeviceDAO;
    private branchDao:BranchDAO;

    
    
      
    constructor() {
  
        //  this.profileService = new ProfileService();
        this.agencyDeviceDao = new AgencyDeviceDAO();
        this.deviceDao = new DeviceDAO();
        this.branchDao = new BranchDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.agencyDeviceDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            let data: any = await this.agencyDeviceDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            // reqData.grpcode = this.sessionInfo.grpcode;
            if(reqData.session.role == "SuperAdmin"){
                let data: any = await this.agencyDeviceDao.search({});
                if(data.length == 0){
                    return Promise.reject({message: "No Records"})
                }
                return Promise.resolve(data)
            }else{
                let profileData: any = await this.agencyDeviceDao.searchByBranch(reqData.session.branch);
                if(profileData.length == 0){
                    return Promise.reject({message: "No Records"})
                }
                return Promise.resolve(profileData);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: any) {
        try {
            if (await this.validate(item)) {
                console.log(item)
                let device = { id: item.device.id, deviceIn:item.branch.id}
                let deviceData: any = await this.deviceDao.save(device);
                let agencyDeviceData: any = await this.agencyDeviceDao.save(item); 

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

    // async delete(id: any) {
    //     try {
    //         let data: ApexReport = (await this.apexReportDao.entity(id))
    //         let result: any = await this.apexReportDao.delete(data);
    //         let returnData = {
    //             id: id,
    //             message: Props.REMOVED_SUCCESSFULLY
    //         }
    //         return Promise.resolve(returnData);
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async validate(item: any){
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