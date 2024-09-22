const express = require("express");
const movieRoutes = require("./routers/movieRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
