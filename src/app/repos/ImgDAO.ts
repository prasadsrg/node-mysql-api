import { getRepository, Repository } from "typeorm";
import { Img } from "../../entities/Img";

export class ImgDAO {
  private dao: Repository<Img>;

  constructor() {
    this.dao = getRepository(Img);
  }

  search(data: any) {
    return this.dao.find(data);
  }

  save(data: Img) {
    return this.dao.save(data);
  }

  entity(id: string) {
    return this.dao.findOne(id);
  }

  delete(data: Img) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data);
  }
}

Object.seal(ImgDAO);
