import { App } from "../../utils/App";
import { AccessDataDAO } from "../repos/AccessDataDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { AccessData } from "../../entities/AccessData";
import { Props } from "../../utils/Props";
import { hashSync, compareSync } from "bcryptjs";

export class AccessDataService {
  public sessionInfo: any;
  private accessDataDao: AccessDataDAO;

  constructor() {
    this.accessDataDao = new AccessDataDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.accessDataDao.entity(id);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(reqData: any) {
    try {
      console.log(reqData);
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.accessDataDao.search(reqData);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
