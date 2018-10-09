import { getRepository, Repository } from "typeorm";
import { AccessMenu } from "../../entities/AccessMenu";

export class AccessMenuDAO {
  private dao: Repository<AccessMenu>;

  constructor() {
    this.dao = getRepository(AccessMenu);
  }

  search(data: any) {
    return this.dao.find(data);
  }

  save(data: AccessMenu) {
    return this.dao.save(data);
  }

  entity(id: string) {
    return this.dao.findOne(id);
  }

  delete(data: AccessMenu) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data);
  }
}

Object.seal(AccessMenuDAO);
