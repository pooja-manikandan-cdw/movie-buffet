/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const loginServices = async (requestBody) => {
  // logic for login
  console.log("loginServices");
};

/**
 * @description checks for valid username and password on success registers the user in user json file
 * @param {*} param - contains username password
 * @returns registered user
 */
const registerServices = async ({ username, password }) => {
  // logic to register
  console.log("registerServices");
};

module.exports = { loginServices, registerServices };
