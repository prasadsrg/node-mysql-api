import { App } from "../../utils/App";
import { AppData } from "../../entities/AppData";
import { AppDataDAO } from "../repos/AppDataDAO";
import { Props } from "../../utils/Props";

export class AppDataService {
  public sessionInfo: any;
  private appDataDao: AppDataDAO;

  constructor() {
    this.appDataDao = new AppDataDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.appDataDao.entity(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async filter(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.appDataDao.search(reqData);
      return data;
    } catch (error) {
      return error;
    }
  }

  async save(item: AppData) {
    try {
      if (await this.validate(item)) {
        let appDataDao: any = await this.appDataDao.save(item);
        let returnData = {
          id: item.id,
          message: Props.SAVED_SUCCESSFULLY
        };
        return returnData;
      } else {
        let returnData = {
          message: Props.INVALID_DATA
        };
        throw returnData;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data: AppData = await this.appDataDao.entity(id);
      let result: any = await this.appDataDao.delete(data);
      let returnData = {
        id: id,
        message: Props.REMOVED_SUCCESSFULLY
      };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: AppData) {
    if (!item.id || item.id == "" || item.id == "0") {
      let uid = App.UniqueNumber();
      item.id = uid;
    }
    item.vid = this.sessionInfo.vid;
    return true;
  }
}
