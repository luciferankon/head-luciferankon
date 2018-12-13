const { errorCheckHead, errorCheckTail } = require("./errorLib.js");

const generateResult = function(fileSystem, arrangedInputs) {
  let error = {
    head: errorCheckHead,
    tail: errorCheckTail
  };
  let { type, range, files, context } = arrangedInputs;
  let err = error[context](type, range, files);
  if (err) {
    return err;
  }
  let validateFile = formatResult.bind(
    null,
    fileSystem,
    arrangedInputs,
    context
  );
  return files.map(validateFile).join("\n\n");
};

const formatResult = function(
  { readFileSync, existsSync},
  arrangedInputs,
  context,
  file
) {
  if (!existsSync(file)) {
    return (
      "" + context + ": " + file + ": No such file or directory"
    );
  }
  return getResult(readFileSync, arrangedInputs, context, file);
};

const getResult = function(
  readFileSync,
  { type, range, files },
  context,
  file
) {
  let fileName = generateHeader(file);
  let fileData = readFileSync(file, "utf-8");
  let result = selectOperationType(fileData, range, type, context);
  return addHeader(files, fileName, result);
};

const generateHeader = function(file) {
  return "==> " + file + " <==\n";
};

const addHeader = function(files, fileName, result) {
  if (files.length > 1) {
    return fileName + result;
  }
  return result;
};

const filterNumOfLine = function(file, num = 10, context) {
  if (context == "tail") {
    if (!file.endsWith("\n")) file += "\n";
    let range = file.split("\n").length - num - 1;
    if (range < 0) range = 0;

    return file
      .split("\n")
      .slice(range)
      .join("\n");
  }
  return file
    .split("\n")
    .slice(0, num)
    .join("\n");
};

const filterNumOfChar = function(file, num, context) {
  if (context == "tail") {
    return file.slice(file.length - num);
  }
  return file.slice(0, num);
};

const selectOperationType = function(file, num, type = "n", context) {
  let opeartion = {
    n: filterNumOfLine,
    c: filterNumOfChar
  };
  return opeartion[type](file, num, context);
};

exports.generateResult = generateResult;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
