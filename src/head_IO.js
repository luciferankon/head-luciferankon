const setSliceIndex = function(inputs){
  if(inputs[0].length>3)
    return 0;
  if(inputs[0] == '-n' || inputs[0] == '-c')
    return 2;
  return 1;
}

const partition = function(inputs){
  let sliceIndex = setSliceIndex(inputs);
  let typeValue = inputs.slice(0,sliceIndex);
  let files = inputs.slice(sliceIndex);
  return {typeValue : typeValue, files: files};
}

exports.partition = partition;
exports.setSliceIndex = setSliceIndex;
