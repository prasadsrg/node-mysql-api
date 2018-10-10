import { getRepository, Repository } from "typeorm";
import { AppData } from "../../entities/AppData";

export class AppDataDAO {
  private dao: Repository<AppData>;

  constructor() {
    this.dao = getRepository(AppData);
  }

  async search(data: any) {
    return await this.dao.find(data);
  }

  async save(data: AppData) {
    return await this.dao.save(data);
  }

  async entity(id: string) {
    return await this.dao.findOne(id);
  }

  async delete(data: AppData) {
    return await this.dao.remove([data]);
  }

  async findOne(data: any) {
    return await this.dao.findOne(data);
  }
}

Object.seal(AppDataDAO);
