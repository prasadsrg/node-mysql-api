import app from "./apex/App";

const port = 5000;

app.listen(port, (err: any) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`server is listening on ${port}`);
});
process.on("uncaughtException", function(err) {
  console.log("Caught exception: " + err);
});
