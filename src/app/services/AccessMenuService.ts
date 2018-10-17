import { App } from "../../utils/App";
import { AccessMenuDAO } from "../repos/AccessMenuDAO";
import { AddressDAO } from "../repos/AddressDAO";
import { ImgDAO } from "../repos/ImgDAO";
import { AccessMenu } from "../../entities/AccessMenu";
import { Props } from "../../utils/Props";
import { hashSync, compareSync } from "bcryptjs";

export class AccessMenuService {
  public sessionInfo: any;
  private accessmenuDao: AccessMenuDAO;
  private addressDao: AddressDAO;
  private imgDao: ImgDAO;

  constructor() {
    this.accessmenuDao = new AccessMenuDAO();
    this.addressDao = new AddressDAO();
    this.imgDao = new ImgDAO();
  }

  async entity(id: string) {
    try {
      let data: any = await this.accessmenuDao.entity(id);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.accessmenuDao.search(reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async filter(reqData: any) {
    try {
      reqData.vid = this.sessionInfo.vid;
      let data: any = await this.accessmenuDao.search(reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }
}