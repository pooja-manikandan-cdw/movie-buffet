const express = require("express");
const authRouter = require("./routers/authRouter");
const moviesRouter = require("./routers/moviesRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", authRouter);
app.use("/movies", moviesRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
