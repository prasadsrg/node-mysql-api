import { App } from "../../utils/App";
import { ConsumerDAO } from "../repos/ConsumerDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { Consumer } from "../../entities/Consumer";
import { Props } from "../../utils/Props";
import { hashSync, compareSync } from "bcryptjs";
import { Img } from "../../entities/Img";
import { Address } from "../../entities/Address";

export class ConsumerService {
  public sessionInfo: any;
  private consumerDao: ConsumerDAO;
  private addressDao: AddressDAO;
  private imgDao: ImgDAO;

  constructor() {
    this.consumerDao = new ConsumerDAO();
    this.addressDao = new AddressDAO();
    this.imgDao = new ImgDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.consumerDao.entity(id);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.consumerDao.search(reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: Consumer) {
    if (!item.id || item.id == "" || item.id == "0") {
      item.id = null;
    }
    item.updatedBy = this.sessionInfo.id;
    console.log(item);
    let query: {};
    console.log(item);
    let data = await this.consumerDao.search({ email: item.email });
    let mdata = await this.consumerDao.search({ mobile: item.mobile });
    if ((item.id && data.length > 1) || (!item.id && data.length > 0)) {
      console.log("Email");
      return "Email";
    } else if ((item.id && mdata.length > 1) || (!item.id && mdata.length > 0)) {
      console.log("Mobile");
      return "Mobile";
    } else {
      console.log("else");
      if (!item.id) {
        let uid = App.UniqueNumber();
        console.log(item.id);
        item.id = uid;
        if (!item.address) {
          item.address = new Address();
        }
        item.address.id = uid;
        if (!item.img) {
          item.img = new Img();
        }
        item.img.id = uid;
        item.vid = this.sessionInfo.vid;
      }
    }
    return true;
  }

  async save(item: Consumer) {
    try {
      let cond = await this.validate(item);
      console.log(cond);
      if (cond == true) {
        let addressData: any = await this.addressDao.save(item.address);
        let imgData: any = await this.imgDao.save(item.img);
        // item.password = hashSync(item.password, 8);
        let consumerData: any = await this.consumerDao.save(item);
        let returnData = {
          id: item.id,
          message: Props.SAVED_SUCCESSFULLY
        };
        console.log(returnData);
        return returnData;
      } else if (cond == "Email") {
        throw {
          message: Props.EMAIL_EXISTS
        };
      } else if (cond == "Mobile") {
        throw {
          message: Props.MOBILE_EXISTS
        };
      }
    } catch (error) {
      return error;
    }
  }
}
