import "reflect-metadata";
import AppExpress from "./apex/AppExpress";
import { createConnection } from "typeorm";
import * as Config from "./utils/Config";

const port = 5000;
Config.setEnvConfig();
let run = async () => {
  const conn = await createConnection(Config.dbOptions);
  console.log(" ************************************** " + conn.isConnected);
  if (conn.isConnected) {
    let express = new AppExpress().express;
    express.listen(port, async (err: any) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`server is listening on ${port}`);
    });
  }
};
run();
console.log(" ************************************** ");
process.on("uncaughtException", function(err) {
  console.error("Caught exception: " + err);
});
