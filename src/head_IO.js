const parser = function(inputs) {
  let parsedInput = { type: "n", range: 10, files: inputs.slice(0) };

  if (isTypeDash(inputs[0])) {
    parsedInput.files = inputs.slice(1);
  }
  if (isInputOnlyType(inputs[0])) {
    parsedInput.type = inputs[0][1];
    parsedInput.range = inputs[1];
    parsedInput.files = inputs.slice(2);
  }
  if (isInputOnlyValue(inputs[0])) {
    parsedInput.range = inputs[0].slice(1);
    parsedInput.files = inputs.slice(1);
  }
  if (isInputTypeAndValue(inputs[0])) {
    parsedInput.type = inputs[0][1];
    parsedInput.range = inputs[0].slice(2);
    parsedInput.files = inputs.slice(1);
  }
  return parsedInput;
};


const isTypeDash = function(inputs){
  return inputs.length == 2 && inputs == "--";
}

const isInputOnlyType = function(inputs){
  return inputs.length == 2 && /[a-z]/.test(inputs[1]);
}

const isInputOnlyValue = function(inputs){
  return inputs.length >= 2 && !isNaN(inputs[1]);
}
const isInputTypeAndValue = function(inputs){
  return inputs.length >= 3 && inputs[0] == "-" && isNaN(inputs[1]);
}

exports.isTypeDash = isTypeDash;
exports.isInputOnlyValue = isInputOnlyValue;
exports.isInputOnlyType = isInputOnlyType;
exports.isInputTypeAndValue = isInputTypeAndValue;
exports.parser = parser;
