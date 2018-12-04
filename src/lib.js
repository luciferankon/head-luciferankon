const apply = function(func,arg1,arg2){
  return func(arg1,arg2);
}

const filterNumOfLine = function(file,num=10){
  return file.split('\n').slice(0,num).join('');
}

const filterNumOfChar = function(file,num){
  return file.slice(0,num);
}

const selectOperationType = function(file,num,type = 'n'){
  let opeartion = {
    'n' : filterNumOfLine,
    'c' : filterNumOfChar
  }
  return opeartion[type](file,num);
}

exports.apply = apply;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
