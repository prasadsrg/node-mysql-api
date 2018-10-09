import { getEntityManager, Repository } from "typeorm";
import { Branch } from "../models/Branch";

export class BranchDAO {
  private dao: Repository<Branch>;

  constructor() {
    this.dao = getEntityManager().getRepository(Branch);
  }

  search(data: any) {
    // return this.dao.find(data, {
    //     alias: "branch",
    //     innerJoinAndSelect: {
    //     },
    // });

    return this.dao
      .createQueryBuilder("branch")
      .orderBy("branch.updatedOn", "DESC")
      .getMany();
  }

  save(data: Branch) {
    return this.dao.persist(data);
  }

  entity(id: string) {
    return this.dao.findOneById(id, {
      alias: "branch",
      innerJoinAndSelect: {
        address: "branch.address",
        img: "branch.img"
      }
    });
  }

  delete(data: Branch) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data, {
      alias: "branch",
      innerJoinAndSelect: {
        address: "branch.address",
        img: "branch.img"
      }
    });
  }
}

Object.seal(BranchDAO);
