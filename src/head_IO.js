const setSliceIndex = function(input){
  if(inputs[0].length>3)
    return 0;
  if(inputs[0] == '-n' || inputs[0] == '-c')
    return 2;
  return 1;
}

exports.setSliceIndex = setSliceIndex;
