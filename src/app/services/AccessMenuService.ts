import { App } from "../../utils/App";
import { AccessMenuDAO } from "../repos/AccessMenuDAO";
import { AccessMenu } from "../../entities/AccessMenu";
import { Props } from "../../utils/Props";

export class AccessMenuService {
  public sessionInfo: any;
  private accessMenuDao: AccessMenuDAO;

  constructor() {
    this.accessMenuDao = new AccessMenuDAO();
  }

  // async entity(id: string) {
  //   try {
  //     let data: any = await this.accessMenuDao.entity(id);
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async search(reqData: any) {
    try {
      console.log(reqData);
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.accessMenuDao.search(reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
