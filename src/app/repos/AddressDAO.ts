import { getRepository, Repository } from "typeorm";
import { Address } from "../models/Address";

export class AddressDAO {
  private dao: Repository<Address>;

  constructor() {
    this.dao = getRepository(Address);
  }

  search(data: any) {
    return this.dao.find(data);
  }

  save(data: Address) {
    return this.dao.save(data);
  }

  entity(id: string) {
    return this.dao.findOne(id);
  }

  delete(data: Address) {
    return this.dao.remove([data]);
  }

  findOne(data: any) {
    return this.dao.findOne(data);
  }
}

Object.seal(AddressDAO);
