const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const {
  checkEntireExists,
  getEntireIndex,
  getAllEntires,
} = require("../utils/dataManipulationUtils");
const { ERROR_MESSAGES } = require("../constants/constants");
const {
  INVALID_PATH_PARAM,
  MOVIE_NOT_FOUND,
  MISSING_PARAM,
  GENRE_MOVIE_NOT_FOUND,
  MOVIE_EXIST,
  INVALID,
  MISSING_PAYLOAD,
} = ERROR_MESSAGES;

const getAllMovies = async () => {
  try {
    const movies = readFromFile("data/movies.json");
    return movies;
  } catch (e) {
    throw e;
  }
};

const getMovieById = async (movieId) => {
  try {
    if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);
    const movies = readFromFile("data/movies.json");
    const movieFound = checkEntireExists(movies, movieId, "movieId");
    if (!movieFound) throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);
    return movieFound;
  } catch (e) {
    throw e;
  }
};

const getMovieByGenre = async (genre) => {
  try {
    if (!genre) throw new Error(MISSING_PARAM.ERROR_CODE);
    const movies = readFromFile("data/movies.json");
    const movieFound = getAllEntires(movies, genre, "genre");
    if (!movieFound) throw new Error(GENRE_MOVIE_NOT_FOUND.ERROR_CODE);
    return movieFound;
  } catch (e) {
    throw e;
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
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    let movies = readFromFile("data/movies.json");
    let movieExists;
    if (movies) {
      movieExists = checkEntireExists(movies, movieId, "movieId");
      if (!movieExists)
        movies.push({ movieId, movieName, genre, favorite, rating, moviePlot });
      else {
        throw new Error(MOVIE_EXIST.ERROR_CODE);
      }
    } else {
      movies = [{ movieId, movieName, genre, favorite, rating, moviePlot }];
    }
    if (!movieExists || !movies) {
      writeIntoFile("data/movies.json", JSON.stringify(movies, null, 2));
      return movies;
    }
  } catch (e) {
    throw e;
  }
};

const updateMovie = async (movieId, data) => {
  try {
    if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);
    const movies = readFromFile("data/movies.json");
    const movieFound = checkEntireExists(movies, movieId, "movieId");
    if ("movieId" in data) {
      throw new Error(INVALID.ERROR_CODE);
    }
    if (!movieFound) throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);
    const updatedMovie = Object.assign(movieFound, data);
    const index = movies.indexOf(movieFound);
    movies[index] = updatedMovie;
    writeIntoFile("data/movies.json", JSON.stringify(movies, null, 2));
    return updatedMovie;
  } catch (e) {
    throw e;
  }
};

const deleteMovie = async (movieId) => {
  if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);

  let movies = readFromFile("data/movies.json");

  const movieFound = getEntireIndex(movies, movieId, "movieId");

  if (movieFound === -1) throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);

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
