const { checkError } = require("./error.js");

const { addHeader } = require('./IO.js');

const readAndFilter = function(fileSystem, parsedInput) {
  const err = checkError(parsedInput);
  if (err) {
    return err;
  }
  const { filePaths } = parsedInput;
  const formatResultForFile = formatResult.bind(null, fileSystem, parsedInput);
  return filePaths.map(formatResultForFile).join("\n\n");
};  

const formatResult = function({readFileSync, existsSync}, parsedInput, filePath) {
  const { headOrTail } = parsedInput;
  if (!existsSync(filePath))
    return "" + headOrTail + ": " + filePath + ": No such file or directory";
  return getContents(readFileSync, parsedInput, filePath);
};

const getContents = function(readFileSync,{ option, count, filePaths , headOrTail}, filePath) {
  let fileData = readFileSync(filePath, "utf-8");
  let result = selectOperationType(fileData, count, option, headOrTail);
  return addHeader(filePaths, filePath, result);
};

const filterNumberOfLines = function(content, count, headOrTail) {
  if (isTail(headOrTail)) {
    if (!content.endsWith("\n")){ 
      content += "\n";
    }
    count += 1;
    return content.split("\n").slice(-count).join("\n");
  }
  return content.split("\n").slice(0, count).join("\n");
};

const filterNumberOfChars = function(content, count, headOrTail) {
  if (isTail(headOrTail)) {
    return content.split("").slice(-count).join('');
  }
  return content.split("").slice(0, count).join('');
};

const selectOperationType = function(content, count, option = "n", headOrTail) {
  let opeartion = {
    n: filterNumberOfLines,
    c: filterNumberOfChars
  };
  return opeartion[option](content, count, headOrTail);
};

const isTail = function(headOrTail){
  return headOrTail == 'tail';
}

module.exports = {readAndFilter,
  filterNumberOfLines,
  filterNumberOfChars,
  selectOperationType,
  isTail
}
