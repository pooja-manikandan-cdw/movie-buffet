const express = require("express");
const authRoutes = require("./routers/authRoutes");
const moviesRoutes = require("./routers/moviesRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", authRoutes);
app.use("/movies", moviesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
