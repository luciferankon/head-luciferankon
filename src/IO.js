const parser = function(args,headOrTail) {
  let parsedInput = {
    option: "n",
    count: 10,
    filePaths: args.slice(0),
    headOrTail: ""
  };

  parsedInput.headOrTail = headOrTail;
  const optionCandidate = args[0];
  const filePaths = args.slice(1);

  if (isOnlyOption(optionCandidate)) {
    let filePaths = args.slice(2);
    parsedInput.option = optionCandidate[1];
    parsedInput.count = args[1];
    parsedInput.filePaths = filePaths;
  }
  if (isOnlyValue(optionCandidate)) {
    parsedInput.count = optionCandidate.slice(1);
    parsedInput.filePaths = filePaths;
  }
  if (isOptionAndValue(optionCandidate)) {
    parsedInput.option = optionCandidate[1];
    parsedInput.count = optionCandidate.slice(2);
    parsedInput.filePaths = filePaths;
  }
  return parsedInput;
};

const isOnlyOption = function(args) {
  return /^-[a-z]$/.test(args);
};

const isOnlyValue = function(args) {
  return isFinite(args[1]);
};
const isOptionAndValue = function(args) {
  return args.length >= 3 && args[0] == "-" && isNaN(args[1]);
};

const generateHeader = function(filePath) {
  return "==> " + filePath + " <==\n";
};

const addHeader = function(filePaths, filePath, result) {
  if (filePaths.length > 1) {
    return generateHeader(filePath) + result;
  }
  return result;
};

module.exports = { 
  isOnlyValue, 
  isOnlyOption, 
  isOptionAndValue, 
  parser,
  generateHeader,
  addHeader
 }