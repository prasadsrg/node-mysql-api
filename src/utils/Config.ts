import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Profile } from "../app/models/Profile";
import { Address } from "../app/models/Address";
import { Branch } from "../app/models/Branch";
import { AccessMenu } from "../app/models/AccessMenu";
import { Img } from "../app/models/Img";

export let dbOptions: ConnectionOptions = {
  name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Admin!234",
  database: "abcd_db",
  logging: true,
  synchronize: false,
  entities: [Profile, Address, Img, Branch, AccessMenu]
};
