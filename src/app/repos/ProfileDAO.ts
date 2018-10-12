import { getRepository, Repository } from "typeorm";
import { Profile } from "../../entities/Profile";

export class ProfileDAO {
  private dao: Repository<Profile>;

  constructor() {
    this.run();
  }

  async run() {
    this.dao = await getRepository(Profile);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("profile")
      .innerJoinAndSelect("profile.address", "address")
      .innerJoinAndSelect("profile.branch", "branch")
      .orderBy("profile.updatedOn", "DESC")
      .where(data)
      .andWhere("profile.role != 'SUPER_ADMIN'")
      .getMany();
  }

  async searchByBranch(data: any) {
    return await this.dao
      .createQueryBuilder("profile")
      .innerJoinAndSelect("profile.address", "address")
      .innerJoinAndSelect("profile.branch", "branch")
      .orderBy("profile.updatedOn", "DESC")
      .where("profile.branch = :branch", { branch: data })
      .getMany();
  }

  async save(data: any) {
    return await this.dao.save(data);
  }

  async entity(id: string) {
    return await this.dao.findOne(id, {
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

  async delete(data: Profile) {
    return await this.dao.remove([data]);
  }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
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
