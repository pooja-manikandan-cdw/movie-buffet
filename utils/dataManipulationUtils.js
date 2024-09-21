const AppError = require("../AppError");

const checkEntireExists = (data, item, key) => {
  const foundData = data?.find((dataItem) => dataItem[key] === item);
  return foundData;
};
const getAllEntires = (data, item, key) => {
  const foundData = data?.filter((dataItem) => dataItem[key] === item);
  return foundData;
};

const getEntireIndex = (data, item, key) => {
  const index = data.findIndex((dataItem) => dataItem[key] === item);
  return index;
};

module.exports = {
  checkEntireExists,
  getEntireIndex,
  getAllEntires,
};
