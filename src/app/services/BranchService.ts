import { App } from "../../utils/App";
import { BranchDAO } from "../repos/BranchDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { Branch } from "../../entities/Branch";
import { Props } from "../../utils/Props";
import { hashSync, compareSync } from "bcryptjs";

export class BranchService {
  public sessionInfo: any;
  private branchDao: BranchDAO;
  private addressDao: AddressDAO;
  private imgDao: ImgDAO;

  constructor() {
    this.branchDao = new BranchDAO();
    this.addressDao = new AddressDAO();
    this.imgDao = new ImgDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.branchDao.entity(id);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.branchDao.search(reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: Branch) {
    if (!item.id || item.id == "" || item.id == "0") {
      item.id = null;
    }
    item.updatedBy = this.sessionInfo.id;
    let query: {};
    console.log(item);
    let data = await this.branchDao.search({ email: item.email });
    let mdata = await this.branchDao.search({ mobile: item.mobile });
    console.log(data);
    if ((item.id && data.length > 1) || (!item.id && data.length > 0)) {
      return "Email";
    } else if ((item.id && mdata.length > 1) || (!item.id && mdata.length > 0)) {
      return "Mobile";
    } else {
      if (!item.id) {
        let uid = App.UniqueNumber();
        item.id = uid;
        item.address.id = uid;
        item.img.id = uid;
        item.vid = this.sessionInfo.vid;
      }
      return true;
    }
  }

  async save(item: Branch) {
     try {
      let cond = await this.validate(item);
      if (cond == true) {
        let addressData: any = await this.addressDao.save(item.address);
        let imgData: any = await this.imgDao.save(item.img);
        let profileData: any = await this.branchDao.save(item);
        let returnData = {
          id: item.id,
          message: Props.SAVED_SUCCESSFULLY
        };
        return returnData;
      } else if (cond == "Email") {
        let returnData = {
          message: Props.EMAIL_EXISTS
        };
        return returnData;
      } else if (cond == "Mobile") {
        let returnData = {
          message: Props.MOBILE_EXISTS
        };
        return returnData;
      }
    } catch (error) {
      return error;
    }
  }
}
