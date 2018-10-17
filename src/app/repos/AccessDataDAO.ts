import { Repository, getRepository } from "typeorm";
import { AccessData } from "../../entities/AccessData";

export class AccessDataDAO {
  private dao: Repository<AccessData>;

  constructor() {
    this.dao = getRepository(AccessData);
  }

  search(data: any) {
    return this.dao
      .createQueryBuilder("accessData")
      .where(data)
      .andWhere("`accessData`.`code` != 'SUPER_ADMIN'")
      .getMany();
  }

  save(data: AccessData) {
    return this.dao.save(data);
  }

  entity(id: string) {
    return this.dao.findOne(id);
  }

  delete(data: AccessData) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data);
  }
}

Object.seal(AccessDataDAO);
