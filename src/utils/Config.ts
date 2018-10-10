import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Profile } from "../entities/Profile";
import { Address } from "../entities/Address";
import { Branch } from "../entities/Branch";
import { AccessMenu } from "../entities/AccessMenu";
import { Img } from "../entities/Img";
import { AppData } from "../entities/AppData";

export let dbOptions: ConnectionOptions = {
  name: "default",
  type: "mysql",
  host: "qa.dfftech.com",
  port: 3306,
  username: "abcd_user",
  password: "abcd!234",
  database: "abcd_db",
  logging: true,
  synchronize: false,
  entities: [Profile, Address, Branch, AccessMenu, Img, AppData]
};
