import { Device } from './../entities/Device';
import { DeviceDAO } from './../dao/DeviceDAO';
import { App } from "../utils/App";
import { Props } from '../config/Props';

export class DeviceService {

    public sessionInfo: any;
    private deviceDao:DeviceDAO;

    constructor(){
        this.deviceDao = new DeviceDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.deviceDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.deviceDao.search(reqData);
            if(data.length == 0){
                return Promise.resolve({message: "No Records"})
            }
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            // reqData.grpcode = this.sessionInfo.grpcode;
            if(reqData.session.role == "SuperAdmin"){
                let data: any = await this.deviceDao.search({});
                if(data.length == 0){
                    return Promise.reject({message: "No Records"})
                }
                return Promise.resolve(data)
            }else{
                let profileData: any = await this.deviceDao.searchByBranch(reqData.session.branch);
                if(profileData.length == 0){
                    return Promise.reject({message: "No Records"})
                }
                return Promise.resolve(profileData);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Device) {
        try {
            if (await this.validate(item)) {
                let branchData: any = await this.deviceDao.save(item); 
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: Props.INVALID_DATA
                }
                return Promise.reject(returnData.message);
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: Device){
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
