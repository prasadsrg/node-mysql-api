import { App } from "../../utils/App";
import { ConsumerDAO } from "../repos/ConsumerDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { Consumer } from "../../entities/Consumer";
import { Props } from "../../utils/Props";

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

  async filter(reqData: any) {
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
      let uid = App.UniqueNumber();
      item.id = uid;
    } else {
      item.vid = this.sessionInfo.vid;
      return true;
    }
  }

  async save(item: any) {
    try {
      if (await this.validate(item)) {
        let data: any = await this.consumerDao.save(item);
        console.log(data);
        let returnData = {
          id: item.id,
          message: Props.SAVED_SUCCESSFULLY
        };
        return returnData;
      } else {
        let returnData = {
          message: Props.INVALID_DATA
        };
        console.log(returnData);
        throw returnData;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data: Consumer = await this.consumerDao.entity(id);
      let result: any = await this.consumerDao.delete(data);
      let returnData = {
        id: id,
        message: Props.REMOVED_SUCCESSFULLY
      };
      return returnData;
    } catch (error) {
      throw error;
    }
  }
}
