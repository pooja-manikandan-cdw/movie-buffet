const express = require("express");
const { LOGIN, REGISTER, MOVIES } = require("../constants/path");
const {
  getAllMoviesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  getMovieByIdController,
} = require("../controllers/moviesController");

const router = express.Router();

router.get("/", (req, res, next) => {
  getAllMoviesController(req, res, next);
});

router.get("/:movieId", getMovieByIdController);

router.post("/", createMovieController);

router.patch("/:movieId", updateMovieController);

router.delete("/:movieId", deleteMovieController);

module.exports = router;
