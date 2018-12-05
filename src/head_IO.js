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
  let type = typeValue.slice(1).filter(isNaN);
  let value = typeValue.slice(1).filter( x => isFinite(x) || x == '-').join('');
  let files = partitionedInput.files;
  return {type, value, files};
}

const generateResult = function(file,{type, value, files}){
  if(value === '0' || value < 0){
    return 'head: illegal line count -- ' + value;
  }
  let index = 0;
  let range = +value || undefined;
  let result = selectOperationType(file,range,type[0]);
  if(files.length - 1)
    result = '==> ' + files[index++] + '<==\n\n' + result + '\n\n';
  return result;
}

exports.generateResult = generateResult;
exports.separateTypeValue = separateTypeValue;
exports.partition = partition;
exports.setSliceIndex = setSliceIndex;
