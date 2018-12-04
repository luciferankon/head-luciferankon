const apply = function(func,arg1,arg2){
  return func(arg1,arg2);
}

const filterNumOfLine = function(file,num=10){
  return file.split('\n').slice(0,num).join('');
}


exports.apply = apply;
exports.filterNumOfLine = filterNumOfLine;
