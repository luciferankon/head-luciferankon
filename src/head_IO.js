const setSliceIndex = function(array){
  if(array[0].length>3)
    return 0;
  if(array[0] == '-n' || array[0] == '-c')
    return 2;
  return 1;
}

exports.setSliceIndex = setSliceIndex;
