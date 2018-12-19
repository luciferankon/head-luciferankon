const { checkError } = require("./error.js");

const { addHeader } = require('./IO.js');

const generateResult = function(fileSystem, parsedInput) {
  const err = checkError(parsedInput);
  if (err) {
    return err;
  }
  const { option, count, files, context } = parsedInput;
  const formatResultForFile = formatResult.bind(null, fileSystem, parsedInput, context);
  return files.map(formatResultForFile).join("\n\n");
};

const formatResult = function({readFileSync, existsSync}, parsedInput, context, file) {
  if (!existsSync(file))
    return "" + context + ": " + file + ": No such file or directory"
  return getContents(readFileSync, parsedInput, context, file);
};

const getContents = function(readFileSync,{ option, count, files },context,file) {
  let fileData = readFileSync(file, "utf-8");
  let result = selectOperationType(fileData, count, option, context);
  return addHeader(files, file, result);
};

const filterNumberOfLines = function(content, count, context) {
  if (isContextTail(context)) {
    if (!content.endsWith("\n")){ 
      content += "\n";
    }
    return content.split("\n").slice(-(+count+1)).join("\n");
  }
  return content.split("\n").slice(0, count).join("\n");
};

const filterNumberOfChars = function(content, count, context) {
  if (isContextTail(context)) {
    return content.split("").slice(content.length - count).join('');
  }
  return content.split("").slice(0, count).join('');
};

const selectOperationType = function(content, count, option = "n", context) {
  let opeartion = {
    n: filterNumberOfLines,
    c: filterNumberOfChars
  };
  return opeartion[option](content, count, context);
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
