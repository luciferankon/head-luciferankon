const parser = function(args) {
  let parsedInput = {
    option: "n",
    count: 10,
    filePaths: args.slice(1),
    headOrTail: ""
  };

  parsedInput.headOrTail = args[0].substr(-7, 4);

  if (isOptionDash(args[1])) {
    parsedInput.filePaths = args.slice(2);
  }
  if (isOnlyOption(args[1])) {
    parsedInput.option = args[1][1];
    parsedInput.count = +args[2];
    parsedInput.filePaths = args.slice(3);
  }
  if (isOnlyValue(args[1])) {
    parsedInput.count = +args[1].slice(1);
    parsedInput.filePaths = args.slice(2);
  }
  if (isOptionAndValue(args[1])) {
    parsedInput.option = args[1][1];
    parsedInput.count = +args[1].slice(2);
    parsedInput.filePaths = args.slice(2);
  }
  return parsedInput;
};

const isOptionDash = function(option) {
  return option == "--";
};

const isOnlyOption = function(args) {
  return /^-[a-z]$/.test(args);
};

const isOnlyValue = function(args) {
  return args.length >= 2 && !isNaN(args[1]);
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

module.exports = {isOptionDash, 
  isOnlyValue, 
  isOnlyOption, 
  isOptionAndValue, 
  parser,
  generateHeader,
  addHeader
 }