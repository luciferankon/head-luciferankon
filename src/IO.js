const parser = function(inputs) {
  let parsedInput = {
    option: "n",
    range: 10,
    files: inputs.slice(1),
    context: ""
  };

  parsedInput.context = inputs[0].substr(-7, 4);

  if (isOptionDash(inputs[1])) {
    parsedInput.files = inputs.slice(2);
  }
  if (isInputOnlyOption(inputs[1])) {
    parsedInput.option = inputs[1][1];
    parsedInput.range = inputs[2];
    parsedInput.files = inputs.slice(3);
  }
  if (isInputOnlyValue(inputs[1])) {
    parsedInput.range = inputs[1].slice(1);
    parsedInput.files = inputs.slice(2);
  }
  if (isInputOptionAndValue(inputs[1])) {
    parsedInput.option = inputs[1][1];
    parsedInput.range = inputs[1].slice(2);
    parsedInput.files = inputs.slice(2);
  }
  return parsedInput;
};

const isOptionDash = function(inputs) {
  return inputs == "--";
};

const isInputOnlyOption = function(inputs) {
  return /^-[a-z]$/.test(inputs);
};

const isInputOnlyValue = function(inputs) {
  return inputs.length >= 2 && !isNaN(inputs[1]);
};
const isInputOptionAndValue = function(inputs) {
  return inputs.length >= 3 && inputs[0] == "-" && isNaN(inputs[1]);
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

module.exports = {isOptionDash, 
  isInputOnlyValue, 
  isInputOnlyOption, 
  isInputOptionAndValue, 
  parser,
  generateHeader,
  addHeader
 }