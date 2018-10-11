import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Profile } from "../entities/Profile";
import { Address } from "../entities/Address";
import { Branch } from "../entities/Branch";
import { AccessMenu } from "../entities/AccessMenu";
import { Img } from "../entities/Img";
import { AppData } from "../entities/AppData";

export let dbOptions: any = {
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

export let mailOptions: any = {
  host: "smtp.gmail.com",
  port: 465,
  user: "dfftech@gmail.com",
  pass: "Test!234"
};

export let setEnvConfig = () => {
  let envData: any = process.env.ENV_ABCD;
  if (envData) {
    envData = JSON.parse(envData);
    if (envData.db_host) {
      dbOptions.host = envData.db_host;
      dbOptions.port = envData.db_port;
      dbOptions.username = envData.db_user;
      dbOptions.password = envData.db_password;
    }

    if (envData.mail_host) {
      mailOptions.host = envData.mail_host;
      mailOptions.port = envData.mail_port;
      mailOptions.user = envData.mail_user;
      mailOptions.pass = envData.mail_password;
    }
  }
};
