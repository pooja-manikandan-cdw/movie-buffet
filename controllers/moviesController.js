const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByGenre,
} = require("../services/movieServices");

const getAllMoviesController = async (req, res, next) => {
  try {
    let response;
    if (req.query.genre) {
      response = getMovieByGenre(req.query.genre);
    } else {
      response = await getAllMovies();
    }
    if (response) {
      res.status(200).send({ status: 200, data: response });
    }
  } catch (error) {
    next(error);
  }
};

const getMovieByIdController = async (req, res, next) => {
  try {
    const response = await getMovieById(req.params.movieId);
    if (response) {
      res.status(200).send({ status: 200, data: response });
    }
  } catch (error) {
    next(error);
  }
};

const createMovieController = async (req, res, next) => {
  try {
    const response = await createMovie(req.body);
    if (response) {
      res
        .status(201)
        .send({ status: 201, message: "Movie added successfully" });
    }
  } catch (error) {
    next(error);
  }
};
const updateMovieController = async (req, res, next) => {
  try {
    const response = await updateMovie(req.params.movieId, req.body);
    if (response) {
      res
        .status(200)
        .send({ status: 200, message: "task updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};
const deleteMovieController = async (req, res, next) => {
  try {
    const response = await deleteMovie(req.params.movieId);
    if (response) {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
