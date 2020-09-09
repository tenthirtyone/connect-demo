const express = require("express");
const app = express();

app.use("/", express.static("./client/build"));

app.listen(4000, () => {
  console.log("server running on 4000");
});
