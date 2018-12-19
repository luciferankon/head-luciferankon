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

const sliceContents = function(content, count, delimiter, headOrTail){
  const sliceCount = {
    head : content.split(delimiter).slice(0, count).join(delimiter),
    tail : content.split(delimiter).slice(-count).join(delimiter)
  };
  return sliceCount[headOrTail];
}

const filterNumberOfLines = function(content, count, headOrTail) {
  if (isTail(headOrTail)) {
    if (!content.endsWith("\n")){ 
      content += "\n";
    }
    count += 1;
    return sliceContents(content, count, '\n', headOrTail);
  }
  return sliceContents(content, count, '\n', headOrTail);
};

const filterNumberOfChars = function(content, count, headOrTail) {
  if (isTail(headOrTail)) {
    return sliceContents(content, count, '', headOrTail);
  }
  return sliceContents(content, count, '', headOrTail);
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
