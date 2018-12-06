const parser = function(inputs){
  let parsedInput = { type : 'n',
                      range : 10,
                      files : inputs.slice(0)
                    };
  let isTypeDash = inputs[0].length == 2 && inputs[0] == '--';
  let isInputOnlyType = inputs[0].length == 2 && inputs[0].match(/^-[a-z]/);
  let isInputOnlyValue = inputs[0].length >= 2 && (!isNaN(inputs[0][1]));

  if(isTypeDash){
    parsedInput.files = inputs.slice(1);
  }
  if(isInputOnlyType){
    parsedInput.type = inputs[0][1];
    parsedInput.range = inputs[1];
    parsedInput.files = inputs.slice(2);
  }
  if(isInputOnlyValue){
    parsedInput.range = inputs[0].slice(1);
    parsedInput.files = inputs.slice(1);
  }
  if(inputs[0].length >=3 && inputs[0][0] == '-' && isNaN(inputs[0][1])){
    parsedInput.type = inputs[0][1];
    parsedInput.range = inputs[0].slice(2);
    parsedInput.files = inputs.slice(1);
  }
  return parsedInput;
}

exports.parser = parser;
