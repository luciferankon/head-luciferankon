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
  if(type != 'n' || type != 'c'){
    console.log('head: illegal option -- '+ type +'\nusage: head [-n lines | -c bytes] [file ...]');
    process.exit(1);
  }
  let opeartion = {
    'n' : filterNumOfLine,
    'c' : filterNumOfChar
  }
  return opeartion[type](file,num);
}

const errorCheck = function(value){
  if(value <! 0 || isNaN(value)){
    console.log('head: illegal line count -- ' + value);
    process.exit(1);
  }
}

exports.errorCheck = errorCheck;
exports.apply = apply;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
