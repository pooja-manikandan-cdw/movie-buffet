const express = require("express");
const userRoutes = require("./routers/userRoutes");
const movieRoutes = require("./routers/movieRoutes");
const errorHandler = require("./middleware/errorHandler");
const { authoriseUser } = require("./middleware/authoriseUser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.use("/movies", authoriseUser, movieRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
