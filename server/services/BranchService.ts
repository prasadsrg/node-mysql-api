import { App } from "../utils/App";
import { Branch } from "../../src/models/Branch";
import { BranchDAO } from "../../src/repos/BranchDAO";
import { Props } from "../config/Props";
import { AddressDAO } from "../../src/repos/AddressDAO";
import { ImgDAO } from "../../src/repos/ImgDAO";
import { ProfileDAO } from "../../src/repos/ProfileDAO";
import { ProfileService } from "../../src/app/services/ProfileService";

export class BranchService {
  public sessionInfo: any;
  private branchDao: BranchDAO;
  private addressDao: AddressDAO;
  private imgDao: ImgDAO;
  private profileDao: ProfileDAO;
  private profileService: any;

  constructor() {
    this.branchDao = new BranchDAO();
    this.addressDao = new AddressDAO();
    this.imgDao = new ImgDAO();
    this.profileDao = new ProfileDAO();
    //  this.profileService = new ProfileService();
  }

  async entity(id: string) {
    try {
      let data: any = await this.branchDao.entity(id);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async search(reqData: any) {
    try {
      let data: any = await this.branchDao.search(reqData);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async save(item: any) {
    try {
      if (await this.validate(item)) {
        let addressData = await this.addressDao.save(item.address);
        let imgData = await this.imgDao.save(item.img);
        item.address.id = addressData.id;
        item.img.id = imgData.id;

        let branchData: any = await this.branchDao.save(item);
        // item.profile.branch = {id:item.id}
        // let pId = App.UniqueNumber();
        // item.profile.id = pId;
        // item.profile.address.id = pId;
        // item.profile.img.id = pId;
        // let profileAddress = await this.addressDao.save(item.profile.address);
        // let profileImg = await this.imgDao.save(item.profile.img);
        // let profile = await this.profileDao.save(item.profile);

        let returnData = {
          id: item.id,
          Agency: item.name,
          // User: profile.name,
          message: Props.SAVED_SUCCESSFULLY
        };
        return Promise.resolve(returnData);
      } else {
        let returnData = {
          message: Props.INVALID_DATA
        };
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

  async validate(item: Branch) {
    if (!item.id || item.id == "" || item.id == "0") {
      item.id = null;
    }
    // item.grpcode=this.sessionInfo.grpcode;
    item.updatedBy = this.sessionInfo.id;
    if (!item.id) {
      let uid = App.UniqueNumber();
      item.id = uid;
      item.address.id = uid;
      item.img.id = uid;
    }
    return true;
  }
}
