const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const {
  checkEntireExists,
  getEntireIndex,
  getAllEntires,
} = require("../utils/dataManipulationUtils");
const AppError = require("../AppError");
const getAllMovies = async () => {
  try {
    // logic for get all movies
    const movies = readFromFile("data/movies.json");
    return movies;
  } catch (e) {
    throw Error(e);
  }
};

const getMovieById = async (movieId) => {
  try {
    if (!Number(movieId))
      throw new AppError(400, "Invalid movie id", "INVALID_PATH_PARAM");
    const tasks = readFromFile("data/movies.json");
    const taskFound = checkEntireExists(tasks, movieId, "movieId");
    if (!taskFound)
      throw new AppError(
        404,
        `Movie not found for the taskId ${movieId}`,
        "MOVIE_NOT_FOUND"
      );
    return taskFound;
  } catch (e) {
    throw Error(e);
  }
};

const getMovieByGenre = async (genre) => {
  try {
    if (!genre)
      throw new AppError(400, "Recheck missing payload", "MISSING_PARAM");
    const tasks = readFromFile("data/movies.json");
    const taskFound = getAllEntires(tasks, genre, "genre");
    if (!taskFound)
      throw new AppError(
        404,
        `Movie not found for the genre ${genre}`,
        "MOVIE_NOT_FOUND"
      );
    return taskFound;
  } catch (e) {
    throw Error(e);
  }
};

const createMovie = async (movie) => {
  // logic to get movie by id
  try {
    const { movieId, movieName, genre, favorite, rating, moviePlot } = movie;
    if (
      !movieId ||
      !movieName ||
      !genre ||
      !favorite ||
      !rating ||
      !moviePlot
    ) {
      throw new AppError(400, "Recheck missing payload", "MISSING_PAYLOAD");
    }
    let movies = readFromFile("data/movies.json");
    let movieExists;
    if (movies) {
      movieExists = checkEntireExists(movies, movieId, "movieId");
      if (!movieExists)
        movies.push({ movieId, movieName, genre, favorite, rating, moviePlot });
      else {
        throw new AppError(400, "Movie already exist", "MOVIE_EXIST");
      }
    } else {
      movies = [{ movieId, movieName, genre, favorite, rating, moviePlot }];
    }
    if (!movieExists || !movies) {
      writeIntoFile("data/movies.json", JSON.stringify(movies, null, 2));
      return movies;
    }
  } catch (e) {
    throw Error(e);
  }
};

const updateMovie = async (movieId, data) => {
  try {
    if (!Number(movieId))
      throw new AppError(400, "Invalid movie id", "INVALID_PATH_PARAM");
    const movies = readFromFile("data/movies.json");
    const movieFound = checkEntireExists(movies, movieId, "movieId");
    if ("movieId" in data) {
      throw new AppError(400, `Id of movie can't be updated`, "INVALID");
    }
    if (!movieFound)
      throw new AppError(
        404,
        `Movie not found for the movieId ${movieId}`,
        "MOVIE_NOT_FOUND"
      );
    const updatedMovie = Object.assign(movieFound, data);
    const index = movies.indexOf(movieFound);
    movies[index] = updatedMovie;
    writeIntoFile("data/movies.json", JSON.stringify(movies, null, 2));
    return updatedMovie;
  } catch (e) {
    throw Error(e);
  }
};

const deleteMovie = async (movieId) => {
  if (!Number(movieId))
    throw new AppError(400, "Invalid movie id", "INVALID_PATH_PARAM");

  let movies = readFromFile("data/movies.json");

  const movieFound = getEntireIndex(movies, movieId, "movieId");

  if (movieFound === -1)
    throw new AppError(
      404,
      `Movie not found for the movieId ${movieId}`,
      "MOVIE_NOT_FOUND"
    );

  movies = [...movies.slice(0, movieFound), ...movies.slice(movieFound + 1)];

  writeIntoFile("data/movies.json", JSON.stringify(movies, null, 2));

  return movies;
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByGenre,
  createMovie,
  updateMovie,
  deleteMovie,
};
