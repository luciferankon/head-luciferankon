const { errorCheck } = require("./errorLib.js");

const generateResult = function(
  readFile,
  exists,
  getStat,
  { type, range, files }
) {
  let error = errorCheck(type, range, files);
  if (error) {
    return error;
  }
  return files
    .map(function(file) {
      if (!exists(file)) {
        return "head: " + file + ": No such file or directory";
      }
      if (!getStat(file).isFile()) {
        return "head: Error reading " + file;
      }
      let fileName = "==> " + file + " <==\n";
      let fileData = readFile(file, "utf-8");
      let result = selectOperationType(fileData, range, type);
      if (files.length > 1) {
        return fileName + result;
      }
      return result;
    })
    .join("\n\n");
};

const filterNumOfLine = function(file, num = 10) {
  return file
    .split("\n")
    .slice(0, num)
    .join("\n");
};

const filterNumOfChar = function(file, num) {
  return file.slice(0, num);
};

const selectOperationType = function(file, num, type = "n") {
  let opeartion = {
    n: filterNumOfLine,
    c: filterNumOfChar
  };
  return opeartion[type](file, num);
};

exports.generateResult = generateResult;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
