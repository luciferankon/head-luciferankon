const { checkErrorOfHead, checkErrorOfTail } = require("./error.js");

const { addHeader, generateHeader } = require('./IO.js');

const generateResult = function(fileSystem, parsedInput) {
  let error = {
    head: checkErrorOfHead,
    tail: checkErrorOfTail
  };
  let { option, range, files, context } = parsedInput;
  let err = error[context](option, range, files);
  if (err) {
    return err;
  }
  let formatResultForFile = formatResult.bind(null, fileSystem, parsedInput, context);
  return files.map(formatResultForFile).join("\n\n");
};

const formatResult = function({readFileSync, existsSync}, parsedInput, context, file) {
  if (!existsSync(file))
    return "" + context + ": " + file + ": No such file or directory"
  return getResult(readFileSync, parsedInput, context, file);
};

const getResult = function(readFileSync,{ option, range, files },context,file) {
  let fileName = generateHeader(file);
  let fileData = readFileSync(file, "utf-8");
  let result = selectOperationOption(fileData, range, option, context);
  return addHeader(files, fileName, result);
};

const filterNumOfLine = function(file, num = 10, context) {
  if (isContextTail(context)) {
    if (!file.endsWith("\n")){ 
      file += "\n";
    }
    return file.split("\n").slice(-(+num+1)).join("\n");
  }
  return file.split("\n").slice(0, num).join("\n");
};

const filterNumOfChar = function(file, num, context) {
  if (isContextTail(context)) {
    return file.slice(file.length - num);
  }
  return file.slice(0, num);
};

const selectOperationOption = function(file, num, option = "n", context) {
  let opeartion = {
    n: filterNumOfLine,
    c: filterNumOfChar
  };
  return opeartion[option](file, num, context);
};

const isContextTail = function(context){
  return context == 'tail';
}

module.exports = {generateResult,
  filterNumOfLine,
  filterNumOfChar,
  selectOperationOption,
  isContextTail
}