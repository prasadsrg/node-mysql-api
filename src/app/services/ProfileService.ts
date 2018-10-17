import { App } from "../../utils/App";
import { Profile } from "../../entities/Profile";
import { ProfileDAO } from "../repos/ProfileDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { Props } from "../../utils/Props";
import { Repository, QueryBuilder } from "typeorm";
import { hashSync, compareSync } from "bcryptjs";

export class ProfileService {
  public sessionInfo: any;
  private profileDao: ProfileDAO;
  private addressDao: AddressDAO;
  private imgDao: ImgDAO;

  constructor() {
    this.profileDao = new ProfileDAO();
    this.addressDao = new AddressDAO();
    this.imgDao = new ImgDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.profileDao.entity(id);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.profileDao.search(reqData);
      return data;
    } catch (error) {
      return error;
    }
  }

  async filter(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      if (reqData.session.role == "SuperAdmin" || reqData.session.role == "SUPER_ADMIN") {
        let data: any = await this.profileDao.search({});
        return data;
      } else {
        let profileData: any = await this.profileDao.searchByBranch(reqData.session.branch);
        return profileData;
      }
    } catch (error) {
      return error;
    }
  }

  async save(item: Profile) {
    try {
      let cond = await this.validate(item);
      if (cond == true) {
        let addressData: any = await this.addressDao.save(item.address);
        let imgData: any = await this.imgDao.save(item.img);
        item.password = hashSync(item.password, 8);
        let profileData: any = await this.profileDao.save(item);
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

  async delete(id: any) {
    try {
      let data: Profile = await this.profileDao.entity(id);
      let result: any = await this.profileDao.delete(data);
      let returnData = {
        id: id,
        message: Props.REMOVED_SUCCESSFULLY
      };
      return returnData;
    } catch (error) {
      return error;
    }
  }

  async changePassword(reqData: any) {
    try {
      console.log(reqData);
      let data: any = await this.profileDao.entity(reqData.id);
      console.log(data);
      if (data) {
        let check = compareSync(reqData.oldPassword, data.password);
        console.log(check);
        if (check) {
          let pwd = hashSync(reqData.newPassword, 8);
          let newPassword = {
            id: reqData.id,
            password: pwd
          };
          console.log(newPassword);
          let newData: any = await this.profileDao.save(newPassword);
          return Promise.resolve("New Password Set Successfully");
        } else {
          return Promise.reject("Invalid Password");
        }
      } else {
        return Promise.reject("Invalid User");
      }
    } catch (error) {
      return Promise.reject("Technical issue in Resetting Password, Sorry for Inconvience");
    }
  }

  async validate(item: Profile) {
    if (!item.id || item.id == "" || item.id == "0") {
      item.id = null;
    }
    item.updatedBy = this.sessionInfo.id;
    let query: {};
    let data = await this.profileDao.search({ email: item.email });
    let mdata = await this.profileDao.search({ mobile: item.mobile });

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
}
