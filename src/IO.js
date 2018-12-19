const parser = function(args) {
  let parsedInput = {
    option: "n",
    count: 10,
    files: args.slice(1),
    context: ""
  };

  parsedInput.context = args[0].substr(-7, 4);

  if (isOptionDash(args[1])) {
    parsedInput.files = args.slice(2);
  }
  if (isInputOnlyOption(args[1])) {
    parsedInput.option = args[1][1];
    parsedInput.count = +args[2];
    parsedInput.files = args.slice(3);
  }
  if (isInputOnlyValue(args[1])) {
    parsedInput.count = +args[1].slice(1);
    parsedInput.files = args.slice(2);
  }
  if (isInputOptionAndValue(args[1])) {
    parsedInput.option = args[1][1];
    parsedInput.count = +args[1].slice(2);
    parsedInput.files = args.slice(2);
  }
  return parsedInput;
};

const isOptionDash = function(option) {
  return option == "--";
};

const isInputOnlyOption = function(args) {
  return /^-[a-z]$/.test(args);
};

const isInputOnlyValue = function(args) {
  return args.length >= 2 && !isNaN(args[1]);
};
const isInputOptionAndValue = function(args) {
  return args.length >= 3 && args[0] == "-" && isNaN(args[1]);
};

const generateHeader = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const addHeader = function(files, fileName, result) {
  if (files.length > 1) {
    return generateHeader(fileName) + result;
  }
  return result;
};

module.exports = {isOptionDash, 
  isInputOnlyValue, 
  isInputOnlyOption, 
  isInputOptionAndValue, 
  parser,
  generateHeader,
  addHeader
 }