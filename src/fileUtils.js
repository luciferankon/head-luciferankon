const { checkErrorOfHead, checkErrorOfTail } = require("./error.js");

const { addHeader, generateHeader } = require('./IO.js');

const generateResult = function(fileSystem, parsedInput) {
  let error = {
    head: checkErrorOfHead,
    tail: checkErrorOfTail
  };
  let { option, count, files, context } = parsedInput;
  let err = error[context](option, count, files);
  if (err) {
    return err;
  }
  let formatResultForFile = formatResult.bind(null, fileSystem, parsedInput, context);
  return files.map(formatResultForFile).join("\n\n");
};

const formatResult = function({readFileSync, existsSync}, parsedInput, context, file) {
  if (!existsSync(file))
    return "" + context + ": " + file + ": No such file or directory"
  return getContents(readFileSync, parsedInput, context, file);
};

const getContents = function(readFileSync,{ option, count, files },context,file) {
  let fileName = generateHeader(file);
  let fileData = readFileSync(file, "utf-8");
  let result = selectOperationType(fileData, count, option, context);
  return addHeader(files, fileName, result);
};

const filterNumberOfLines = function(contents, count, context) {
  if (isContextTail(context)) {
    if (!contents.endsWith("\n")){ 
      contents += "\n";
    }
    return contents.split("\n").slice(-(+count+1)).join("\n");
  }
  return contents.split("\n").slice(0, count).join("\n");
};

const filterNumberOfChars = function(contents, count, context) {
  if (isContextTail(context)) {
    return contents.slice(contents.length - count);
  }
  return contents.slice(0, count);
};

const selectOperationType = function(contents, count, option = "n", context) {
  let opeartion = {
    n: filterNumberOfLines,
    c: filterNumberOfChars
  };
  return opeartion[option](contents, count, context);
};

const isContextTail = function(context){
  return context == 'tail';
}

module.exports = {generateResult,
  filterNumberOfLines,
  filterNumberOfChars,
  selectOperationType,
  isContextTail
}
