const parser = function(inputs) {
  let parsedInput = {
    type: "n",
    range: 10,
    files: inputs.slice(1),
    context: ""
  };

  parsedInput.context = inputs[0].substr(-7, 4);

  if (isTypeDash(inputs[1])) {
    parsedInput.files = inputs.slice(2);
  }
  if (isInputOnlyType(inputs[1])) {
    parsedInput.type = inputs[1][1];
    parsedInput.range = inputs[2];
    parsedInput.files = inputs.slice(3);
  }
  if (isInputOnlyValue(inputs[1])) {
    parsedInput.range = inputs[1].slice(1);
    parsedInput.files = inputs.slice(2);
  }
  if (isInputTypeAndValue(inputs[1])) {
    parsedInput.type = inputs[1][1];
    parsedInput.range = inputs[1].slice(2);
    parsedInput.files = inputs.slice(2);
  }
  return parsedInput;
};

const isTypeDash = function(inputs) {
  return inputs == "--";
};

const isInputOnlyType = function(inputs) {
  return /^-[a-z]$/.test(inputs);
};

const isInputOnlyValue = function(inputs) {
  return inputs.length >= 2 && !isNaN(inputs[1]);
};
const isInputTypeAndValue = function(inputs) {
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

module.exports = {isTypeDash, 
  isInputOnlyValue, 
  isInputOnlyType, 
  isInputTypeAndValue, 
  parser,
  generateHeader,
  addHeader
 }