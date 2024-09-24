const { Users } = require("../models/stepDbSchema");
const jwt = require("jsonwebtoken");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/dataEncryptionUtils");
const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const { checkEntireExists } = require("../utils/dataManipulationUtils");
const { ERROR_MESSAGES } = require("../constants/constants");
const { MISSING_PAYLOAD, USER_NOT_FOUND, INCORRECT_PASSWORD, USER_EXIST } =
  ERROR_MESSAGES;

/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const loginUser = async (requestBody) => {
  try {
    if (!requestBody.password || !requestBody.userId) {
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    const users = await Users.find();
    const userFound = checkEntireExists(users, requestBody.userId, "userId");
    if (!userFound) throw new Error(USER_NOT_FOUND.ERROR_CODE);
    if (userFound) {
      const { userId } = requestBody;
      const valid = decryptPassword(requestBody.password, userFound.password);
      if (!valid) throw new Error(INCORRECT_PASSWORD.ERROR_CODE);
      if (valid) {
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
          expiresIn: "3000s",
        });
        return token;
      }
    }
  } catch (e) {
    throw e;
  }
};

/**
 * @description checks for valid username and password on success registers the user in user json file
 * @param {*} param - contains username password
 * @returns registered user
 */
const registerUser = async ({ userId, username, password }) => {
  // logic to registerif (!password || !username) {
  try {
    if (!userId || !password || !username) {
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    let users = readFromFile("data/users.json");
    let userExists;
    if (users) {
      const hashedPassword = encryptPassword(password);
      userExists = checkEntireExists(users, userId, "userId");
      if (!userExists) {
        users.push({
          userId: userId,
          username: username,
          password: hashedPassword,
        });
      } else {
        throw new Error(USER_EXIST.ERROR_CODE);
      }
    } else {
      users = [
        { userId: userId, username: username, password: hashedPassword },
      ];
    }
    if (!userExists || !users) {
      writeIntoFile("data/users.json", JSON.stringify(users, null, 2));
      return users;
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { loginUser, registerUser };
