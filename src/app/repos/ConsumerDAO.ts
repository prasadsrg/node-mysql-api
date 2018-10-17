import { getRepository, Repository } from "typeorm";
import { Consumer } from "../../entities/Consumer";

export class ConsumerDAO {
  private dao: Repository<Consumer>;

  constructor() {
    this.run();
  }

  async run() {
    this.dao = await getRepository(Consumer);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("consumer")
      .innerJoinAndSelect("consumer.address", "address")
      .where(data)
      .getMany();
  }

  async save(data: Consumer) {
    return await this.dao.save(data);
  }

  async delete(data: Consumer) {
    return await this.dao.remove(data);
  }

  async entity(id: any) {
    return await this.dao.findOne(id, {
      join: {
        alias: "consumer",
        innerJoinAndSelect: {
          img: "consumer.img",
          address: "consumer.address"
        }
      }
    });
  }
}

Object.seal(ConsumerDAO);
