const express = require("express");
const router = require("./routes/route");

const app = express();

app.use("/", router);

app.listen(8080, () => {
  console.log("App listening at port 8080");
});
