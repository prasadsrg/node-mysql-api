
import { App } from "../utils/App";
import { Props } from '../config/Props';
import { DeviceDAO } from "../dao/DeviceDAO";
import { UserVehicle } from "../entities/UserVehicle";
import { UserVehicleDAO } from "../dao/UserVehicleDAO";

export class UserVehicleService {

    public sessionInfo: any;
    private deviceDao:DeviceDAO;
    private userVehicleDao:UserVehicleDAO;

    constructor(){

        this.userVehicleDao = new UserVehicleDAO();
        this.deviceDao = new DeviceDAO();
    }


    async entity(id: string) {
        try {
            let data: any = await this.userVehicleDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.userVehicleDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            // reqData.grpcode = this.sessionInfo.grpcode;
            if(reqData.session.role == "SuperAdmin"){
                let data: any = await this.userVehicleDao.search({});
                if(data.length == 0){
                    return Promise.resolve({message: "No Records"})
                }
                return Promise.resolve(data)
            }else{
                let data: any = await this.userVehicleDao.searchByBranch(reqData.session.branch);
                if(data.length == 0){
                    return Promise.resolve({message: "No Records"})
                }
                return Promise.resolve(data);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: any) {
        try {
            if (await this.validate(item)) {
                console.log(item);
                let deviceData : any = await this.deviceDao.save(item.device);
                let branchData: any = await this.userVehicleDao.save(item); 
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

    async validate(item: UserVehicle){
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