const ERROR_MESSAGES = {
  MISSING_PAYLOAD: {
    MESSAGE: "Recheck missing payload",
    ERROR_CODE: "MISSING_PAYLOAD",
  },
  USER_NOT_FOUND: {
    MESSAGE: "Invalid credentials user not found",
    ERROR_CODE: "USER_NOT_FOUND",
  },
  INCORRECT_PASSWORD: {
    MESSAGE: "Invalid credentials password incorrect",
    ERROR_CODE: "USER_NOT_FOUND",
  },
  USER_EXIST: {
    MESSAGE: "User already exist",
    ERROR_CODE: "USER_EXIST",
  },
  INVALID_PATH_PARAM: {
    MESSAGE: "Invalid movie id",
    ERROR_CODE: "INVALID_PATH_PARAM",
  },
  MOVIE_NOT_FOUND: {
    MESSAGE: "Movie not found for the id",
    ERROR_CODE: "MOVIE_NOT_FOUND",
  },
  MISSING_PARAM: {
    MESSAGE: "Recheck missing param",
    ERROR_CODE: "MISSING_PARAM",
  },
  GENRE_MOVIE_NOT_FOUND: {
    MESSAGE: "Movie not found for the genre",
    ERROR_CODE: "MOVIE_NOT_FOUND",
  },
  MOVIE_EXIST: {
    MESSAGE: "Movie already exist",
    ERROR_CODE: "MOVIE_EXIST",
  },
  INVALID: {
    MESSAGE: "Id of movie can't be updated",
    ERROR_CODE: "INVALID",
  },
};

module.exports = { ERROR_MESSAGES };
