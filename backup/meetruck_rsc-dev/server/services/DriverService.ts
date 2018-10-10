
import { DriverDAO } from './../dao/DriverDAO';
import { ProfileDAO } from './../dao/ProfileDAO';
import { AddressDAO } from "./../dao/AddressDAO";
import { ImgDAO } from "./../dao/ImgDAO";
import { Driver } from './../entities/Driver';
import { App } from "../utils/App";
import { Props } from '../config/Props';
import { hashSync, compare } from "bcryptjs";

export class DriverService {

    public sessionInfo: any;
    private driverDao:DriverDAO;
    private profileDao : ProfileDAO;
    private addressDao: AddressDAO;
    private imgDao: ImgDAO;

    constructor(){

        this.driverDao = new DriverDAO();
        this.profileDao = new ProfileDAO();
        this.addressDao = new AddressDAO();
        this.imgDao = new ImgDAO();

    }


    async entity(id: string) {
        try {
            let data: any = await this.driverDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.driverDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            // reqData.grpcode = this.sessionInfo.grpcode;
            if(reqData.session.role == "SuperAdmin"){
                let data: any = await this.driverDao.search({});
                return Promise.resolve(data)
            }else{
                let profileData: any = await this.driverDao.searchByBranch(reqData.session.branch);
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
                item.profile.id = item.id;
                item.profile.address.id = item.id;
                item.profile.img.id = item.id;
                item.frontImg.id = App.UniqueNumber();
                item.backImg.id = App.UniqueNumber();
                let addressData: any = await this.addressDao.save(item.profile.address);
                let imgData: any = await this.imgDao.save(item.profile.img);
                item.password = hashSync(item.password, 8);
                let profileData: any = await this.profileDao.save(item.profile);
                let frontImgData: any = await this.imgDao.save(item.frontImg);
                let backImgData: any = await this.imgDao.save(item.backImg);
                let branchData: any = await this.driverDao.save(item); 
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

    async validate(item: Driver){
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
