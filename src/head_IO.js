const { selectOperationType } = require('./lib.js');

const setSliceIndex = function(inputs){
  if(!inputs[0].match(/^-/))
    return 0;
  if(inputs[0] == '-n' || inputs[0] == '-c')
    return 2;
  return 1;
}

const partition = function(inputs){
  let sliceIndex = setSliceIndex(inputs);
  let typeValue = inputs.slice(0,sliceIndex).join('');
  let files = inputs.slice(sliceIndex);
  return { typeValue, files};
}

const separateTypeValue = function(inputs){
  let partitionedInput = partition(inputs);
  let typeValue = partitionedInput.typeValue.split('');
  let type = isNaN(typeValue[1]) && typeValue[1] || '';
  let valueIndex = type.length + 1;
  let value = typeValue.slice(valueIndex).join('');
  let files = partitionedInput.files;
  return {type, value, files};
}

const generateResult = function(file, {type, value, files}){
  let index = 0;
  let range = +value || undefined;
  let result = selectOperationType(file,range,type[0]);
  if(files.length - 1){
    result = '==> ' + files[index++] + ' <==\n' + result;
  }
  return result;
}

exports.generateResult = generateResult;
exports.separateTypeValue = separateTypeValue;
exports.partition = partition;
exports.setSliceIndex = setSliceIndex;
