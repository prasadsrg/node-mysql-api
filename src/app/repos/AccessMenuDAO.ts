import { getEntityManager, Repository } from "typeorm";
import { AccessMenu } from "../models/AccessMenu";

export class AccessMenuDAO {
  private dao: Repository<AccessMenu>;

  constructor() {
    this.dao = getEntityManager().getRepository(AccessMenu);
  }

  search(data: any) {
    return this.dao.find(data, {
      alias: "accessMenu",
      innerJoinAndSelect: {}
    });

    //     return this.dao.createQueryBuilder("appMenu")
    //    .orderBy("appMenu.updated_on", "DESC")
    //    .getMany();
  }

  save(data: AccessMenu) {
    return this.dao.persist(data);
  }

  entity(id: string) {
    return this.dao.findOneById(id, {
      alias: "accessMenu",
      innerJoinAndSelect: {}
    });
  }

  delete(data: AccessMenu) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data, {
      alias: "accessMenu",
      innerJoinAndSelect: {}
    });
  }
}

Object.seal(AccessMenuDAO);
