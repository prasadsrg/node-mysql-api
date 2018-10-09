import "reflect-metadata";
import AppExpress from "./apex/AppExpress";
import { createConnection } from "typeorm";
import * as Config from "./utils/Config";

const port = 5000;
console.log(Config.dbOptions);

AppExpress.listen(port, (err: any) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`server is listening on ${port}`);
});

createConnection(Config.dbOptions)
  .then(async connection => {
    console.log(connection.options.entities);
  })
  .catch(error => console.log("TypeORM connection error: ", error));

process.on("uncaughtException", function(err) {
  console.log("Caught exception: " + err);
});
