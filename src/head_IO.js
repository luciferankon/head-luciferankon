const parser = function(inputs){
  let parsedInput = { type : 'n',
                      range : 10,
                      files : inputs.slice(0)
                    };
  if(inputs[0].length == 2 && inputs[0] == '--'){
    parsedInput.files = inputs.slice(1);
  }
  if(inputs[0].length == 2 && (inputs[0] == '-n' || inputs[0] == 'c')){
    parsedInput.type = inputs[0][1];
    parsedInput.range = inputs[1];
    parsedInput.files = inputs.slice(2);
  }
  if(inputs[0].length >= 2 && (!isNaN(inputs[0][1]))){
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
