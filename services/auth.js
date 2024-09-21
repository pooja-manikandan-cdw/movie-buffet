const jwt = require("jsonwebtoken");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/dataEncryptionUtils");
const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const { checkEntireExists } = require("../utils/dataManipulationUtils");
const AppError = require("../AppError");

/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const login = async (requestBody) => {
  // logic for login
  if (!requestBody.password || !requestBody.userId) {
    throw new AppError(400, "Recheck missing payload", "MISSING_PAYLOAD");
  }
  const users = readFromFile("data/users.json");
  const userFound = checkEntireExists(users, requestBody.userId, "userId");
  if (!userFound)
    throw new AppError(
      404,
      "Invalid credentials user not found",
      "USER_NOT_FOUND"
    );
  if (userFound) {
    const { userId } = requestBody;
    const valid = decryptPassword(requestBody.password, userFound.password);
    if (!valid)
      throw new AppError(
        404,
        "Invalid credentials password incorrect",
        "USER_NOT_FOUND"
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
const register = async ({ userId, username, password }) => {
  // logic to registerif (!password || !username) {
  if (!userId || !password || !username) {
    throw new AppError(400, "Recheck missing payload", "MISSING_PAYLOAD");
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
      throw new AppError(400, "User already exist", "USER_EXIST");
    }
  } else {
    users = [{ userId: userId, username: username, password: hashedPassword }];
  }
  if (!userExists || !users) {
    writeIntoFile("data/users.json", JSON.stringify(users, null, 2));
    return users;
  }
};

module.exports = { login, register };
