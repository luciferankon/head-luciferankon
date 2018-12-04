const setSliceIndex = function(inputs){
  if(inputs[0].length>3)
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
  let value = typeValue.slice(1).filter(isFinite);
  let files = partitionedInput.files;
  return {type, value, files};
}

exports.separateTypeValue = separateTypeValue;
exports.partition = partition;
exports.setSliceIndex = setSliceIndex;
