const apply = function(func,arg1,arg2){
  return func(arg1,arg2);
}

const filterNumOfLine = function(file,num=10){
  return file.split('\n').slice(0,num).join('\n');
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

const errorCheck = function(type, value){
  if(type != 'n' && type != 'c' && type != ''){
    return 'head: illegal option -- '+ type +'\nusage: head [-n lines | -c bytes] [file ...]';
  }
  if((value != '' && value < 1) || isNaN(+value)){
    return 'head: illegal line count -- ' + value;
  }
}

exports.errorCheck = errorCheck;
exports.apply = apply;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
