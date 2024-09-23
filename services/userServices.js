const jwt = require("jsonwebtoken");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/dataEncryptionUtils");
const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const { checkEntireExists } = require("../utils/dataManipulationUtils");
const AppError = require("../AppError");
const { ERROR_MESSAGES } = require("../constants/constants");
const { MISSING_PAYLOAD, USER_NOT_FOUND, INCORRECT_PASSWORD, USER_EXIST } =
  ERROR_MESSAGES;

/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const loginUser = async (requestBody) => {
  if (!requestBody.password || !requestBody.userId) {
    throw new AppError(
      400,
      MISSING_PAYLOAD.MESSAGE,
      MISSING_PAYLOAD.ERROR_CODE
    );
  }
  const users = readFromFile("data/users.json");
  const userFound = checkEntireExists(users, requestBody.userId, "userId");
  if (!userFound)
    throw new AppError(404, USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.MESSAGE);
  if (userFound) {
    const { userId } = requestBody;
    const valid = decryptPassword(requestBody.password, userFound.password);
    if (!valid)
      throw new AppError(
        404,
        INCORRECT_PASSWORD.MESSAGE,
        INCORRECT_PASSWORD.ERROR_CODE
      );
    if (valid) {
      const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "3000s",
      });
      return token;
    }
  }
};

/**
 * @description checks for valid username and password on success registers the user in user json file
 * @param {*} param - contains username password
 * @returns registered user
 */
const registerUser = async ({ userId, username, password }) => {
  // logic to registerif (!password || !username) {
  if (!userId || !password || !username) {
    throw new AppError(
      400,
      MISSING_PAYLOAD.MESSAGE,
      MISSING_PAYLOAD.ERROR_CODE
    );
  }
  const hashedPassword = encryptPassword(password);
  let users = readFromFile("data/users.json");
  let userExists;
  if (users) {
    userExists = checkEntireExists(users, userId, "userId");
    if (!userExists)
      users.push({
        userId: userId,
        username: username,
        password: hashedPassword,
      });
    else {
      throw new AppError(400, USER_EXIST.MESSAGE, USER_EXIST.ERROR_CODE);
    }
  } else {
    users = [{ userId: userId, username: username, password: hashedPassword }];
  }
  if (!userExists || !users) {
    writeIntoFile("data/users.json", JSON.stringify(users, null, 2));
    return users;
  }
};

module.exports = { loginUser, registerUser };
