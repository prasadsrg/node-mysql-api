import { getRepository, Repository } from "typeorm";
import { Profile } from "../models/Profile";

export class ProfileDAO {
  private dao: Repository<Profile>;

  constructor() {
    this.dao = getRepository(Profile);
  }

  search(data: any) {
    return this.dao
      .createQueryBuilder("profile")
      .innerJoinAndSelect("profile.address", "address")
      .innerJoinAndSelect("profile.branch", "branch")
      .orderBy("profile.updatedOn", "DESC")
      .getMany();
  }

  searchByBranch(data: any) {
    return this.dao
      .createQueryBuilder("profile")
      .innerJoinAndSelect("profile.address", "address")
      .innerJoinAndSelect("profile.branch", "branch")
      .orderBy("profile.updatedOn", "DESC")
      .where("profile.branch = :branch", { branch: data })
      .getMany();
  }

  save(data: any) {
    return this.dao.save(data);
  }

  entity(id: string) {
    return this.dao.findOne(id, {
      join: {
        alias: "profile",
        innerJoinAndSelect: {
          img: "profile.img",
          address: "profile.address",
          branch: "profile.branch"
        }
      }
    });
  }

  delete(data: Profile) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data, {
      join: {
        alias: "profile",
        innerJoinAndSelect: {
          branch: "profile.branch"
        }
      }
    });
  }
}

Object.seal(ProfileDAO);
