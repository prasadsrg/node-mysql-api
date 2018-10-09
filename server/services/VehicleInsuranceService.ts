import { App } from "../utils/App";
import { Props } from "../config/Props";
import { VehicleInsuranceDAO } from "../dao/VehicleInsuranceDAO";
import { VehicleInsurance } from "../entities/VehicleInsurance";
import { ImgDAO } from "../../src/repos/ImgDAO";

export class VehicleInsuranceService {
  public sessionInfo: any;
  private vehicleInsuranceDao: VehicleInsuranceDAO;
  private imgDao: ImgDAO;

  constructor() {
    this.vehicleInsuranceDao = new VehicleInsuranceDAO();
    this.imgDao = new ImgDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.vehicleInsuranceDao.entity(id);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async search(reqData: any) {
    try {
      //  reqData.grpcode = this.sessionInfo.grpcode;
      let data: any = await this.vehicleInsuranceDao.search(reqData);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async save(item: any) {
    try {
      // item.frontImg.id = App.UniqueNumber();
      // item.backImg.id = App.UniqueNumber();
      // let frontimgData: any = await this.imgDao.save(item.frontImg);
      // let backimgData: any = await this.imgDao.save(item.backImg);
      //console.log(item)
      let branchData: any = await this.vehicleInsuranceDao.save(item);
      let returnData = {
        id: item.id,
        message: Props.SAVED_SUCCESSFULLY
      };
      return Promise.resolve(returnData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async validate(item: VehicleInsurance) {
    if (!item.id || item.id == "" || item.id == "0") {
      item.id = null;
    }
    // item.grpcode=this.sessionInfo.grpcode;
    item.updatedBy = this.sessionInfo.id;
    if (!item.id) {
      let uid = App.UniqueNumber();
      item.id = uid;
    }
    return true;
  }
}
